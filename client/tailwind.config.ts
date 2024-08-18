import type { Config } from 'tailwindcss';
const { colors: defaultColors } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...defaultColors,
        ...{
          primary: '#0EB1D2',
          black: '#02020A',
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        '.container': {
          maxWidth: 'calc(100% - 32px)',
          margin: '0 auto',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: 'calc(100% - 64px)',
          },
          '@screen lg': {
            maxWidth: 'calc(100% - 96px)',
          },
          '@screen xl': {
            maxWidth: 'calc(1360px - 128px)',
          },
        },
      });
    },
  ],
};
export default config;
