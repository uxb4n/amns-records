import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import {
  PRESAVE_RELEASE,
  RELEASES,
  ARTISTS,
  CONTACTS,
  PREVIEW_VOLUME,
  FADE_IN_MS,
} from '../lib/data'
import { IconFor } from '../components/icons'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// ── Hooks ──
function useIsMobile() {
  const [mobile, setMobile] = useState(null)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return mobile
}

// ── PlayIcon ──
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

// ── Shared bits ──
function PanelLabel({ children }) {
  return (
    <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "10px", flexShrink: 0 }}>
      {children}
    </p>
  )
}

function Panel({ children, style }) {
  return (
    <div style={{ border: "1px solid var(--border)", background: "var(--bg2)", padding: "18px 20px", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", flex: 1, ...style }}>
      {children}
    </div>
  )
}

// ─── Nav ───
function Nav({ mobile }) {
  return (
    <nav className="fade-in" style={{ height: "56px", flexShrink: 0, padding: mobile ? "0 18px" : "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", background: "#0a0a0a" }}>
      <span style={{ fontFamily: "Bebas Neue", fontSize: mobile ? "18px" : "24px", letterSpacing: mobile ? "2px" : "4px", color: "var(--white)" }}>
        AKANICO
      </span>
      
      {!PRESAVE_RELEASE.isTeaser && (
        <a href={PRESAVE_RELEASE.href} className="hover-lift" style={{ display: "flex", alignItems: "center", gap: "8px", padding: mobile ? "8px 16px" : "10px 22px", border: "1px solid var(--border-light)", background: "rgba(255,255,255,0.08)", fontFamily: "Bebas Neue", fontSize: mobile ? "13px" : "15px", letterSpacing: "2px", color: "var(--white)", textDecoration: "none" }}>
          LISTEN NOW
        </a>
      )}
    </nav>
  )
}

// ─── Release Panel ───
function ReleasePanel({ release, mobile }) {
  if (!release) return null;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", border: "1px solid var(--border)", background: "#0a0a0a", overflow: "hidden", minHeight: mobile ? "220px" : "auto", height: "100%" }}>
      <div style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", overflow: "hidden" }}>
        <Image src={release.image} alt={release.name} fill priority sizes="(max-width: 900px) 100vw, 20vw" style={{ objectFit: "cover" }} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", margin: 0 }}>{release.subtitle}</p>
        <p style={{ fontFamily: "Bebas Neue", fontSize: "18px", color: "#fff", margin: 0, letterSpacing: "1px", marginBottom: "8px" }}>{release.name}</p>
        <a href={release.mainCta} target="_blank" rel="noopener noreferrer" className="hover-lift" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid var(--border-light)", background: "rgba(255,255,255,0.05)", color: "#fff", textDecoration: "none", fontSize: "10px", letterSpacing: "2px", fontFamily: "Bebas Neue", alignSelf: "flex-start" }}>
          <PlayIcon /> {release.ctaLabel === "PRESAVE" ? "PRESAVE" : "LISTEN"}
        </a>
      </div>
    </div>
  );
}

// ─── Contact Panel ───
function ContactPanel({ mobile }) {
  return (
    <Panel style={{ flex: 1, minHeight: mobile ? "auto" : 0 }}>
      <PanelLabel>Contact</PanelLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {CONTACTS.map((c) => (
          <a key={c.email} href={`mailto:${c.email}`} className="hover-lift" style={{ display: "flex", justifyContent: "space-between", gap: "8px", padding: "6px 10px", border: "1px solid var(--border)", color: "inherit", textDecoration: "none", fontSize: "10px" }}>
            <span style={{ color: "var(--text-dim)", letterSpacing: "1.5px" }}>{c.label}</span>
            <span style={{ color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "140px" }}>{c.email}</span>
          </a>
        ))}
      </div>
    </Panel>
  );
}

// ─── Social Panel ───
function SocialPanel({ artist, mobile }) {
  return (
    <Panel style={{ flex: 1, minHeight: mobile ? "auto" : 0, overflowY: "auto", height: "100%" }}>
      <PanelLabel>{artist.name}</PanelLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        {artist.links.map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover-lift" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", transition: "transform 0.2s, border-color 0.2s" }}>
            <IconFor type={icon} /> {label}
          </a>
        ))}
      </div>
    </Panel>
  )
}

// ─── Hero ───
function PresaveHero({ mobile }) {
  const { image, bgImage, videoSrc, href, isTeaser, name, subtitle } = PRESAVE_RELEASE

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", border: "1px solid var(--border)", background: "#0a0a0a", padding: mobile ? "40px 24px" : "60px 40px", minHeight: mobile ? "auto" : "400px", height: "100%", overflow: "hidden" }}>
      
      {videoSrc ? (
        <video src={videoSrc} autoPlay muted loop playsInline className="hero-bg-pan" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(60%) brightness(0.4)", zIndex: 0 }} />
      ) : (
        <Image src={bgImage || image} alt="" fill priority sizes="(max-width: 900px) 100vw, 40vw" className="hero-bg-pan" style={{ objectFit: "cover", filter: "grayscale(60%) brightness(0.4)", zIndex: 0 }} />
      )}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 100%)", zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "600px", margin: "0 auto" }}>

        <div style={{ position: "relative", width: mobile ? "120px" : "160px", height: mobile ? "120px" : "160px", marginTop: 0, marginBottom: "20px", border: "1px solid var(--border-light)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          <Image 
            src={image} 
            alt={name} 
            fill 
            priority 
            sizes="(max-width: 900px) 120px, 160px" 
            style={{ objectFit: "cover", filter: isTeaser ? "blur(8px) scale(1.1)" : "none" }} 
          />
        </div>

        <h1 style={{ fontFamily: "Bebas Neue", fontSize: mobile ? "clamp(40px, 10vw, 64px)" : "clamp(56px, 6vw, 96px)", lineHeight: 0.95, letterSpacing: "2px", color: "#fff", margin: 0, marginBottom: isTeaser ? "10px" : "20px" }}>
          {name}
        </h1>

        {isTeaser ? (
          <p style={{ fontFamily: "Bebas Neue", fontSize: "16px", letterSpacing: "4px", color: "var(--text-dim)", margin: 0 }}>
            {subtitle}
          </p>
        ) : (
          <a href={href} className="hover-lift" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: mobile ? "10px 24px" : "12px 32px", border: "1px solid var(--border-light)", background: "rgba(255,255,255,0.08)", fontFamily: "Bebas Neue", fontSize: mobile ? "16px" : "18px", letterSpacing: "3px", color: "var(--white)", textDecoration: "none", marginBottom: 0, transition: "all 0.2s ease" }}>
            LISTEN NOW
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ flexShrink: 0, height: "28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#0a0a0a" }}>
      <span style={{ fontSize: "9px", letterSpacing: "1px", color: "var(--text-dim)", textAlign: "center", padding: "0 16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
        ℗© 2026 AKANICO. All rights reserved.
      </span>
    </footer>
  )
}

// ─── Release Modal ───
function ReleaseModal({ release, onClose }) {
  const mobile = useIsMobile()
  const audioRef = useRef(null)
  const fadeFrameRef = useRef(null)

  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(PREVIEW_VOLUME)

  const fadeTo = (audio, to) => {
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current)
    const from = audio.volume
    const start = performance.now()

    const step = (t) => {
      const progress = Math.min((t - start) / FADE_IN_MS, 1)
      audio.volume = from + (to - from) * progress
      if (progress < 1) fadeFrameRef.current = requestAnimationFrame(step)
    }
    fadeFrameRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (!release.audioPreview) return
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0

    const tryPlay = () => {
      audio.play().then(() => fadeTo(audio, PREVIEW_VOLUME)).catch(() => {})
    }
    tryPlay()

    const onFirstInteract = () => {
      tryPlay()
      window.removeEventListener("pointerdown", onFirstInteract)
    }
    window.addEventListener("pointerdown", onFirstInteract)

    return () => {
      window.removeEventListener("pointerdown", onFirstInteract)
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current)
    }
  }, [release.slug, release.audioPreview])

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  const handleVolumeChange = (e) => {
    const next = parseFloat(e.target.value)
    setVolume(next)
    const audio = audioRef.current
    if (!audio) return
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current)
    audio.volume = next
    if (audio.muted && next > 0) {
      audio.muted = false
      setMuted(false)
    }
  }

  const platformLinks = [
    { label: "Spotify", href: release.spotify, icon: "spotify" },
    { label: "Apple Music", href: release.apple, icon: "apple" },
    { label: "YouTube Music", href: release.youtube, icon: "youtube" },
    { label: "SoundCloud", href: release.soundcloud, icon: "soundcloud" },
  ].filter((link) => !!link.href)

  const hasAudio = !!release.audioPreview

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(5,5,5,0.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: mobile ? "16px" : "24px" }}>
      <div onClick={(e) => e.stopPropagation()} className="fade-in" style={{ position: "relative", width: "100%", maxWidth: mobile ? "420px" : "640px", maxHeight: "92vh", overflowY: "auto", background: "#0a0a0a", border: "1px solid var(--border-light)", padding: mobile ? "32px 22px" : "48px 56px", textAlign: "center" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "14px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border-light)", background: "rgba(255,255,255,0.05)", color: "var(--white)", fontSize: "16px", lineHeight: 1, cursor: "pointer" }}>
          ×
        </button>

        {hasAudio && (
          <audio ref={audioRef} src={release.audioPreview} loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        )}

        <div style={{ position: "relative", width: mobile ? "160px" : "220px", height: mobile ? "160px" : "220px", margin: "0 auto 22px" }}>
          <Image src={release.image} alt={release.name} fill sizes={mobile ? "160px" : "220px"} style={{ objectFit: "cover", border: "1px solid var(--border-light)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }} />

          {hasAudio && (
            <>
              <button onClick={toggleMute} aria-label={muted ? "Unmute preview" : "Mute preview"} style={{ position: "absolute", bottom: "-14px", right: "-14px", width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border-light)", background: "#0a0a0a", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {muted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.42.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.24 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                )}
              </button>
              {playing && (
                <div style={{ position: "absolute", top: "-12px", left: "-12px", width: "34px", height: "24px", boxSizing: "border-box", display: "flex", gap: "3px", alignItems: "flex-end", justifyContent: "center", padding: "5px 7px", background: "#0a0a0a", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                  <span className="eq-bar" style={{ animationDelay: "0s" }} />
                  <span className="eq-bar" style={{ animationDelay: "0.15s" }} />
                  <span className="eq-bar" style={{ animationDelay: "0.3s" }} />
                </div>
              )}
            </>
          )}
        </div>

        {hasAudio && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "0 auto 20px", maxWidth: "220px" }}>
            <span style={{ color: "var(--text-dim)", flexShrink: 0, display: "flex" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.24 2.5-4.02z" /></svg>
            </span>
            <input type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={handleVolumeChange} aria-label="Preview volume" className="volume-slider" style={{ flex: 1 }} />
          </div>
        )}

        <p style={{ fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "10px" }}>// New Release</p>
        <h2 style={{ fontFamily: "Bebas Neue", letterSpacing: "2px", color: "var(--white)", fontSize: mobile ? "40px" : "58px", lineHeight: 1, marginBottom: "10px" }}>{release.name}</h2>
        <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "26px" }}>{release.subtitle}</p>

        <a href={release.mainCta} target="_blank" rel="noopener noreferrer" className="presave-cta" style={{ display: "inline-block", padding: "15px 38px", marginBottom: "24px", border: "1px solid var(--white)", background: "rgba(255,255,255,0.1)", fontFamily: "Bebas Neue", fontSize: "16px", letterSpacing: "3px", color: "var(--white)", textDecoration: "none" }}>
          {release.ctaLabel || "LISTEN NOW"}
        </a>

        {platformLinks.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
            {platformLinks.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover-lift" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "11px 10px", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>
                <IconFor type={icon} /> {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ───
export default function Home({ releaseSlug = null }) {
  const mobileRaw = useIsMobile()
  const mobile = mobileRaw !== false
  const router = useRouter()
  const activeRelease = releaseSlug ? RELEASES[releaseSlug] : null
  const [showModal, setShowModal] = useState(!!activeRelease)

  const backToHome = () => router.push("/")

  if (activeRelease) {
    return (
      <>
        <Head>
          <title>{`${activeRelease.name} — AKANICO`}</title>
          <meta name="description" content={`Listen to ${activeRelease.name} by AKANICO.`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={`${activeRelease.name} — AKANICO`} />
          <meta property="og:description" content={`Listen to ${activeRelease.name} by AKANICO.`} />
          <meta property="og:image" content={activeRelease.image} />
        </Head>
        <style jsx global>{`
          * { box-sizing: border-box; }
          html, body, #__next { height: 100%; margin: 0; padding: 0; background: #0a0a0a; }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-thumb { background: var(--border-light, #333); }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes ctaGlow { 0%, 100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); } 50% { box-shadow: 0 0 22px rgba(255, 255, 255, 0.35); } }
          @keyframes eqBounce { 0%, 100% { height: 4px; } 50% { height: 14px; } }
          .fade-in { animation: fadeInUp 0.6s ease both; }
          .presave-cta { position: relative; transition: transform 0.25s ease, color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease; animation: ctaGlow 2.6s ease-in-out infinite; }
          .presave-cta:hover { background-color: #fff !important; color: #0a0a0a !important; transform: scale(1.06); border-color: #fff !important; }
          .hover-lift { transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease; }
          .hover-lift:hover { transform: translateY(-2px); border-color: var(--border-light, #444) !important; }
          .eq-bar { width: 3px; height: 4px; background: #fff; animation: eqBounce 0.9s ease-in-out infinite; }
          .volume-slider { -webkit-appearance: none; appearance: none; height: 2px; background: var(--border-light, #444); outline: none; cursor: pointer; }
          .volume-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 11px; height: 11px; border-radius: 50%; background: #fff; cursor: pointer; border: none; }
          .volume-slider::-moz-range-thumb { width: 11px; height: 11px; border-radius: 50%; background: #fff; cursor: pointer; border: none; }
          .volume-slider::-moz-range-track { height: 2px; background: var(--border-light, #444); }
        `}</style>
        {showModal && (
          <div className={bebasNeue.className}>
            <ReleaseModal release={activeRelease} onClose={backToHome} />
          </div>
        )}
        <Analytics />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>AKANICO</title>
        <meta name="description" content="AKANICO — Official Website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; }
        html, body, #__next { height: 100%; margin: 0; padding: 0; }
        html { overflow: ${mobile ? 'auto' : 'hidden'}; }
        body { overflow: ${mobile ? 'auto' : 'hidden'}; overscroll-behavior: none; }
        #__next { display: flex; flex-direction: column; overflow: ${mobile ? 'visible' : 'hidden'}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--border-light); }
        :root {
          --white: #ffffff;
          --border: #2a2a2a;
          --border-light: #444;
          --bg2: #111;
          --bg3: #1a1a1a;
          --text-dim: rgba(255, 255, 255, 0.45);
          --text-muted: rgba(255, 255, 255, 0.7);
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ctaGlow { 0%, 100% { box-shadow: 0 0 0px rgba(255, 255, 255, 0); } 50% { box-shadow: 0 0 22px rgba(255, 255, 255, 0.35); } }
        @keyframes kenBurns { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(1.08) translate(-1%, -1%); } }
        @keyframes shimmerLabel { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        .fade-in { animation: fadeInUp 0.6s ease both; }
        .presave-cta { position: relative; transition: transform 0.25s ease, color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease; animation: ctaGlow 2.6s ease-in-out infinite; }
        .presave-cta:hover { background-color: var(--white) !important; color: #0a0a0a !important; transform: scale(1.06); border-color: var(--white) !important; }
        .hover-lift { transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease; }
        .hover-lift:hover { transform: translateY(-2px); border-color: var(--border-light) !important; }
        .gallery-tile { transition: filter 0.3s ease, transform 0.3s ease; }
        .gallery-tile:hover { transform: scale(1.04); }
        .hero-bg-pan { animation: kenBurns 16s ease-in-out infinite alternate; }
        .hero-label-pulse { animation: shimmerLabel 3s ease-in-out infinite; }
      `}</style>

      <div className={bebasNeue.className} style={{ flex: mobile ? 'none' : 1, minHeight: mobile ? '100dvh' : 0, display: 'flex', flexDirection: 'column', overflow: mobile ? 'visible' : 'hidden', background: '#0a0a0a' }}>
        <Nav mobile={mobile} />

        <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: '12px', padding: mobile ? '12px' : '16px', overflow: mobile ? 'visible' : 'hidden' }}>
          {mobile ? (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', height: '100%' }}>
              <PresaveHero mobile={mobile} />
              <ReleasePanel release={RELEASES['never-landed']} mobile={mobile} />
              <SocialPanel artist={ARTISTS[0]} mobile={mobile} />
              <SocialPanel artist={ARTISTS[1]} mobile={mobile} />
              <ReleasePanel release={RELEASES.akanico101} mobile={mobile} />
              <ReleasePanel release={RELEASES.pfbl} mobile={mobile} />
              <ReleasePanel release={RELEASES['2hiup']} mobile={mobile} />
            </div>
          ) : (
            <>
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0, height: '100%', animationDelay: '0.05s' }}>
                <ReleasePanel release={RELEASES.pfbl} mobile={mobile} />
                <ReleasePanel release={RELEASES['never-landed']} mobile={mobile} />
              </div>

              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 2.5, minHeight: 0, height: '100%', position: 'relative', animationDelay: '0.10s' }}>

                <PresaveHero mobile={mobile} />

                <div style={{ display: 'flex', gap: '12px', flexShrink: 0, height: '280px' }}>
                  <ContactPanel mobile={mobile} />
                  <SocialPanel artist={ARTISTS[0]} mobile={mobile} />
                  <ContactPanel mobile={mobile} />
                </div>
              </div>

              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0, height: '100%', animationDelay: '0.15s' }}>
                <ReleasePanel release={RELEASES.akanico101} mobile={mobile} />
                <ReleasePanel release={RELEASES['2hiup']} mobile={mobile} />
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>

      <Analytics />
    </>
  )
}