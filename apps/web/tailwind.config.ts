import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          primary: '#1e3a5f',
          secondary: '#2563eb',
          accent: '#0ea5e9',
          warning: '#f59e0b',
          danger: '#dc2626',
          success: '#16a34a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
