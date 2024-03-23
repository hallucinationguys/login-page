import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: '450px',
      // => @media (min-width: 450px) { ... }

      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }

      desktop2k: { raw: '(min-height: 1350px)' },
      // => @media (min-width: 2560px) { ... }
    },
    extend: {
      colors: {
        pink: {
          500: '#E4526E',
          600: '#E13F5E',
          700: '#CA3854',
        },
        dark: {
          300: '#393939',
          700: '#1F1F1F',
          800: '#1B1B1B',
          900: '#272727',
        },
        'black-rgba': 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}

export default config
