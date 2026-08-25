import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [aiReply, setAiReply] = useState('')

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await axios.post(`${API_BASE}/api/feedback`, form)
      setAiReply(res.data.ai_reply || '')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="feedback" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');

        @keyframes headingGlitch {
          0%, 88%, 100% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
          89% {
            transform: translate(-3px, 0);
            clip-path: inset(10% 0 60% 0);
          }
          90.5% {
            transform: translate(3px, 0);
            clip-path: inset(55% 0 10% 0);
          }
          91.5% {
            transform: translate(-2px, 0);
            clip-path: inset(20% 0 40% 0);
          }
          92.5% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
          95%, 96% {
            transform: translate(2px, 0);
            clip-path: inset(40% 0 25% 0);
          }
          97% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        .heading-glitch {
          display: inline-block;
          animation: headingGlitch 2s steps(1) infinite;
        }

        @keyframes shimmerBtn {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .shimmer-btn {
          background-size: 200% auto;
          animation: shimmerBtn 3s linear infinite;
        }

        @keyframes fadeInResult {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in-result {
          animation: fadeInResult 0.4s ease-out;
        }

        .cut-card {
          clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
        }
        @media (min-width: 640px) {
          .cut-card {
            clip-path: polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px);
          }
        }

        .cut-field {
          clip-path: polygon(14px 0, 100% 0, 100% 100%, calc(100% - 14px) 100%, 0 100%, 0 14px);
        }

        .cut-icon {
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }

        .cut-btn {
          clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
        }

        @keyframes borderSpin {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .animated-border {
          background: transparent;
        }
        .name-field-border {
          background: #0891a8;
          transition: background 0.3s;
        }

        .name-field-border:focus-within {
          background: #22e5ff;
        }
        .btn-border {
          background: linear-gradient(90deg, #22e5ff, #3b82f6, #13e6a0, #22e5ff);
          background-size: 200% 100%;
          animation: borderSpin 4s linear infinite;
        }

        @keyframes btnShimmer {
          0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(220%) skewX(-20deg); opacity: 0; }
        }

        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%) skewX(-20deg);
          opacity: 0;
        }

        .btn-shimmer:hover::after {
          animation: btnShimmer 1s ease-in-out;
        }

        @keyframes btnGlowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(34,229,255,0.4)) drop-shadow(0 0 10px rgba(19,230,160,0.3));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(34,229,255,0.7)) drop-shadow(0 0 20px rgba(19,230,160,0.55));
          }
        }

        .btn-glow {
          animation: btnGlowPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* heading — same glitch style as Projects */}
      <h2
        className="heading-glitch mb-10 text-3xl font-bold tracking-tight text-white sm:mb-16 sm:text-4xl md:text-5xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Feedback
      </h2>

      {/* gradient border wrapper — animated cyan→blue→green, cut corners, glow removed, fades in on scroll */}
      <div
        ref={cardRef}
        className={`relative mx-auto max-w-3xl transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="cut-card animated-border p-[2px]">
          <form onSubmit={handleSubmit} className="cut-card relative space-y-5 bg-transparent p-5 sm:space-y-6 sm:p-8 lg:p-10">
            {/* decorative corner accent, top-right */}
            <div className="pointer-events-none absolute right-6 top-5 hidden items-center gap-1.5 sm:right-10 sm:top-6 sm:flex">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-1 -skew-x-[20deg] bg-cyan-400/40"
                  style={{ opacity: 1 - i * 0.12 }}
                />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="cut-field name-field-border p-[1.5px] transition-colors duration-300">
                <div className="cut-field relative flex items-center gap-3 bg-[#0a0e17]/90 px-4 py-3 backdrop-blur-md">
                  <FiUser className="shrink-0 text-cyan-300/70" size={18} />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="cut-field bg-blue-400/50 p-[1.5px] transition-colors duration-300 focus-within:bg-blue-400/90">
                <div className="cut-field relative flex items-center gap-3 bg-[#0a0e17]/90 px-4 py-3 backdrop-blur-md">
                  <FiMail className="shrink-0 text-blue-300/70" size={18} />
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>
            </div>

            <div className="cut-field bg-emerald-400/50 p-[1.5px] transition-colors duration-300 focus-within:bg-emerald-400/90">
              <div className="cut-field relative flex gap-3 bg-[#0a0e17]/90 px-4 py-3 backdrop-blur-md">
                <FiMessageSquare className="mt-0.5 shrink-0 text-emerald-300/70" size={18} />
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your feedback..."
                  className="w-full resize-y bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="cut-btn btn-border btn-glow inline-block p-[2px]">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="cut-btn btn-shimmer group/btn relative flex items-center gap-2 overflow-hidden bg-[#0a0e17] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 sm:px-7"
              >
                {status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-cyan-300" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="text-white">
                      Send Feedback
                    </span>
                    <FiSend className="text-cyan-300 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" size={16} />
                  </>
                )}
              </button>
            </div>

            {status === 'sent' && (
              <div className="cut-field fade-in-result bg-cyan-400/40 p-[1.5px]">
                <div className="cut-field bg-cyan-400/5 p-4 text-center text-base sm:text-lg text-white">
                  {aiReply || 'Thanks for the feedback!'}
                </div>
              </div>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">
                Couldn't reach the backend. Make sure the FastAPI server is running.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}