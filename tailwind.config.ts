import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#635FC7',
        'primary-light': '#A8A4FF',
        'danger': '#EA5555',
        'danger-light': '#FF9898',
        'black': '#000112',
        'white': '#FFFFFF',
        'very-dark-grey': '#20212C',
        'dark-grey': '#2B2C37',
        'medium-grey': '#828FA3',
        'light-grey': '#F4F7FD',
      }
    },
  },
  plugins: [],
}
export default config
