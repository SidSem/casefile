/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        typewriter: ['"Courier Prime"', 'monospace'],
      },
      colors: {
        charcoal: {
          950: '#07080a',
          900: '#0d0f13',
          850: '#13161c',
          800: '#1a1e26',
          750: '#222832',
          700: '#2c3340',
          600: '#3e4758',
          500: '#56627a',
          400: '#7e8aa2',
          300: '#aab4c5',
          200: '#d5dae4',
          100: '#f0f2f5',
        },
        evidence: {
          red: '#b91c1c',
          crimson: '#dc2626',
          burgundy: '#5c1721',
          blood: '#781d28',
          border: 'rgba(185, 28, 28, 0.4)',
        },
        olive: {
          950: '#141812',
          900: '#1d231a',
          800: '#2e3729',
          700: '#424f3b',
          600: '#5c6e52',
          500: '#7b936e',
        },
        dossier: {
          paper: '#f3ece0',
          manila: '#e8dcbe',
          aged: '#d4c5a0',
          card: '#c7b489',
          stamp: '#a82329',
          ink: '#1c1917',
        },
        terminal: {
          amber: '#eab308',
          amberGlow: 'rgba(234, 179, 8, 0.15)',
          green: '#22c55e',
          cyan: '#06b6d4',
        }
      },
      backgroundImage: {
        'grain-pattern': "radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 0)",
        'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        'cork-board': "radial-gradient(#1c2028 15%, transparent 16%), radial-gradient(#14171e 15%, transparent 16%)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s ease-in-out 3',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      }
    },
  },
  plugins: [],
}
