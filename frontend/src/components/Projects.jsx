import { useEffect, useRef, useState } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/PortfolioData'

function ProjectCard({ p, index }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting) // toggle both ways, so it re-fades every time it scrolls in/out
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative w-full max-w-xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
    >
      {/* glow — same cyan glow style as the Home code card, toned down */}
      <div
        className="absolute -inset-6 rounded-[2rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: 'rgba(34, 229, 255, 0.12)' }}
      />
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: 'rgba(34, 229, 255, 0.15)' }}
      />

      {/* actual card — solid dark background so the glow can't show through the content area */}
      <div
        className="relative overflow-hidden rounded-xl bg-[#0a0a0f] backdrop-blur transition-all duration-500 group-hover:scale-[1.03]"
        style={{ boxShadow: 'inset 0 0 40px rgba(0,200,255,.04)' }}
      >
        {/* picture slot — full image shown, no cropping, image itself does not scale */}
        <div className="w-full overflow-hidden bg-white/[0.02]">
          <img
            src={p.image}
            alt={p.title}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-xl">{p.title}</h3>
              <p className="mt-1 text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">{p.subtitle}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-white/60">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex transition-all duration-300 hover:-translate-y-0.5 hover:text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(34,229,255,0.35)]"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex transition-all duration-300 hover:-translate-y-0.5 hover:text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(34,229,255,0.35)]"
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4 transition-colors duration-300 group-hover:border-cyan-400/20 sm:mt-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:text-white/60">
              Technologies used
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/15 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/10 hover:text-cyan-200 hover:shadow-[0_0_12px_rgba(34,229,255,0.35)] sm:px-3"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');

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

      {/* heading — static, permanently glitching, no scroll-in animation */}
      <h2
        className="heading-glitch text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Projects
      </h2>

      <div className="mt-10 flex flex-wrap justify-center gap-8 sm:mt-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}