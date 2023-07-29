/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '87.5rem',
      },

      colors: {
        theme: {
          white: '#ffffff',
          black: '#000000',

          gray: {
            50: '#e7e7e7',
            100: '#d0d0d0',
            200: '#b8b8b8',
            300: '#a1a1a1',
            400: '#7c7d7e',
            500: '#5a5a5a',
            600: '#424242',
            700: '#333538',
            800: '#2b2b2b',
            900: '#141414',
          },
          neutral: {
            50: '#d0c4c4',
            100: '#b4a9a9',
            200: '#998e8e',
            300: '#7e7575',
            400: '#655c5c',
            500: '#595051',
            600: '#4d4545',
            700: '#413a3a',
            800: '#362f2f',
            900: '#201a1a',
          },
          pink: {
            50: '#ffb2b8',
            100: '#fa8a95',
            200: '#da717c',
            300: '#bb5864',
            400: '#9c404c',
            500: '#8c3541',
            600: '#7d2936',
            700: '#6e1e2b',
            800: '#5f1221',
            900: '#40000f',
          },
          red: {
            50: '#ffb4ab',
            100: '#ff897d',
            200: '#ff5449',
            300: '#de3730',
            400: '#ba1a1a',
            500: '#a80710',
            600: '#93000a',
            700: '#7e0007',
            800: '#690005',
            900: '#410002',
          },
          brown: {
            50: '#c9a2a4',
            100: '#ac888a',
            200: '#916e70',
            300: '#765658',
            400: '#694a4d',
            500: '#5c3f41',
            600: '#503436',
            700: '#44292b',
            800: '#4b2428',
            900: '#2c1517',
          },
          beige: {
            50: '#e8c08e',
            100: '#caa575',
            200: '#ae8b5d',
            300: '#927146',
            400: '#775930',
            500: '#6a4d25',
            600: '#5d421b',
            700: '#503610',
            800: '#432c06',
            900: '#291800',
          },
          teal: {
            400: '#36d399',
          },
          blue: {
            400: '#3abff8',
          },
          violet: {
            400: '#641ae6',
          },
          yellow: {
            400: '#fbbd23',
          },
        },
      },
    },
  },
  plugins: [],
};
