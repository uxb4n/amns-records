
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ARTIST_LAYERS, CONTACTS, LABEL_SOCIALS } from '../lib/data'
import { IconFor } from '../components/icons'
import ArtistLayer from '../components/ArtistLayer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// ── Edit these ──
const BANNER_IMAGE = '/amns-banner.jpg'

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Nico', href: '#nico' },
  { label: 'Uxban', href: '#uxban' },
  { label: 'Jak', href: '#jak' },
  { label: 'Contact', href: '#contact' },
]

// ── Page ──

export default function Label() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (reducedMotion.matches) return

    let rafId = null

    const updateParallax = () => {
      const sections = document.querySelectorAll(
        '.l1, .artist-layer'
      )

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        const background = section.querySelector(
          '.l1-bg, .artist-bg'
        )

        const content = section.querySelector(
          '.l1-inner, .artist-content'
        )

        // Background moves slower than scrolling
        if (background) {
          const offset = -rect.top * 0.2

          background.style.transform =
            `translate3d(0, ${offset}px, 0) scale(1.15)`
        }

        // Foreground content moves subtly
        if (content) {
          const offset = -rect.top * 0.035

          content.style.transform =
            `translate3d(0, ${offset}px, 0)`
        }
      })
    }

    const handleScroll = () => {
      if (rafId !== null) return

      rafId = requestAnimationFrame(() => {
        updateParallax()
        rafId = null
      })
    }

    updateParallax()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>AMNS Records — Independent Music Label</title>
        <meta
          name="description"
          content="AMNS Records is an independent label. Home of Nico, Uxban and prodbyjak — releases, covers and collabs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="AMNS Records — Independent Music Label" />
        <meta
          property="og:description"
          content="Nico · Uxban · prodbyjak."
        />
        <meta property="og:image" content={BANNER_IMAGE} />
        <meta property="og:type" content="website" />
      </Head>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }

        body {
          color: #fff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }

        :root {
          --white: #ffffff;
          --border: #2a2a2a;
          --border-light: #444;
          --bg2: #111;
          --text-dim: rgba(255, 255, 255, 0.45);
          --text-muted: rgba(255, 255, 255, 0.7);
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--border-light);
        }

        ::selection {
          background: #fff;
          color: #0a0a0a;
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 56px);
        }

        section {
          scroll-margin-top: 56px;
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin: 0 0 18px;
        }

        /* ── GLOBAL PARALLAX ── */

        .l1-bg,
        .artist-bg {
          will-change: transform;
          transform-origin: center center;
          backface-visibility: hidden;
        }

        .l1-inner,
        .artist-content {
          will-change: transform;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .l1-bg,
          .artist-bg,
          .l1-inner,
          .artist-content {
            transform: none !important;
            will-change: auto;
          }
        }

        /* ── Navigation ── */

        .topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 40px);
          background: rgba(10,10,10,.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .topbar-brand {
          font-size: 18px;
          letter-spacing: 3px;
          color: #fff;
          text-decoration: none;
        }

        .topbar-links {
          display: flex;
          gap: 22px;
        }

        .topbar-links a {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          transition: color .2s ease;
        }

        .topbar-links a:hover {
          color: #fff;
        }

        @media (max-width: 900px) {
          .topbar-links {
            display: none;
          }
        }

        /* ── Layer 1 — Banner ── */

        .l1 {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(28px, 6vw, 80px);
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          background: #0a0a0a;
        }

        .l1-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .l1-bg :global(img) {
          object-fit: cover;
          filter: grayscale(100%) brightness(.5) contrast(1.05);
        }

        .l1-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(10,10,10,.55) 0%,
            rgba(10,10,10,.7) 45%,
            #0a0a0a 100%
          );
        }

        .l1-inner {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
        }

        .l1-kicker {
          font-size: clamp(11px, 1.4vw, 13px);
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 18px;
        }

        .l1-title {
          font-weight: 400;
          margin: 0;
          font-size: clamp(64px, 15vw, 220px);
          line-height: .8;
          letter-spacing: .02em;
        }

        .l1-sub {
          margin: 26px 0 0;
          max-width: 46ch;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(13px, 1.5vw, 15px);
          line-height: 1.75;
          letter-spacing: .4px;
          color: var(--text-muted);
        }

        .l1-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 34px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border: 1px solid var(--border-light);
          background: rgba(255,255,255,.06);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          letter-spacing: 3px;
          text-decoration: none;
          cursor: pointer;
          transition: all .22s ease;
        }

        .btn:hover {
          background: #fff;
          color: #0a0a0a;
          border-color: #fff;
          transform: translateY(-2px);
        }

        .btn-solid {
          background: #fff;
          color: #0a0a0a;
          border-color: #fff;
        }

        .btn-solid:hover {
          background: transparent;
          color: #fff;
        }

        .l1-socials {
          display: flex;
          gap: 8px;
          margin-top: 34px;
        }

        .social-dot {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all .2s ease;
        }

        .social-dot:hover {
          border-color: var(--border-light);
          transform: translateY(-2px);
        }

        .l1-scroll {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--text-dim);
          animation: nudge 2.4s ease-in-out infinite;
        }

        @keyframes nudge {
          0%, 100% {
            opacity: .35;
            transform: translate(-50%, 0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, 6px);
          }
        }

        /* ── Contact ── */

        .l4 {
          padding: clamp(64px, 11vw, 140px) 0 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px 22px;
          border: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: all .2s ease;
        }

        .contact-card:hover {
          border-color: var(--border-light);
          background: var(--bg2);
          transform: translateY(-3px);
        }

        .contact-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        .contact-mail {
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 12px;
          color: var(--text-muted);
          word-break: break-all;
        }

        .foot {
          margin-top: clamp(56px, 9vw, 110px);
          padding: 26px 0;
          border-top: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-dim);
        }
      `}</style>

      <div className={bebasNeue.className}>
        <nav className="topbar">
          <a href="#top" className="topbar-brand">
            AMNS RECORDS
          </a>

          <div className="topbar-links">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── LAYER 1 — BANNER ── */}

        <section id="top" className="l1">
          <div className="l1-bg">
            <Image
              src={BANNER_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div className="l1-scrim" />

          <div className="l1-inner">
            <p className="l1-kicker">Independent · Est. AMNS</p>

            <h1 className="l1-title">
              AMNS
              <br />
              RECORDS
            </h1>

            <p className="l1-sub">
              AMNS Records is an independent label. 
              Home of akaNico, Uxban and prodbyjak, releases, covers and collabs.
            </p>

            <div className="l1-actions">
              <Link href="/noml" className="btn btn-solid">
                LISTEN NOW
              </Link>

              <a href="#nico" className="btn">
                MEET THE ARTISTS
              </a>
            </div>

            <div className="l1-socials">
              {LABEL_SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dot"
                  aria-label={s.label}
                >
                  <IconFor type={s.icon} size={16} mono />
                </a>
              ))}
            </div>
          </div>

          <span className="l1-scroll">Scroll</span>
        </section>

        {/* ── LAYERS 2–4 — ONE PER ARTIST ── */}

        {ARTIST_LAYERS.map((artist, i) => (
          <ArtistLayer
            key={artist.id}
            artist={artist}
            number={i + 2}
          />
        ))}

        {/* ── LAYER 5 — CONTACT ── */}

        <section id="contact" className="l4">
          <div className="wrap">
            <p className="eyebrow">05 — Contact</p>

            <h2 className="sec-title">WORK WITH US</h2>

            <div className="contact-grid">
              {CONTACTS.map((c) => (
                <a
                  key={c.email}
                  href={`mailto:${c.email}`}
                  className="contact-card"
                >
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-mail">{c.email}</span>
                </a>
              ))}
            </div>

            <div className="foot">
              <span>℗© 2026 AMNS Records. All rights reserved.</span>
              <span>Nico · Uxban · prodbyjak</span>
            </div>
          </div>
        </section>
      </div>

      <Analytics />
    </>
  )
}
