
import Image from 'next/image'
import Link from 'next/link'
import { RELEASES } from '../lib/data'
import { IconFor } from './icons'

// ── CUSTOMISE EACH ARTIST'S TOTAL STREAMS HERE ──

const ARTIST_STREAMS = {
  nico: '40k+',
  uxban: '13k+',
  jak: '1k+',
}

export default function ArtistLayer({ artist, number }) {
  const releases = (artist.releaseSlugs || [])
    .map((slug) => RELEASES[slug])
    .filter(Boolean)

  const covers = artist.covers || []
  const selectedReleases = covers.length === 0 ? releases : []
  const streams = ARTIST_STREAMS[artist.id] ?? '0'

  return (
    <section id={artist.id} className="artist-layer">
      <style jsx>{`
        .artist-layer {
          position: relative;
          min-height: 100svh;
          padding: clamp(48px, 6vw, 76px) 0;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          background: #0a0a0a;
        }

        .artist-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: .55;
          will-change: transform;
          transform-origin: center center;
          backface-visibility: hidden;
        }

        .artist-bg :global(img) {
          object-fit: cover;
          filter: grayscale(35%) brightness(.78);
        }

        .artist-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(10,10,10,.82) 0%,
            rgba(10,10,10,.68) 55%,
            rgba(10,10,10,.48) 100%
          );
        }

        .artist-content {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 56px);
          will-change: transform;
          backface-visibility: hidden;
        }

        .artist-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, 42%);
          gap: clamp(28px, 5vw, 64px);
          align-items: stretch;
          min-height: min(76vh, 820px);
        }

        .artist-info {
          min-width: 0;
          align-self: center;
          padding: 30px 0;
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin: 0 0 18px;
        }

        .artist-name {
          font-size: clamp(58px, 10vw, 130px);
          font-weight: 400;
          line-height: .85;
          letter-spacing: .02em;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .artist-role {
          margin: 22px 0 0;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .artist-location {
          margin: 9px 0 0;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 1px;
        }

        .artist-bio {
          max-width: 520px;
          margin: 24px 0 0;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-muted);
        }

        .artist-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }

        .social-link {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all .2s ease;
        }

        .social-link:hover {
          border-color: #fff;
          color: #fff;
          transform: translateY(-3px);
        }

        /* ── STREAM TOTAL ── */

        .artist-streams {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 28px;
          padding-left: 13px;
          border-left: 2px solid var(--border-light);
        }

        .streams-label {
          margin: 0;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        .streams-value {
          margin: 0;
          font-size: clamp(25px, 3vw, 36px);
          line-height: 1;
          letter-spacing: 1px;
          color: #fff;
        }

        .magazine {
          position: relative;
          min-width: 0;
          min-height: 100%;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #111;
        }

        .magazine-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .magazine-image :global(img) {
          object-fit: cover;
          object-position: center top;
          transition: transform .5s ease;
        }

        .magazine:hover .magazine-image :global(img) {
          transform: scale(1.015);
        }

        .magazine-gradient {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0,0,0,.68) 0%,
            rgba(0,0,0,.28) 28%,
            rgba(0,0,0,.08) 52%,
            transparent 76%
          );
        }

        .artist-subsection {
          margin-top: 65px;
        }

        .selected-work {
          margin-top: 36px;
        }

        .subsection-title {
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin: 0 0 22px;
        }

        .release-grid,
        .cover-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }

        .selected-work .cover-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .release-card,
        .cover-card {
          display: block;
          min-width: 0;
          color: #fff;
          text-decoration: none;
          border: 1px solid var(--border);
          background: rgba(17,17,17,.8);
          transition: border-color .2s ease, transform .2s ease;
        }

        .release-card:hover,
        .cover-card:hover {
          border-color: var(--border-light);
          transform: translateY(-4px);
        }

        .release-art,
        .cover-art {
          position: relative;
          aspect-ratio: 1;
          background: #111;
          overflow: hidden;
        }

        .release-art :global(img),
        .cover-art :global(img) {
          object-fit: cover;
          transition: transform .35s ease;
        }

        .release-card:hover .release-art :global(img),
        .cover-card:hover .cover-art :global(img) {
          transform: scale(1.04);
        }

        .release-info,
        .cover-info {
          padding: 15px;
        }

        .selected-work .cover-info {
          padding: 10px;
        }

        .release-name {
          font-size: 17px;
          letter-spacing: 1px;
          margin: 0;
        }

        .release-subtitle {
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 11px;
          color: var(--text-dim);
          margin: 7px 0 0;
        }

        .cover-title {
          font-size: 16px;
          letter-spacing: 1px;
          margin: 0;
        }

        .selected-work .cover-title {
          font-size: 13px;
        }

        .cover-meta {
          font-family: ui-sans-serif, system-ui, sans-serif;
          color: var(--text-dim);
          font-size: 11px;
          margin: 7px 0 0;
        }

        .selected-work .cover-meta {
          font-size: 10px;
        }

        @media (max-width: 700px) {
          .artist-top {
            grid-template-columns: minmax(0, 1fr) 145px;
            gap: 20px;
            min-height: 520px;
          }

          .artist-name {
            font-size: clamp(46px, 9vw, 76px);
          }

          .artist-bio {
            font-size: 13px;
          }

          .release-grid,
          .cover-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .artist-subsection {
            margin-top: 48px;
          }

          .selected-work {
            margin-top: 30px;
          }
        }

        @media (max-width: 480px) {
          .artist-top {
            grid-template-columns: minmax(0, 1fr) 115px;
            gap: 14px;
            min-height: 460px;
          }

          .artist-info {
            padding: 16px 0;
          }

          .artist-name {
            font-size: clamp(40px, 10vw, 58px);
          }

          .eyebrow {
            font-size: 9px;
            letter-spacing: 3px;
          }

          .artist-role {
            font-size: 10px;
            letter-spacing: 2px;
          }

          .artist-bio {
            font-size: 12px;
            line-height: 1.65;
          }

          .social-link {
            width: 36px;
            height: 36px;
          }

          .artist-layer {
            padding: 40px 0;
          }

          .selected-work .cover-grid {
            gap: 7px;
          }

          .selected-work .cover-info {
            padding: 7px;
          }

          .artist-streams {
            margin-top: 22px;
          }
        }

        @media (max-width: 350px) {
          .artist-top {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .magazine {
            min-height: 420px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .artist-bg,
          .artist-content {
            transform: none !important;
            will-change: auto;
          }
        }
      `}</style>

      {artist.heroImage && (
        <div className="artist-bg">
          <Image
            src={artist.heroImage}
            alt=""
            fill
            sizes="100vw"
          />
        </div>
      )}

      <div className="artist-overlay" />

      <div className="artist-content">
        <div className="artist-top">
          <div className="artist-info">
            <p className="eyebrow">
              {String(number).padStart(2, '0')} — Artist Profile
            </p>

            <h2 className="artist-name">{artist.name}</h2>

            <p className="artist-role">{artist.role}</p>

            {artist.location && (
              <p className="artist-location">{artist.location}</p>
            )}

            <p className="artist-bio">{artist.bio}</p>

            {artist.socials?.length > 0 && (
              <div className="artist-socials">
                {artist.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <IconFor type={social.icon} size={17} mono />
                  </a>
                ))}
              </div>
            )}

            <div className="artist-streams">
              <p className="streams-label">Total Streams</p>
              <p className="streams-value">{streams}</p>
            </div>

            {(covers.length > 0 || selectedReleases.length > 0) && (
              <div className="artist-subsection selected-work">
                <h3 className="subsection-title">Selected Work</h3>

                <div className="cover-grid">
                  {covers.length > 0
                    ? covers.map((cover) => (
                        <a
                          key={cover.title}
                          href={cover.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cover-card"
                        >
                          <div className="cover-art">
                            <Image
                              src={cover.image}
                              alt={cover.title}
                              fill
                              sizes="(max-width: 600px) 45vw, 220px"
                            />
                          </div>

                          <div className="cover-info">
                            <p className="cover-title">{cover.title}</p>
                            <p className="cover-meta">
                              {cover.type} · {cover.year}
                            </p>
                          </div>
                        </a>
                      ))
                    : selectedReleases.map((release) => (
                        <a
                          key={release.slug}
                          href={release.mainCta || `/${release.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cover-card"
                        >
                          <div className="cover-art">
                            <Image
                              src={release.image}
                              alt={release.name}
                              fill
                              sizes="(max-width: 600px) 45vw, 220px"
                            />
                          </div>

                          <div className="cover-info">
                            <p className="cover-title">{release.name}</p>
                            <p className="cover-meta">
                              {release.subtitle}
                            </p>
                          </div>
                        </a>
                      ))}
                </div>
              </div>
            )}
          </div>

          {artist.magazine && (
            <div className="magazine">
              <div className="magazine-image">
                <Image
                  src={artist.magazine}
                  alt={`${artist.name} digital magazine`}
                  fill
                  sizes="(max-width: 700px) 35vw, 42vw"
                />
              </div>

              <div className="magazine-gradient" />
            </div>
          )}
        </div>

        {covers.length > 0 && releases.length > 0 && (
          <div className="artist-subsection">
            <h3 className="subsection-title">Releases</h3>

            <div className="release-grid">
              {releases.map((release) => (
                <Link
                  key={release.slug}
                  href={`/${release.slug}`}
                  legacyBehavior
                >
                  <a className="release-card">
                    <div className="release-art">
                      <Image
                        src={release.image}
                        alt={release.name}
                        fill
                        sizes="(max-width: 600px) 45vw, 220px"
                      />
                    </div>

                    <div className="release-info">
                      <p className="release-name">{release.name}</p>
                      <p className="release-subtitle">
                        {release.subtitle}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
