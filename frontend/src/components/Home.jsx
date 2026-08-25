import { useEffect, useState } from 'react'
import { Download, ArrowRight } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/portfolioData'

const codeLines = [
  'class Engineer:',
  '    def __init__(self):',
  "        self.name = 'Sonal Talukdar'",
  "        self.role = 'Aspiring Full Stack Engineer'",
  '        self.stack = [React, Node, Python]',
  '        self.status = LEARNING',
]

const outputLines = [
  '$ python engineer.py',
  '>>> Booting profile...',
  '>>> Sonal Talukdar',
  '>>> Status: OPEN TO OPPORTUNITIES',
  '>>> Ready to build.',
]

export default function Home() {
  const [typed, setTyped] = useState([])
  const [codeDone, setCodeDone] = useState(false)
  const [output, setOutput] = useState([])
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    setTyped([])
    setCodeDone(false)
    setOutput([])

    let line = 0
    let char = 0
    let current = ''

    const interval = setInterval(() => {
      if (line >= codeLines.length) {
        clearInterval(interval)
        setTyped([...codeLines])

        setTimeout(() => {
          setCodeDone(true)
        }, 300)

        return
      }

      current += codeLines[line][char] ?? ''
      char++

      setTyped((prev) => {
        const next = [...prev]
        next[line] = current
        return next
      })

      if (char >= codeLines[line].length) {
        line++
        char = 0
        current = ''
      }
    }, 18)

    return () => clearInterval(interval)
  }, [runId])

  useEffect(() => {
    if (!codeDone) return

    let line = 0
    let char = 0
    let current = ''

    const interval = setInterval(() => {
      if (line >= outputLines.length) {
        clearInterval(interval)
        setOutput([...outputLines])
        return
      }

      current += outputLines[line][char] ?? ''
      char++

      setOutput((prev) => {
        const next = [...prev]
        next[line] = current
        return next
      })

      if (char >= outputLines[line].length) {
        line++
        char = 0
        current = ''
      }
    }, 16)

    return () => clearInterval(interval)
  }, [codeDone, runId])

  const replay = () => setRunId((id) => id + 1)

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Dancing+Script:wght@600;700&display=swap');

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLine1 {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes riseFromBelow {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cyanPulse {
          0%, 100% {
            opacity: .35;
            transform: scaleX(.7);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .hero-fade-left {
          opacity: 0;
          animation: fadeUp .8s ease-out forwards;
        }

        .hero-fade-right {
          opacity: 0;
          animation: fadeUp .9s ease-out .25s forwards;
        }

        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(36px) rotateX(14deg) rotateY(-10deg) scale(.94);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1);
          }
        }

        .hero-card-entrance {
          opacity: 0;
          transform-style: preserve-3d;
          animation: cardEntrance 1.1s cubic-bezier(.16,1,.3,1) .25s forwards;
        }

        /* Continuous smooth up-down float — always running, automatic.
           Rotation/tilt is intentionally NOT part of this animation; that
           only happens on hover via the JS mouse-tilt logic below, so it
           never fights with this transform. Keeps running forever
           (including right after a refresh). */
        @keyframes cardFloatY {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .hero-card-float {
          transform-style: preserve-3d;
          animation: cardFloatY 3.2s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes blinkCursor {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: blinkCursor 1s step-end infinite;
        }

        .headline-line1 {
          display: inline-block;
          opacity: 0;
          animation:
            slideInLine1 .7s cubic-bezier(.16,1,.3,1) .1s forwards,
            gradientFlow 5s linear .1s infinite,
            rgbGlitch 2s steps(1) .8s infinite;
        }

        .headline-line2-mask {
          display: block;
          overflow: hidden;
        }

        .headline-line2 {
          display: inline-block;
          opacity: 0;
          animation:
            riseFromBelow .65s cubic-bezier(.16,1,.3,1) .5s forwards,
            rgbGlitch 2s steps(1) 1s infinite;
        }

        .hero-accent-line {
          animation: cyanPulse 3s ease-in-out infinite;
        }

        @keyframes vibrate {
          0%, 100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-2px, 1px);
          }
          40% {
            transform: translate(2px, -1px);
          }
          60% {
            transform: translate(-1px, -1px);
          }
          80% {
            transform: translate(1px, 1px);
          }
        }

        .btn-vibrate:hover {
          animation: vibrate 0.25s linear infinite;
        }

        @keyframes waveShine {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .btn-wave {
          background-image: repeating-linear-gradient(
            100deg,
            rgba(34, 229, 255, 0) 0%,
            rgba(34, 229, 255, 0.35) 4%,
            rgba(255, 255, 255, 0.55) 6%,
            rgba(34, 229, 255, 0.35) 8%,
            rgba(34, 229, 255, 0) 14%,
            rgba(34, 229, 255, 0) 20%
          );
          background-size: 220% 100%;
          animation: waveShine 2.4s linear infinite;
        }

        @keyframes rgbGlitch {
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
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[90rem] flex-col items-center gap-10 px-4 pb-16 pt-28 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-32 md:flex-row md:items-center md:gap-14 md:px-10 lg:px-14 lg:pt-32">

        {/* ================= LEFT ================= */}

        <div className="hero-fade-left flex-1">

          <h1 className="leading-[1.08] tracking-tight">
            <span
              className="headline-line1 whitespace-nowrap bg-clip-text pb-2 text-5xl font-bold text-transparent sm:text-6xl lg:text-[4.6rem]"
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                backgroundImage:
                  'linear-gradient(90deg, #22e5ff, #13e6a0, #2f7bff, #22e5ff)',
                backgroundSize: '300% 100%',
              }}
            >
              Aspiring Full Stack
            </span>

            <br />

            <span className="headline-line2-mask pb-2">
              <span
                className="headline-line2 inline-block text-5xl font-bold text-white sm:text-6xl lg:text-[4.6rem]"
                style={{ fontFamily: "'Chakra Petch', sans-serif" }}
              >
                Engineer
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
            Focused on building thoughtful digital experiences through
            modern web technologies, backend development, and AI. I enjoy
            turning ideas into reliable, functional applications while
            continuously improving my technical skills through hands-on
            projects.
          </p>

          {/* ================= BUTTONS ================= */}

          <div className="mt-9 flex flex-wrap gap-4">

            <a
              href="/Sonal_Talukdar_Resume.pdf"
              download
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{
                background:
                  'linear-gradient(90deg, #2563eb, #0891b2, #10b981)',
                boxShadow:
                  '0 0 14px rgba(34,211,238,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 28px rgba(34,211,238,.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 14px rgba(34,211,238,0.25)'
              }}
            >
              <span className="absolute inset-y-0 left-[-45%] w-1/3 -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 group-hover:translate-x-[350%]" />

              <Download size={18} />
              Download Resume
            </a>

            <a
              href="#projects"
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-transparent"
            >
              <span className="absolute inset-0 -z-10 scale-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100" />

              <span className="relative z-10">View Projects</span>

              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>

          </div>

          {/* ================= SOCIAL ================= */}

          <div className="mt-7 flex items-center gap-5">

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,229,255,.9)]"
              >
                <FiGithub size={27} />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,229,255,.9)]"
              >
                <FiLinkedin size={27} />
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,229,255,.9)]"
              >
                <FiMail size={27} />
              </a>
            )}

          </div>
        </div>

        {/* ================= CODE CARD ================= */}

        <div className="hero-card-entrance w-full max-w-[510px]">
          {/* Only the automatic up/down float — no hover tilt. */}
          <div className="hero-card-float">
            <div
              onClick={replay}
              role="button"
              title="Click to replay"
              className="relative cursor-pointer select-none overflow-hidden rounded-xl border border-cyan-300/40 bg-[#020609]/95 p-4 font-mono shadow-[0_0_40px_rgba(34,229,255,.22),inset_0_0_40px_rgba(0,200,255,.05)] backdrop-blur-md sm:p-6"
            >

              {/* top glow */}

              <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-100" />

              {/* subtle corner accents */}

              <div className="absolute right-0 top-0 h-16 w-16 border-r border-t border-cyan-300/35" />

              <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-emerald-400/35" />

              {/* window buttons */}

              <div className="mb-5 flex items-center gap-2">

                <span className="h-4 w-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,.6)]" />

                <span className="h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,.6)]" />

                <span className="h-4 w-4 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,.6)]" />

                <span className="ml-auto text-[10px] tracking-widest text-white/25">
                  ENGINEER.PY
                </span>

              </div>

              {/* ================= CODE ================= */}

              <pre className="h-[13rem] overflow-hidden whitespace-pre-wrap text-[13px] leading-7 text-white/70 sm:h-[15rem] sm:text-[16px] sm:leading-8 sm:text-base">
                {typed.map((l, i) => (
                  <div key={i}>
                    <span
                      className={
                        i === 0
                          ? 'text-cyan-300'
                          : i === 1
                            ? 'text-emerald-300'
                            : 'text-white/70'
                      }
                    >
                      {l}
                    </span>
                  </div>
                ))}

                {!codeDone && (
                  <span className="cursor-blink text-cyan-300">
                    ▍
                  </span>
                )}
              </pre>

              {/* ================= TERMINAL OUTPUT ================= */}

              <div
                className={`mt-3 border-t border-white/10 pt-4 transition-opacity duration-300 ${
                  codeDone ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <pre className="h-[8.4rem] overflow-hidden whitespace-pre-wrap text-[13px] leading-7 text-emerald-300 sm:h-[9.8rem] sm:text-[16px] sm:leading-8 sm:text-base">
                  {output.map((l, i) => (
                    <div
                      key={i}
                      className={
                        i === 0
                          ? 'text-cyan-300'
                          : 'text-emerald-300'
                      }
                    >
                      {l}
                    </div>
                  ))}

                  {codeDone && (
                    <span className="cursor-blink text-cyan-300">
                      ▍
                    </span>
                  )}
                </pre>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}