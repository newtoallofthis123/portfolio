/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono Variable"', 'ui-monospace'],
            },
            colors: {
                dark: '#1a1a1a',
                red: '#ff6188',
                orange: '#fc9867',
                yellow: '#ffd866',
                green: '#a9dc76',
                blue: '#78dce8',
                purple: '#AB9DF2',
                white: '#ffffff',
            },
        },
    },
    plugins: [],
};
