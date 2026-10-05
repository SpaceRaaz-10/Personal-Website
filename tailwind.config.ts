import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
        sf: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
        display: ['var(--font-syne)', 'Syne', 'sans-serif'],
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
