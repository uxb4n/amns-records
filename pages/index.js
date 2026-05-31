import { useState, useEffect } from 'react'
import Head from 'next/head'

// ── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLACEHOLDER_RELEASES = [
  { id: '1', name: 'PLACEHOLDER — Most Popular', images: [{ url: '' }], release_date: '2024-01-01', external_urls: { spotify: '#' }, album_type: 'single' },
  { id: '2', name: 'PLACEHOLDER — Release 2',    images: [{ url: '' }], release_date: '2023-10-01', external_urls: { spotify: '#' }, album_type: 'single' },
  { id: '3', name: 'PLACEHOLDER — Release 3',    images: [{ url: '' }], release_date: '2023-07-01', external_urls: { spotify: '#' }, album_type: 'single' },
  { id: '4', name: 'PLACEHOLDER — Release 4',    images: [{ url: '' }], release_date: '2023-04-01', external_urls: { spotify: '#' }, album_type: 'single' },
]

const TEAM = [
  {
    name: 'Nico', role: 'Singer / Rapper',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/nico.amns/',                                    icon: 'instagram' },
      { label: 'TikTok',    href: 'https://www.tiktok.com/@akanico97',                                       icon: 'tiktok' },
      { label: 'Spotify',   href: 'https://open.spotify.com/artist/5prMdCGfvYHPYmM0Z3uuqr',                 icon: 'spotify' },
      { label: 'YouTube',   href: 'https://music.youtube.com/channel/UCWUQaBtQJ7c8GzW7p0h673Q',             icon: 'youtube' },
      { label: 'Apple',     href: 'https://music.apple.com/us/artist/akanico/1888187899',                   icon: 'apple' },
    ],
  },
  {
    name: 'Andrew', role: 'Producer',
    links: [
      { label: 'Instagram',  href: 'https://www.instagram.com/prod.andrew11/',                              icon: 'instagram' },
      { label: 'TikTok',     href: 'https://www.tiktok.com/@prod.andrew11',                                 icon: 'tiktok' },
      { label: 'Spotify',    href: 'https://open.spotify.com/artist/1EGq79LAIFS1RBfrvE4nrr',                icon: 'spotify' },
      { label: 'YouTube',    href: 'https://music.youtube.com/@prod.andrew12',                              icon: 'youtube' },
      { label: 'Apple',      href: 'https://music.apple.com/us/artist/prod-andrew/1879155843',              icon: 'apple' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/prodandrew11',                                   icon: 'soundcloud' },
    ],
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const SpotifyIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
const InstagramIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const TikTokIcon     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
const YouTubeIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
const AppleIcon      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
const SoundCloudIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.015 0-.023.006-.025.018l-.316 2.03.316 2.005c.002.012.01.018.025.018.014 0 .022-.006.024-.018l.36-2.005-.36-2.03c-.002-.012-.01-.018-.024-.018zm.894-.506c-.018 0-.028.008-.03.024l-.272 2.552.272 2.516c.002.016.012.024.03.024.017 0 .027-.008.03-.024l.31-2.516-.31-2.552c-.003-.016-.013-.024-.03-.024zm.93-.203c-.02 0-.033.01-.035.03l-.248 2.755.248 2.704c.002.02.015.03.035.03.02 0 .033-.01.035-.03l.283-2.704-.283-2.755c-.002-.02-.015-.03-.035-.03zm.954-.115c-.024 0-.038.012-.04.036l-.22 2.87.22 2.832c.002.024.016.036.04.036.024 0 .038-.012.04-.036l.25-2.832-.25-2.87c-.002-.024-.016-.036-.04-.036zm.977-.046c-.027 0-.043.014-.045.04l-.193 2.916.193 2.878c.002.026.018.04.045.04.027 0 .043-.014.045-.04l.22-2.878-.22-2.916c-.002-.026-.018-.04-.045-.04zm5.77 1.477c-.28-1.353-1.49-2.37-2.94-2.37-.384 0-.75.073-1.087.204-.135.05-.17.103-.172.148l-.003 9.207c.002.047.037.086.084.09h7.164c.59 0 1.067-.477 1.067-1.066 0-.59-.477-1.067-1.067-1.067H13.5c-.13 0-.235-.105-.235-.235V11.04c0-.13.105-.235.235-.235.13 0 .235.105.235.235v.588c0 .59.477 1.067 1.067 1.067.59 0 1.067-.477 1.067-1.067 0-.59-.477-1.067-1.067-1.067-.13 0-.235-.105-.235-.235 0-1.355-1.098-2.453-2.453-2.453z"/></svg>
const PlayIcon       = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>

function IconFor({ type }) {
  switch (type) {
    case 'instagram':  return <InstagramIcon />
    case 'spotify':    return <SpotifyIcon />
    case 'tiktok':     return <TikTokIcon />
    case 'youtube':    return <YouTubeIcon />
    case 'apple':      return <AppleIcon />
    case 'soundcloud': return <SoundCloudIcon />
    default:           return null
  }
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: mobile ? '0 20px' : '0 40px',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: (scrolled || menuOpen) ? 'rgba(8,8,8,0.96)' : 'transparent',
      backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <span style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '4px', color: 'var(--white)' }}>
        AMNS RECORDS
      </span>

      {mobile ? (
        <>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1px',
                background: 'var(--white)',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
          {/* Mobile dropdown */}
          {menuOpen && (
            <div style={{
              position: 'absolute', top: '64px', left: 0, right: 0,
              background: 'rgba(8,8,8,0.97)', borderBottom: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column',
              padding: '8px 0',
            }}>
              {['releases', 'videos', 'socials'].map(s => (
                <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} style={{
                  padding: '16px 24px',
                  fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                }}>{s}</a>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', gap: '32px' }}>
          {['releases', 'videos', 'socials'].map(s => (
            <a key={s} href={`#${s}`} style={{
              fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--text-muted)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{s}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const mobile = useIsMobile()
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: mobile ? '0 20px 60px' : '0 40px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Hero photo — swap andrew1.jpg for any photo in /public/ */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/andrew1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: 'grayscale(100%)',
      }} />
      {/* PLACEHOLDER GRID — remove this div once hero photo looks good */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.3,
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.97) 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="hero-label" style={{
          fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase',
          color: 'var(--text-dim)', marginBottom: '20px',
        }}>Independent Label</p>
        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: mobile ? 'clamp(64px, 18vw, 120px)' : 'clamp(72px, 14vw, 180px)',
          lineHeight: 0.9, letterSpacing: '2px', color: 'var(--white)',
        }}>
          <span className="hero-title-1" style={{ display: 'block' }}>AMNS</span>
          <span className="hero-title-2" style={{ display: 'block', color: 'var(--text-dim)', WebkitTextStroke: '1px var(--border-light)' }}>RECORDS</span>
        </h1>
        <div className="hero-line" style={{ marginTop: '40px', height: '1px', background: 'var(--text-dim)' }} />
      </div>
    </section>
  )
}

// ─── Release Cards ────────────────────────────────────────────────────────────
function ReleaseCard({ release, featured }) {
  const img = release.images?.[0]?.url
  const year = release.release_date?.split('-')[0]

  if (featured) {
    return (
      <a href={release.external_urls?.spotify || '#'} target="_blank" rel="noopener noreferrer"
        style={{
          display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)',
          position: 'relative', overflow: 'hidden', aspectRatio: '1 / 1',
          transition: 'border-color 0.3s', cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.querySelector('.play-btn').style.opacity = '1' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.querySelector('.play-btn').style.opacity = '0' }}
      >
        {img ? (
          <img src={img} alt={release.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'repeating-linear-gradient(45deg, var(--bg3) 0, var(--bg3) 10px, var(--bg2) 10px, var(--bg2) 20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '14px', letterSpacing: '4px', color: 'var(--text-dim)' }}>NO COVER</span>
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          padding: '40px 24px 24px',
        }}>
          <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '6px' }}>
            {release.album_type} · {year}
          </p>
          <p style={{ fontFamily: 'Bebas Neue', fontSize: '28px', letterSpacing: '2px', color: 'var(--white)', lineHeight: 1 }}>
            {release.name}
          </p>
        </div>
        <div className="play-btn" style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.2s', color: 'white',
        }}>
          <PlayIcon />
        </div>
      </a>
    )
  }

  return (
    <a href={release.external_urls?.spotify || '#'} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'flex', gap: '16px', alignItems: 'center',
        padding: '16px', background: 'var(--bg2)', border: '1px solid var(--border)',
        transition: 'border-color 0.2s', cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ width: '56px', height: '56px', flexShrink: 0, background: 'var(--bg3)', overflow: 'hidden' }}>
        {img && <img src={img} alt={release.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: 'Bebas Neue', fontSize: '17px', letterSpacing: '1px', color: 'var(--white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {release.name}
        </p>
        <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: '2px' }}>
          {release.album_type} · {year}
        </p>
      </div>
      <div style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}><PlayIcon /></div>
    </a>
  )
}

// ─── Releases ─────────────────────────────────────────────────────────────────
function Releases() {
  const [releases, setReleases] = useState(PLACEHOLDER_RELEASES)
  const [loading, setLoading] = useState(false)
  const mobile = useIsMobile()

  useEffect(() => {
    fetch('/api/releases')
      .then(r => r.json())
      .then(data => { if (data.releases?.length) setReleases(data.releases) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const [featured, ...rest] = releases

  return (
    <section id="releases" style={{ padding: mobile ? '80px 20px' : '120px 40px' }}>
      <SectionLabel>Releases</SectionLabel>
      {loading ? (
        <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>Loading...</p>
      ) : mobile ? (
        // Mobile: stacked layout
        <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <ReleaseCard release={featured} featured />
          {rest.slice(0, 3).map(r => <ReleaseCard key={r.id} release={r} />)}
        </div>
      ) : (
        // Desktop: 2-column grid
        <div className="reveal delay-2" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto',
          gap: '2px', maxWidth: '900px',
        }}>
          <div style={{ gridRow: '1 / span 3' }}>
            <ReleaseCard release={featured} featured />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {rest.slice(0, 3).map(r => <ReleaseCard key={r.id} release={r} />)}
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Photo Strip ──────────────────────────────────────────────────────────────
// To swap photos: change the src values to any filename in /public/
function PhotoStrip() {
  const mobile = useIsMobile()
  const photos = ['/andrew2.jpg', '/andrew3.jpg', '/andrew4.jpg']
  return (
    <div style={{ display: 'flex', gap: '2px', height: mobile ? '200px' : '340px', overflow: 'hidden' }}>
      {photos.map((src, i) => (
        <div key={i} className="photo-strip-item" style={{
          flex: 1,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(60%)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'}
        />
      ))}
    </div>
  )
}

// ─── Videos ───────────────────────────────────────────────────────────────────
function Videos() {
  const mobile = useIsMobile()
  return (
    <section id="videos" style={{ padding: mobile ? '80px 20px' : '120px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel>Music Videos</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2px', maxWidth: '900px',
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="reveal" style={{
            aspectRatio: '16/9', background: 'var(--bg2)', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '12px', color: 'var(--text-dim)',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '1px solid var(--border-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PlayIcon />
            </div>
            <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>Coming Soon</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '1px' }}>
        Music videos dropping soon. Stay tuned.
      </p>
    </section>
  )
}

// ─── Socials ──────────────────────────────────────────────────────────────────
function SocialLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 14px',
        border: '1px solid var(--border)',
        fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
        color: 'var(--text-muted)', transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.background = 'var(--bg3)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}
    >
      {icon}{label}
    </a>
  )
}

function SocialCard({ person }) {
  return (
    <div className="reveal card-hover" style={{
      border: '1px solid var(--border)', background: 'var(--bg2)',
      padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px',
    }}>
      <div>
        <p style={{ fontFamily: 'Bebas Neue', fontSize: '36px', letterSpacing: '3px', color: 'var(--white)' }}>{person.name}</p>
        <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: '4px' }}>{person.role}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {person.links.map(l => <SocialLink key={l.label} href={l.href} label={l.label} icon={<IconFor type={l.icon} />} />)}
      </div>
    </div>
  )
}

function Socials() {
  const mobile = useIsMobile()
  return (
    <section id="socials" style={{ padding: mobile ? '80px 20px' : '120px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel>The Team</SectionLabel>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px', maxWidth: '680px',
      }}>
        {TEAM.map(p => <SocialCard key={p.name} person={p} />)}
      </div>
    </section>
  )
}

// ─── Shared ───────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="reveal" style={{ marginBottom: '48px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '8px' }}>——</p>
      <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', letterSpacing: '3px', color: 'var(--white)' }}>{children}</h2>
    </div>
  )
}

function Footer() {
  const mobile = useIsMobile()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: mobile ? '32px 20px' : '40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontFamily: 'Bebas Neue', fontSize: '16px', letterSpacing: '4px', color: 'var(--text-dim)' }}>AMNS RECORDS</span>
      <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--text-dim)' }}>© {new Date().getFullYear()}</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal()
  return (
    <>
      <Head>
        <title>AMNS Records</title>
        <meta name="description" content="AMNS Records — Independent music label." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        <Hero />
        <Releases />
        <PhotoStrip />
        <Videos />
        <Socials />
      </main>
      <Footer />
    </>
  )
}