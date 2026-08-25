// Images are read from your project's public/ folder (Certificate_1.jpg – Certificate_4.jpg)
const certificates = [
  {
    title: 'Internship — E-commerce Website',
    issuer: "Euphoria GenX · Women's Polytechnic Chandannagar",
    period: '1 Mar 2024 – 8 Apr 2024',
    src: '/Certificate_1.jpg',
  },
  {
    title: 'Generative AI, Deep Learning & Language Models',
    issuer: 'AICTE · Ministry of Education · EduSkills',
    period: 'Apr – Jun 2026',
    src: '/Certificate_2.jpg',
  },
  {
    title: 'Google Cloud Arcade Facilitator Program',
    issuer: 'Google Cloud · Certificate of Excellence',
    period: '1 Apr 2025 – 2 Jun 2025',
    src: '/Certificate_3.jpg',
  },
  {
    title: 'EduSkills Tech Camp — Google AI-ML',
    issuer: 'Google for Developers · EduSkills',
    period: '30 Jan – 1 Feb 2025',
    src: '/Certificate_4.jpg',
  },
]

// duplicated once so the CSS marquee loop is seamless (track moves -50% then resets)
const loopCertificates = [...certificates, ...certificates]

export default function Certificates() {
  return (
    <section id="certificates" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
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

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marquee-track {
          animation: marqueeScroll 22s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .cert-card {
          width: 220px;
        }

        @media (min-width: 640px) {
          .cert-card { width: 320px; }
        }
      `}</style>

      {/* heading — same glitch style as Projects */}
      <h2
        className="heading-glitch text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Certificates
      </h2>

      {/* fade masks on the edges so cards don't hard-cut at the section boundary */}
      <div
        className="relative mt-10 overflow-hidden py-4 sm:mt-14"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)',
        }}
      >
        <div className="marquee-track flex w-max gap-4 sm:gap-6">
          {loopCertificates.map((c, i) => (
            <div
              key={`${c.title}-${i}`}
              className="cert-card shrink-0 overflow-visible"
            >
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f] transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <img
                  src={c.src}
                  alt={c.title}
                  className="block h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}