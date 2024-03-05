/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono Variable"', 'ui-monospace'],
                sans: ['"Inter Variable", Arial, sans-serif'],
            },
            // colors: {
            //     dark: '#1a1a1a',
            //     mred: '#ff6188',
            //     orange: '#fc9867',
            //     myellow: '#ffd866',
            //     green: '#a9dc76',
            //     mblue: '#78dce8',
            //     mpurple: '#AB9DF2',
            //     white: '#ffffff',
            //     cool: '#f0f0f0',
            // },
            fontSize: {
                'mx': '0.6rem',
            },
        },
    },
    plugins: [
        require("@catppuccin/tailwindcss")({
            prefix: "ctp",
            // defaultFlavour: "macchiato",
        }),
    ],
};
