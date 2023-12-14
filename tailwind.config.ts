import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        ping: 'ping .3s cubic-bezier(0, 0, 0.2, 1) 1',
        bounce: 'bounce .8s 2'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        segoe_ui: ['var(--font-segoe-ui)'],
      },
      colors: {
        primary: {
          blue: '#1D9BF0',
          gray: '#E7ECF0',
          red: '#EF1C5C',
          ['dark-gray']: '#6E767D'
        },
        'black': '#000',
        'white': '#FFF'
      }
    },
  },
  plugins: [],
}
export default config
