import { motion } from 'framer-motion'
import { GraduationCap, FileText, BookOpen } from 'lucide-react'
import { education } from '../data/portfolioData'

const icons = [GraduationCap, FileText, BookOpen]

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
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

        .edu-rail {
          background: linear-gradient(to bottom, #22e5ff 0%, #2362eb 35%, #13e6a0 100%);
        }
        .edu-node-ring {
          animation: nodeSpin 16s linear infinite;
        }
        @keyframes nodeSpin {
          to { transform: rotate(360deg); }
        }
        .edu-dots-bg {
          background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 18px 18px;
          background-position: -4px -4px;
        }

        /* ---- responsive timeline offsets ---- */
        .edu-rail {
          left: 19px;
        }
        .edu-node {
          height: 3rem;
          width: 3rem;
        }
        .edu-item {
          padding-left: 76px;
        }

        @media (min-width: 640px) {
          .edu-rail { left: 27px; }
          .edu-node { height: 3.5rem; width: 3.5rem; }
          .edu-item { padding-left: 104px; }
        }
      `}</style>

      <h2 className="heading-glitch mb-10 font-display text-3xl font-semibold text-white sm:mb-16 sm:text-4xl md:text-5xl">
        Education
      </h2>

      <div className="relative mx-auto max-w-4xl">
        {/* timeline rail */}
        <div
          className="edu-rail absolute top-2 bottom-2 w-[2px] rounded-full"
          style={{ boxShadow: '0 0 10px rgba(34,229,255,0.4)' }}
        />

        <div className="flex flex-col gap-10 sm:gap-14">
          {education.map((e, i) => {
            const Icon = icons[i % icons.length]
            const accent = '#22e5ff'

            return (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="edu-item relative"
              >
                {/* node */}
                <div className="edu-node absolute left-0 top-0 flex items-center justify-center">
                  <span
                    className="edu-node-ring absolute inset-0 rounded-full border border-dashed"
                    style={{ borderColor: accent, opacity: 0.5 }}
                  />
                  <span
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: `0 0 0 1px ${accent}55, 0 0 18px ${accent}66`,
                    }}
                  />
                  <Icon size={18} style={{ color: accent, position: 'relative' }} className="sm:hidden" />
                  <Icon size={20} style={{ color: accent, position: 'relative' }} className="hidden sm:block" />
                </div>

                {/* card */}
                <motion.div
                  whileHover={{
                    y: -6,
                    boxShadow: `0 0 28px ${accent}59, 0 0 55px ${accent}26`,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative rounded-2xl"
                >
                  <div
                    className="edu-card edu-dots-bg relative overflow-hidden rounded-2xl border p-4 sm:p-6"
                    style={{
                      background: 'rgba(4,10,16,0.75)',
                      borderColor: `${accent}40`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span className="text-xs font-bold sm:text-sm" style={{ color: '#3b82f6' }}>
                      {e.period}
                    </span>
                    <h3 className="mt-2 mb-2 text-lg font-bold text-white sm:text-2xl">{e.degree}</h3>
                    <h4 className="mb-3 text-sm text-white/50 sm:text-base">{e.school}</h4>
                    {e.note && (
                      <p className="text-sm font-bold sm:text-base" style={{ color: '#34D399' }}>
                        {e.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}