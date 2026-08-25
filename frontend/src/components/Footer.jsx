import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/PortfolioData'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Additional Skills', href: '#additionalskills' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Feedback', href: '#feedback' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-[2px]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-row items-start justify-between gap-6 sm:gap-10">
          {/* Left — brand + blurb + icons */}
          <div className="max-w-[60%] sm:max-w-none">
            <a
              href="#home"
              className="translate-y-[1px] font-display text-xl font-semibold leading-none text-ink"
            >
              <span style={{ color: '#22e5ff' }}>_.</span>Sonal
              <span style={{ color: '#22e5ff' }}>Talukdar</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Open to new opportunities, collaborations, and project-based work. Have a project to build or an opportunity to discuss? Feel free to reach out.
            </p>
            <div className="mt-5 flex gap-3">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition hover:text-blue-400"
                >
                  <FiGithub size={16} />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition hover:text-blue-400"
                >
                  <FiLinkedin size={16} />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted transition hover:text-blue-400"
                >
                  <FiMail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Right — Quick Links, same list as Navbar */}
          <div className="shrink-0">
            <h4 className="text-sm font-semibold text-ink">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition hover:text-blue-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}