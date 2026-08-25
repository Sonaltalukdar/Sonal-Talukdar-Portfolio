import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* ================= BACKGROUND DEPTH ================= */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 45%,
              rgba(8, 40, 60, 0.7) 0%,
              rgba(2, 15, 25, 0.45) 35%,
              rgba(0, 0, 0, 1) 78%
            )
          `,
        }}
      />

      {/* vivid cyan atmospheric glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '38rem',
          height: '38rem',
          left: '-12rem',
          top: '5%',
          background: 'rgba(0, 200, 255, 0.14)',
          filter: 'blur(140px)',
        }}
        animate={{
          x: [0, 70, 0],
          y: [0, 40, 0],
          opacity: [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* vivid green atmospheric glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '32rem',
          height: '32rem',
          right: '-10rem',
          top: '20%',
          background: 'rgba(16, 210, 145, 0.11)',
          filter: 'blur(130px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ================= TECH GRID ================= */}

      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '85px 85px',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 75%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 75%, transparent 100%)',
        }}
      />

      {/* ================= PERSPECTIVE FLOOR ================= */}

      <div
        className="absolute bottom-[-15%] left-[-10%] w-[120%] h-[45%] opacity-[0.24]"
        style={{
          transform: 'perspective(500px) rotateX(62deg)',
          transformOrigin: 'center top',
          backgroundImage: `
            linear-gradient(rgba(0, 220, 255, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 220, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '90px 55px',
        }}
      />

      {/* ================= DARK VIGNETTE ================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}