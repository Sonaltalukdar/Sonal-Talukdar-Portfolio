import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend, FiUser, FiDownload } from 'react-icons/fi'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const WELCOME = {
  role: 'assistant',
  content: "Hey, I'm Sonal! Ask me anything about my projects, my tech stack, or my experience.",
}

export default function SonalAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, {
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't reach the server. Try again in a moment." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&display=swap');

        @keyframes sonalPulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 229, 255, 0.45);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(34, 229, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 229, 255, 0);
          }
        }

        .sonal-fab {
          animation: sonalPulseRing 2.6s ease-out infinite;
        }

        .sonal-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .sonal-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 229, 255, 0.35);
          border-radius: 999px;
        }

        .sonal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="sonal-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white"
        style={{
          background: 'linear-gradient(135deg, #22e5ff, #2f7bff, #13e6a0)',
          boxShadow: '0 0 24px rgba(34,229,255,.45)',
        }}
        aria-label="Open SonalAI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 left-4 z-50 mx-auto flex h-[32rem] max-h-[75vh] w-auto max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-cyan-300/25 bg-[#020609]/95 backdrop-blur-xl sm:left-auto sm:right-6 sm:mx-0 sm:h-[38rem] sm:w-[26rem] sm:max-w-none"
            style={{
              boxShadow: '0 0 40px rgba(34,229,255,.15), inset 0 0 40px rgba(0,200,255,.04)',
            }}
          >
            {/* top glow line */}
            <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #22e5ff, #13e6a0)',
                  boxShadow: '0 0 16px rgba(34,229,255,.35)',
                }}
              >
                <FiUser size={16} className="text-[#020609]" />
              </div>
              <div className="flex flex-1 flex-col leading-tight">
                <p
                  className="text-sm font-semibold uppercase tracking-widest text-cyan-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Sonal Talukdar
                </p>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/40">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="sonal-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {m.role === 'assistant' && (
                    <div
                      className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'linear-gradient(135deg, #22e5ff, #13e6a0)' }}
                    >
                      <FiUser size={11} className="text-[#020609]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-md text-white'
                        : 'rounded-bl-md border border-white/10 bg-white/[0.04] text-white/80'
                    }`}
                    style={
                      m.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                            boxShadow: '0 0 14px rgba(34,229,255,.12)',
                            border: '1px solid rgba(34,229,255,0.25)',
                          }
                        : undefined
                    }
                  >
                    {m.content.replace('[[RESUME_LINK]]', '').trim()}
                    {m.content.includes('[[RESUME_LINK]]') && (
                      <a
                        href={`${API_BASE}/api/resume`}
                        download
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-3.5 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-300/20"
                      >
                        <FiDownload size={14} />
                        Download Resume (PDF)
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-end gap-2">
                  <div
                    className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #22e5ff, #13e6a0)' }}
                  >
                    <FiUser size={11} className="text-[#020609]" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ backgroundColor: '#22e5ff', animationDelay: '-0.3s' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ backgroundColor: '#22e5ff', animationDelay: '-0.15s' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ backgroundColor: '#22e5ff' }}
                    />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="flex gap-2.5 border-t border-white/10 bg-white/[0.02] p-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-cyan-300/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-transform hover:scale-105 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}