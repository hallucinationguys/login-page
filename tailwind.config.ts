import type { Config } from 'tailwindcss';

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
};

export default config;
