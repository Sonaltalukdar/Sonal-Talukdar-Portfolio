import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Additional Skills', href: '#additionalskills' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Feedback', href: '#feedback' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy: watch each section, mark whichever is most in view as active
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // close the mobile menu automatically if the viewport grows into desktop size
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-6 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-md transition-all duration-300 sm:px-6 sm:py-3.5 ${
          scrolled
            ? 'border-cyan-300/25 bg-black/50 shadow-[0_8px_34px_rgba(34,229,255,0.18)]'
            : 'border-cyan-300/10 bg-black/20'
        }`}
      >
        <a
          href="#home"
          onClick={handleLinkClick}
          className="translate-y-[1px] font-display text-lg font-semibold leading-none text-white sm:text-xl"
        >
          <span style={{ color: '#22e5ff' }}>_.</span>Sonal
          <span style={{ color: '#22e5ff' }}>Talukdar</span>
        </a>

        {/* ================= DESKTOP LINKS ================= */}

        <motion.div
          className="hidden items-center gap-9 md:flex"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <motion.a
                key={l.href}
                href={l.href}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
                className="group relative block overflow-hidden text-base leading-none"
                style={{ height: '1.2em', lineHeight: '1.2em' }}
              >
                <span
                  className={`block transition-transform duration-400 ease-out group-hover:-translate-y-full ${
                    isActive ? 'text-cyan-300' : 'text-white/65'
                  }`}
                  style={
                    isActive
                      ? { textShadow: '0 0 10px rgba(34,229,255,0.7)' }
                      : undefined
                  }
                >
                  {l.label}
                </span>
                <span
                  className="absolute left-0 top-0 block translate-y-full text-cyan-300 transition-transform duration-400 ease-out group-hover:translate-y-0"
                  style={{ textShadow: '0 0 10px rgba(34,229,255,0.7)' }}
                >
                  {l.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300"
                    style={{ boxShadow: '0 0 10px rgba(34,229,255,0.9)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            )
          })}
        </motion.div>

        {/* ================= HAMBURGER (mobile/tablet) ================= */}

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:border-cyan-300/40 hover:text-cyan-300 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ================= MOBILE DROPDOWN PANEL ================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-cyan-300/20 bg-black/80 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col divide-y divide-white/10">
              {links.map((l, i) => {
                const isActive = active === l.href
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.045, ease: 'easeOut' }}
                    className={`flex items-center justify-between px-5 py-4 text-base transition-colors duration-200 ${
                      isActive ? 'text-cyan-300' : 'text-white/75 hover:text-cyan-300'
                    }`}
                    style={
                      isActive
                        ? { textShadow: '0 0 10px rgba(34,229,255,0.6)' }
                        : undefined
                    }
                  >
                    {l.label}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                        style={{ boxShadow: '0 0 10px rgba(34,229,255,0.9)' }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}