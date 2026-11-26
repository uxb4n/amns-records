// pages/api/releases.js
import { getArtistReleases, getArtistInfo } from '../../lib/spotify'

// Map the query param value to its env var. Keys must match the `slug`
// field in lib/data.js FAMILY entries.
const ARTIST_ENV_MAP = {
  default: process.env.SPOTIFY_ARTIST_ID,
  uxban: process.env.SPOTIFY_UXBAN_ID,
  jak: process.env.SPOTIFY_JAK_ID,
}

const CACHE_TTL_MS = 5 * 60 * 1000
const cache = new Map()       // artistKey -> { data, expiresAt }
const inflight = new Map()    // artistKey -> Promise (dedupe concurrent hits)

export default async function handler(req, res) {
  const artistKey = (req.query.artist || 'default').toString().toLowerCase()
  const artistId = ARTIST_ENV_MAP[artistKey]

  if (!artistId) {
    return res.status(404).json({ error: `No Spotify ID configured for "${artistKey}"` })
  }

  const now = Date.now()
  const cached = cache.get(artistKey)

  if (cached && now < cached.expiresAt) {
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(cached.data)
  }

  // If another request for this artist is already in flight, wait for it
  if (inflight.has(artistKey)) {
    try {
      const data = await inflight.get(artistKey)
      return res.status(200).json(data)
    } catch {
      // fall through and try ourselves
    }
  }

  const fetchPromise = (async () => {
    const [{ releases, topTracks }, artist] = await Promise.all([
      getArtistReleases(artistId),
      getArtistInfo(artistId),
    ])

    const topAlbumIds = topTracks.map((t) => t.album?.id).filter(Boolean)

    const sorted = [...releases].sort((a, b) => {
      const aIdx = topAlbumIds.indexOf(a.id)
      const bIdx = topAlbumIds.indexOf(b.id)
      if (aIdx === -1 && bIdx === -1) return new Date(b.release_date) - new Date(a.release_date)
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    })

    return { releases: sorted, artist }
  })()

  inflight.set(artistKey, fetchPromise)

  try {
    const payload = await fetchPromise
    inflight.delete(artistKey)
    cache.set(artistKey, { data: payload, expiresAt: now + CACHE_TTL_MS })
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(payload)
  } catch (err) {
    inflight.delete(artistKey)
    console.error(`releases API error (${artistKey}):`, err.message)
    if (cached) return res.status(200).json(cached.data)
    return res.status(500).json({ error: 'Failed to fetch releases' })
  }
}