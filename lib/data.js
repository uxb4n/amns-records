
// lib/data.js

export const PRESAVE_RELEASE = {
  name: "Not On My Level",
  subtitle: "Listen Now",
  image: "/not-on-my-level-cover.jpg",
  videoSrc: "/not-on-my-level-visualizer.mp4",
  href: "/noml",
}

export const RELEASES = {
  noml: {
    slug: "noml",
    name: "Not On My Level",
    subtitle: "Listen Now",
    image: "/not-on-my-level-cover.jpg",
    audioPreview: null,
    ctaLabel: "LISTEN NOW",
    mainCta: "https://distrokid.com/hyperfollow/akanico1/not-on-my-level/",
  },
  akanico101: {
    slug: "akanico101",
    name: "AKANICO101",
    subtitle: "Out now on all platforms",
    image: "/akanico101-cover.jpg",
    audioPreview: null,
    ctaLabel: "LISTEN NOW",
    mainCta: "https://distrokid.com/hyperfollow/akanico1/akanico101-3?ref=release",
    spotify: "https://open.spotify.com/album/38qlphcJ1C78dQVrRQkEQu?si=zvIMfXH8Qk6E2wyHfZKiFg",
    apple: "https://music.apple.com/us/artist/akanico/1888187899",
    youtube: "https://music.youtube.com/playlist?list=OLAK5uy_m6rDi3K8NZ_B1C95NkdSX916JFVIyzmsc&si=-gwLXMAb3pgmCLUw",
    soundcloud: "https://soundcloud.com/akanico-5908526",
  },
  "2hiup": {
    slug: "2hiup",
    name: "2hiup!",
    subtitle: "Out now on all platforms",
    image: "/2hiup-cover.jpg",
    audioPreview: "/2hiup-preview.mp3",
    ctaLabel: "LISTEN NOW",
    mainCta: "https://distrokid.com/hyperfollow/akanicoprodandrew/2hiup-3?ref=release",
    spotify: "https://open.spotify.com/album/4XfUgiMYDmDIDfShaXhnAz?si=HBBb-MCKQzuLHh7P7cjcEg",
    apple: "https://music.apple.com/us/album/2hiup-ep/6787534568",
    youtube: "https://music.youtube.com/playlist?list=OLAK5uy_lnMYehMSdd0rbuyS0PjpcZI2UL1xRMImE",
    soundcloud: "https://soundcloud.com/akanico-5908526/sets/2hiup?si=ad886ecc51d347cbb6fd40ca5048d223",
  },
  "never-landed": {
    slug: "never-landed",
    name: "Never Landed",
    subtitle: "Out now on all platforms",
    image: "/never-landed-cover.jpg",
    audioPreview: "/never-landed-preview.mp3",
    ctaLabel: "LISTEN NOW",
    mainCta: "https://distrokid.com/hyperfollow/akanicoprodandrew/never-landed-2/",
    spotify: "https://open.spotify.com/album/1cr6omL3yfwBtYxAA36kNg?si=qeIDGo44Qp-8WBfcTz_rnw",
    apple: "https://music.apple.com/us/album/never-landed/6777248901",
    youtube: "https://music.youtube.com/playlist?list=OLAK5uy_nUMLfipf3dR6mRIPucJwSvA7ja3NhYmh4&si=WmURqdZKJhGBiRLR",
    soundcloud: "https://soundcloud.com/akanico-5908526/sets/never-landed",
  },
  pfbl: {
    slug: "pfbl",
    name: "Perfect Balance",
    subtitle: "Out Now",
    image: "/perfect-balance-cover.jpg",
    audioPreview: null,
    ctaLabel: "LISTEN NOW",
    mainCta: "https://open.spotify.com/track/4WqFyRgEG16cWb4djIEkca?si=c7e42e2bbcec4b0a",
    spotify: "https://open.spotify.com/album/1cr6omL3yfwBtYxAA36kNg?si=qeIDGo44Qp-8WBfcTz_rnw",
    apple: "https://music.apple.com/us/album/perfect-balance/6777248901",
    youtube: "https://music.youtube.com/playlist?list=OLAK5uy_nUMLfipf3dR6mRIPucJwSvA7ja3NhYmh4&si=WmURqdZKJhGBiRLR",
    soundcloud: "https://soundcloud.com/akanico-5908526/sets/perfect-balance",
  },
}

export const PREVIEW_VOLUME = 0.5
export const FADE_IN_MS = 2000

// ── Kept for the /artist page (akanico.com). ──
export const ARTISTS = [
  {
    name: "Nico",
    role: "Singer / Rapper",
    bio: "The sharpest and main face of AMNS Records",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/artist/5prMdCGfvYHPYmM0Z3uuqr", icon: "spotify" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/akanico/1888187899", icon: "apple" },
      { label: "YouTube Music", href: "https://music.youtube.com/channel/UCWUQaBtQJ7c8GzW7p0h673Q", icon: "youtube" },
      { label: "Deezer", href: "https://www.deezer.com/us/artist/345031311", icon: "deezer" },
      { label: "Instagram", href: "https://www.instagram.com/imakanico/", icon: "instagram" },
      { label: "TikTok", href: "https://www.tiktok.com/@akanico97", icon: "tiktok" },
      { label: "SoundCloud", href: "https://soundcloud.com/akanico-5908526", icon: "soundcloud" },
    ],
  },
  {
    name: "Andrew",
    role: "Producer",
    bio: "Directing the sound behind every AMNS release.",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/artist/1EGq79LAIFS1RBfrvE4nrr", icon: "spotify" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/prod-andrew/1879155843", icon: "apple" },
      { label: "YouTube Music", href: "https://music.youtube.com/@prod.andrew12", icon: "youtube" },
      { label: "Deezer", href: "https://www.deezer.com/us/artist/310796461", icon: "deezer" },
      { label: "Instagram", href: "https://www.instagram.com/prod.andrew11/", icon: "instagram" },
      { label: "TikTok", href: "https://www.tiktok.com/@prod.andrew11", icon: "tiktok" },
      { label: "SoundCloud", href: "https://soundcloud.com/prodandrew11", icon: "soundcloud" },
    ],
  },
]

export const CONTACTS = [
  { label: "General", email: "AMNSRecords@outlook.com" },
  { label: "Andrew", email: "andrewamns@outlook.com" },
  { label: "Nico", email: "imakanico@outlook.com" },
  { label: "Graphic Designer", email: "uuxban@gmail.com" },
]

export const LABEL_SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/amns.records/", icon: "instagram" },
]

// ─────────────────────────────────────────────────────────────────────────
// ARTIST LAYERS — one full-screen section per artist on the label site.
// ─────────────────────────────────────────────────────────────────────────

export const ARTIST_LAYERS = [
  {
    id: 'nico',
    name: 'NICO',
    role: 'Singer · Rapper',
    location: 'Chicago, IL',
    bio: 'The sharpest and main face of AMNS Records',
    heroImage: '/nico-portrait.jpg',
    magazine: '/nico-magazine.jpg',
    releaseSlugs: ['noml', 'akanico101'],
    covers: [],
    socials: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/5prMdCGfvYHPYmM0Z3uuqr', icon: 'spotify' },
      { label: 'Apple Music', href: 'https://music.apple.com/us/artist/akanico/1888187899', icon: 'apple' },
      { label: 'YouTube Music', href: 'https://music.youtube.com/channel/UCWUQaBtQJ7c8GzW7p0h673Q', icon: 'youtube' },
      { label: 'Instagram', href: 'https://www.instagram.com/imakanico/', icon: 'instagram' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@akanico97', icon: 'tiktok' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/akanico-5908526', icon: 'soundcloud' },
    ],
  },
  {
    id: 'uxban',
    name: 'UXBAN',
    role: 'Rapper · Producer',
    location: 'Hamilton, NZ',
    bio: 'Demonstrating new talent from the other side of the world.',
    heroImage: '/uxban-portrait.jpg',
    magazine: '/uxban-magazine.jpg',
    releaseSlugs: [],
    covers: [
      {
        title: 'UXTRA',
        type: 'Album',
        year: '2026',
        image: '/uxban-uxtra.jpg',
        href: 'https://open.spotify.com/album/62Qw3eFdZ9SpvHqsVDKuDt?si=DfZPrGt4RkCR_Sg0Je90cw',
      },
    ],
    socials: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/433lt9JbmTHzNzHqZtiK7C?si=-7Gr55DQSS623OIvbieNtw', icon: 'spotify' },
      { label: 'Instagram', href: 'https://www.instagram.com/uxbanwtf', icon: 'instagram' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/uxban', icon: 'soundcloud' },
    ],
  },
  {
    id: 'jak',
    name: 'PRODBYJAK',
    role: 'Producer',
    location: 'Chicago, IL',
    bio: 'The producer of all producers.',
    heroImage: '/jak-portrait.jpg',
    magazine: '/prodbyjak-magazine.jpg',
    releaseSlugs: [],
    covers: [
      {
        title: 'UNI-VERSE',
        type: 'Album',
        year: '2026',
        image: '/jak-universe.jpg',
        href: 'https://open.spotify.com/album/2EMVoIRlvcy09aTWkXryCs?si=JmoOAuIPQUC6TyZVLalnNA',
      },
    ],
    socials: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/6E2H20yNY5HRZuzRUNAIY1?si=HpZy5_rrRTOu85OTRJRVHg', icon: 'spotify' },
      { label: 'Instagram', href: 'https://www.instagram.com/itsprodbyjak', icon: 'instagram' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/', icon: 'soundcloud' },
    ],
  },
]
