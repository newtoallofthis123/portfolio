/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontSize: {
                mx: '0.6rem',
            },
            fontFamily: {
                mono: ['"JetBrains Mono Variable"', 'ui-monospace'],
                sans: ['"Atkinson Hyperlegible", Arial, sans-serif'],
            },
        },
    },
};
