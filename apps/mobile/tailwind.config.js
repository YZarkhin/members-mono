/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../shared/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: '#d6cfc1',
        borderDark: '#37463d',
        control: '#e5e0d6',
        controlDark: '#26332c',
        danger: '#a23b28',
        dangerDark: '#ff8f7f',
        fern: '#0f7b62',
        fernDark: '#35c69e',
        ink: '#17201a',
        inkDark: '#f3f7f0',
        muted: '#647067',
        mutedDark: '#a9b6ad',
        paper: '#fffdf8',
        paperDark: '#111613',
        surface: '#ffffff',
        surfaceDark: '#19221d',
      },
    },
  },
  plugins: [],
};
