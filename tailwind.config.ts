import type { Config } from 'tailwindcss';

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
      backgroundColor: {
        primary: 'var(--color-primary)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        secondary: 'var(--color-secondary)',
      },
      textColor: {
        primary: 'var(--color-primary-text)',
        warning: 'var(--color-warning-text)',
        success: 'var(--color-success-text)',
        info: 'var(--color-info-text)',
        secondary: 'var(--color-secondary-text)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
