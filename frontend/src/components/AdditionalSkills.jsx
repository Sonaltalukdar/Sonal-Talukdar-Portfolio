import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clapperboard,
  Image,
  FileCheck2,
  Presentation,
} from 'lucide-react'

const services = [
  {
    icon: Clapperboard,
    name: 'Video Editing',
    desc: 'Reels & Social Media Video Editing',
    accent: '#3b82f6',
  },
  {
    icon: Image,
    name: 'Poster Editing',
    desc: 'Posters, Banners & Social Media Creatives',
    accent: '#22e5ff',
  },
  {
    icon: FileCheck2,
    name: 'ATS Resume',
    desc: 'Clean and Professional Resume Design',
    accent: '#13e6a0',
  },
  {
    icon: Presentation,
    name: 'PPT Making',
    desc: 'Simple and Attractive Presentation Slides',
    accent: '#8b5cf6',
  },
]

export default function AdditionalSkills() {
  const [visible, setVisible] = useState(false)

  return (
    <section id="additionalskills" className="relative mx-auto max-w-[90rem] overflow-hidden px-4 py-16 sm:px-8 sm:py-24">
      <style>{`
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

        .askill-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (min-width: 640px) {
          .askill-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
        }
        @media (min-width: 768px) {
          .askill-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .askill-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .askill-card {
          position: relative;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          padding: 1.15rem 1rem;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.94);
          filter: blur(4px);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease,
                      background 0.35s ease,
                      opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      filter 0.7s ease;
        }
        @media (min-width: 640px) {
          .askill-card { padding: 1.5rem 1.25rem; }
        }
        .askill-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }
        .askill-card:hover {
          transform: translateY(-5px) scale(1.015);
          border-color: var(--accent);
          background: rgba(255,255,255,0.045);
          box-shadow: 0 0 30px -10px var(--accent);
        }
        .askill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% -10%, var(--accent) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .askill-card:hover::before { opacity: 0.14; }

        .askill-iconring {
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.85rem;
          border: 1px solid rgba(255,255,255,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.85rem;
          transition: border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          animation: askillIconBreathe 3.4s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .askill-iconring { width: 3rem; height: 3rem; margin-bottom: 1rem; }
        }
        @keyframes askillIconBreathe {
          0%, 100% { box-shadow: 0 0 0 0 transparent; }
          50% { box-shadow: 0 0 14px -6px var(--accent); }
        }
        .askill-card:hover .askill-iconring {
          color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 18px -4px var(--accent);
          transform: scale(1.12) rotate(-6deg);
        }

        .askill-name {
          position: relative;
          display: inline-block;
          font-family: 'Space Grotesk', ui-monospace, monospace;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.94);
        }
        @media (min-width: 640px) {
          .askill-name { font-size: 0.95rem; }
        }
        .askill-name::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1.5px;
          width: 0%;
          background: var(--accent);
          transition: width 0.4s ease;
        }
        .askill-card:hover .askill-name::after { width: 100%; }
        .askill-desc {
          margin-top: 0.4rem;
          font-size: 0.72rem;
          line-height: 1.4;
          color: rgba(255,255,255,0.4);
          transition: color 0.3s ease;
        }
        @media (min-width: 640px) {
          .askill-desc { font-size: 0.78rem; }
        }
        .askill-card:hover .askill-desc { color: rgba(255,255,255,0.62); }
      `}</style>

      <h2 className="heading-glitch mb-10 font-display text-3xl font-semibold text-white sm:mb-12 sm:text-4xl md:text-5xl">
        Additional Skills
      </h2>

      <motion.div
        className="askill-grid"
        viewport={{ once: false, amount: 0.15 }}
        onViewportEnter={() => setVisible(true)}
        onViewportLeave={() => setVisible(false)}
      >
        {services.map((s, i) => {
          const Icon = s.icon
          const Icon2 = s.icon2
          return (
            <div
              key={s.name}
              className={`askill-card${visible ? ' is-visible' : ''}`}
              style={{
                '--accent': s.accent,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div className="askill-iconring">
                <Icon size={Icon2 ? 15 : 20} strokeWidth={1.6} />
                {Icon2 && <Icon2 size={15} strokeWidth={1.6} />}
              </div>
              <div className="askill-name">{s.name}</div>
              <div className="askill-desc">{s.desc}</div>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}