// pages/api/releases.js
import { getArtistReleases, getArtistInfo } from '../../lib/spotify'

export default async function handler(req, res) {
  try {
    // Replace with your actual Spotify artist ID
    const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID

    const [{ releases, topTracks }, artist] = await Promise.all([
      getArtistReleases(ARTIST_ID),
      getArtistInfo(ARTIST_ID),
    ])

    // Sort releases: put most popular tracks' albums first
    const topAlbumIds = topTracks.map((t) => t.album?.id).filter(Boolean)

    const sorted = [...releases].sort((a, b) => {
      const aIdx = topAlbumIds.indexOf(a.id)
      const bIdx = topAlbumIds.indexOf(b.id)
      if (aIdx === -1 && bIdx === -1) return new Date(b.release_date) - new Date(a.release_date)
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    })

    res.status(200).json({ releases: sorted, artist })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch releases' })
  }
}
