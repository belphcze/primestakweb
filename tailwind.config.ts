import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fire:  { DEFAULT: '#ef4444', light: '#fca5a5', dark: '#b91c1c' },
        water: { DEFAULT: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8' },
        earth: { DEFAULT: '#65a30d', light: '#a3e635', dark: '#3f6212' },
        air:   { DEFAULT: '#38bdf8', light: '#bae6fd', dark: '#0284c7' },
        forest:{ DEFAULT: '#2d5a1f', light: '#4a8a30', dark: '#1a3a10' },
        cream: { DEFAULT: '#faf7f0', dark: '#f0ead8' },
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
