/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // rgb(...) with <alpha-value> is REQUIRED for bg-void/80, bg-electric/20 etc. to work
        void: 'rgb(4 6 12 / <alpha-value>)',
        panel: 'rgb(9 13 24 / <alpha-value>)',
        panel2: 'rgb(12 17 30 / <alpha-value>)',
        border: 'rgb(22 30 48 / <alpha-value>)',
        electric: 'rgb(47 111 237 / <alpha-value>)',
        cyan: 'rgb(56 189 248 / <alpha-value>)',
        aurora: 'rgb(76 111 255 / <alpha-value>)',
        ink: 'rgb(230 234 242 / <alpha-value>)',
        muted: 'rgb(124 139 166 / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
      backgroundImage: {
        aurora: 'radial-gradient(55% 55% at 20% 10%, rgba(76,111,255,0.14) 0%, rgba(4,6,12,0) 60%), radial-gradient(45% 45% at 85% 20%, rgba(56,189,248,0.10) 0%, rgba(4,6,12,0) 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(56,189,248,0.15)',
      },
    },
  },
  plugins: [],
}