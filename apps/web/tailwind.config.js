/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: '#0f7b62',
        accentDark: '#35c69e',
        accentStrong: '#0b654f',
        accentStrongDark: '#61d8b8',
        background: '#f7f4ed',
        backgroundDark: '#111613',
        border: '#d6cfc1',
        borderDark: '#37463d',
        danger: '#a23b28',
        dangerDark: '#ff8f7f',
        ink: '#17201a',
        inkDark: '#f3f7f0',
        muted: '#647067',
        mutedDark: '#a9b6ad',
        panel: '#fffdf8',
        panelDark: '#19221d',
        panelRaised: '#ffffff',
        panelRaisedDark: '#202b25',
        surface: '#e5e0d6',
        surfaceDark: '#26332c',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
