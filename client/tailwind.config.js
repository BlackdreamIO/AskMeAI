/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            maxWidth : {
                'tiny' : '480px',
                'sm'  : '640px',
                'md'  : '768px',
                'lg'  : '1024px',
                'xl'  : '1280px',
                '2xl' :  '1536px',
                '3xl' :  '1920px',
            },
            screens: {
                'tiny': {'min': '480px', 'max': '639px'}, // => @media (min-width: 480px and max-width: 639px) { ... }
                'sm': {'min': '640px', 'max': '767px'}, // => @media (min-width: 640px and max-width: 767px) { ... }
                'md': {'min': '768px', 'max': '1023px'}, // => @media (min-width: 768px and max-width: 1023px) { ... }
                'lg': {'min': '1024px', 'max': '1279px'}, // => @media (min-width: 1024px and max-width: 1279px) { ... }
                'xl': {'min': '1280px', 'max': '1535px'}, // => @media (min-width: 1280px and max-width: 1535px) { ... }
                '2xl': {'min': '1536px', 'max': '1919px' }, // => @media (min-width: 1536px and max-width: 1919px) { ... }
                '3xl': {'min': '1920px'}, // => @media (min-width: 1920px) { ... }
                'max-tiny' : {max : '480px'},
                'max-sm' : {max : '640px'},
                'max-md' : {max : '768px'},
                'max-lg' : {max : '1024px'},
                'max-xl' : {max : '1280px'},
                'max-2xl' : {max : '1536px'},
                'max-3xl' : {max : '1920px'},
            },
        },
    },
    plugins: [],
}

