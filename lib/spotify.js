// lib/spotify.js

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

// Client-credentials tokens are valid for ~1 hour, but the previous version
// fetched a brand new one on every call — twice per request, since
// getArtistReleases and getArtistInfo each grabbed their own. On a route
// that's hit by every homepage pageview, that's 2 fresh token requests per
// visitor with no caching at all, which is exactly the kind of pattern that
// trips Spotify's rate limiter. Serverless instances on Vercel stay warm
// between invocations, so an in-memory cache here means most requests reuse
// the same token instead of asking Spotify for a new one.
let cachedToken = null
let cachedTokenExpiresAt = 0

async function getAccessToken() {
  const now = Date.now()
  if (cachedToken && now < cachedTokenExpiresAt) {
    return cachedToken
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      'Spotify credentials are missing — set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your environment variables (check they exist in Vercel Project Settings, not just locally).'
    )
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  })

  // Previously this went straight to response.json() regardless of status.
  // If Spotify (or a rate-limit layer in front of it) ever returns something
  // that isn't JSON — a 429 with a plain-text body, for instance — that
  // .json() call throws a raw SyntaxError with no context, which is what was
  // bubbling up as an unexplained 500. Check the status first so failures
  // produce a readable error instead.
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Spotify token request failed (${response.status}): ${text.slice(0, 200)}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error('Spotify token response had no access_token')
  }

  cachedToken = data.access_token
  // Refresh a minute before actual expiry so we never try to use a token in
  // its last few seconds of life.
  cachedTokenExpiresAt = now + (data.expires_in - 60) * 1000

  return cachedToken
}

async function spotifyFetch(path) {
  const access_token = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Spotify API request failed (${res.status}) for ${path}: ${text.slice(0, 200)}`)
  }

  return res.json()
}

export async function getArtistReleases(artistId) {
  const albumsData = await spotifyFetch(
    `/artists/${artistId}/albums?include_groups=album,single,appears_on&limit=10`
  )
  return {
    releases: albumsData.items || [],
    topTracks: [],
  }
}

export async function getArtistInfo(artistId) {
  return spotifyFetch(`/artists/${artistId}`)
}