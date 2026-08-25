import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box } from 'lucide-react'

// Pyramid rows, top (narrow) -> bottom (wide), icon + name label
const pyramidRows = [
  // Database
  [
    { slug: 'mongodb', color: '#47A248', name: 'MongoDB' },
    { slug: 'mysql', color: '#4479A1', name: 'SQL' },
  ],
  // Backend
  [
    { slug: 'nodedotjs', color: '#339933', name: 'Node.js' },
    { slug: 'express', color: '#ffffff', name: 'Express.js' },
    { slug: 'fastapi', color: '#009688', name: 'FastAPI' },
  ],
  // Languages
  [
    { slug: 'openjdk', color: '#5382A1', name: 'Java' },
    { slug: 'python', color: '#3776AB', name: 'Python' },
    { slug: 'c', color: '#A8B9CC', name: 'C' },
  ],
  // Tools
  [
    { slug: 'git', color: '#F05032', name: 'Git' },
    { slug: 'github', color: '#ffffff', name: 'GitHub' },
    { slug: 'groq', color: '#F55036', name: 'Groq SDK' },
    { slug: 'vite', color: '#646CFF', name: 'Vite' },
  ],
  // Frontend
  [
    { slug: 'react', color: '#61DAFB', name: 'React.js' },
    { slug: 'tailwindcss', color: '#38BDF8', name: 'Tailwind CSS' },
    { slug: 'html5', color: '#E34F26', name: 'HTML5' },
    { slug: 'css3', color: '#1572B6', name: 'CSS3' },
    { slug: 'javascript', color: '#F7DF1E', name: 'JavaScript' },
  ],
]

// flat index map so the whole pyramid staggers top -> bottom, not row by row
let __i = 0
const flatIndex = pyramidRows.map((row) => row.map(() => __i++))

function TechIcon({ slug, color, name, delay, visible }) {
  const [failed, setFailed] = useState(false)
  const [primaryFailed, setPrimaryFailed] = useState(false)
  const src = `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`
  const fallbackSrc = `https://cdn.simpleicons.org/${slug}`

  return (
    <div
      className="tech-icon-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.55)',
        filter: visible ? 'blur(0px)' : 'blur(6px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="tech-icon-box" style={{ '--glow': color }}>
        <span className="tech-icon-corner tl" />
        <span className="tech-icon-corner tr" />
        <span className="tech-icon-corner bl" />
        <span className="tech-icon-corner br" />
        {failed ? (
          <Box className="tech-icon-fallback" style={{ color }} strokeWidth={1.5} />
        ) : (
          <img
            src={primaryFailed ? fallbackSrc : src}
            alt={name}
            className="tech-icon-img"
            draggable="false"
            onError={() => {
              if (!primaryFailed) setPrimaryFailed(true)
              else setFailed(true)
            }}
          />
        )}
      </div>
      <span className="tech-icon-label">{name}</span>
    </div>
  )
}

export default function TechStack() {
  const [visible, setVisible] = useState(false)

  return (
    <section id="techstack" className="relative mx-auto max-w-[90rem] overflow-hidden px-4 py-16 sm:px-8 sm:py-24">
      <style>{`
        .tech-icon-box {
          position: relative;
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 0.8rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease,
                      background 0.35s ease;
        }
        @media (min-width: 640px) {
          .tech-icon-box {
            width: 4.25rem;
            height: 4.25rem;
            border-radius: 0.9rem;
            padding: 0.95rem;
          }
        }
        .tech-icon-box:hover {
          transform: scale(1.16) translateY(-3px);
          border-color: var(--glow);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 26px -4px var(--glow), 0 0 10px -3px var(--glow);
        }
        .tech-icon-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1.5px solid var(--glow);
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .tech-icon-box:hover .tech-icon-corner {
          opacity: 0.9;
        }
        .tech-icon-corner.tl { top: -5px; left: -5px; border-right: none; border-bottom: none; transform: translate(4px, 4px); }
        .tech-icon-corner.tr { top: -5px; right: -5px; border-left: none; border-bottom: none; transform: translate(-4px, 4px); }
        .tech-icon-corner.bl { bottom: -5px; left: -5px; border-right: none; border-top: none; transform: translate(4px, -4px); }
        .tech-icon-corner.br { bottom: -5px; right: -5px; border-left: none; border-top: none; transform: translate(-4px, -4px); }
        .tech-icon-box:hover .tech-icon-corner.tl,
        .tech-icon-box:hover .tech-icon-corner.tr,
        .tech-icon-box:hover .tech-icon-corner.bl,
        .tech-icon-box:hover .tech-icon-corner.br {
          transform: translate(0, 0);
        }
        .tech-icon-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
        }
        .tech-icon-fallback {
          width: 60%;
          height: 60%;
          position: relative;
        }
        .tech-icon-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.6s ease;
        }
        @media (min-width: 640px) {
          .tech-icon-col { gap: 0.5rem; }
        }
        .tech-icon-label {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.55);
          font-family: 'Space Grotesk', ui-monospace, monospace;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .tech-icon-label { font-size: 0.7rem; }
        }

        @keyframes headingGlitch {
          0%, 88%, 100% {
            text-shadow: none;
            clip-path: inset(0 0 0 0);
          }
          89% {
            text-shadow: -4px 0 #ff2079, 4px 0 #22e5ff;
            clip-path: inset(10% 0 60% 0);
          }
          90.5% {
            text-shadow: 4px 0 #ff2079, -4px 0 #13e6a0;
            clip-path: inset(55% 0 10% 0);
          }
          91.5% {
            text-shadow: -3px 0 #22e5ff, 3px 0 #ff2079;
            clip-path: inset(20% 0 40% 0);
          }
          92.5% {
            text-shadow: none;
            clip-path: inset(0 0 0 0);
          }
          95%, 96% {
            text-shadow: 3px 0 #13e6a0, -3px 0 #ff2079;
            clip-path: inset(40% 0 25% 0);
          }
          97% {
            text-shadow: none;
            clip-path: inset(0 0 0 0);
          }
        }
        .heading-glitch {
          display: inline-block;
          animation: headingGlitch 2s steps(1) infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" />

      <h2 className="heading-glitch mb-10 font-display text-3xl font-semibold text-white sm:mb-16 sm:text-4xl md:text-5xl">
        Tech Stack
      </h2>

      <motion.div
        className="relative flex flex-col items-center gap-2 sm:gap-3"
        viewport={{ once: false, amount: 0.2 }}
        onViewportEnter={() => setVisible(true)}
        onViewportLeave={() => setVisible(false)}
      >
        {pyramidRows.map((row, i) => (
          <div key={i} className="flex flex-wrap items-start justify-center gap-3 sm:gap-5">
            {row.map((icon, j) => (
              <TechIcon
                key={icon.slug}
                slug={icon.slug}
                color={icon.color}
                name={icon.name}
                visible={visible}
                delay={flatIndex[i][j] * 55}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}