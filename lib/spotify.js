// lib/spotify.js
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })
  return response.json()
}

export async function getArtistReleases(artistId) {
  const { access_token } = await getAccessToken()

  // Get all albums/singles
  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=20`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  )
  const albumsData = await albumsRes.json()

  // Get artist top tracks to determine popularity
  const topTracksRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  )
  const topTracksData = await topTracksRes.json()

  return {
    releases: albumsData.items || [],
    topTracks: topTracksData.tracks || [],
  }
}

export async function getArtistInfo(artistId) {
  const { access_token } = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  })
  return res.json()
}
