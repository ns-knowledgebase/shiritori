import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
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
      // Size related settings
      minHeight: {
        screen: '100dvh',
      },
      height: {
        screen: '100dvh',
      },
      minWidth: {
        screen: '100dvw',
      },
      width: {
        screen: '100dvw',
      },
      // Box Shadow
      boxShadow: {
        focus:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgb(59, 130, 246) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
      },
    },
  },
  plugins: [],
};
export default config;
