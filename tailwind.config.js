const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    'dark': '#0f1734',
                    'mid': '#162343',
                    'light': '#2d3855',
                },
                secondary: {
                    'dark': '#00614f',
                    'mid': '#00f3c7',
                    'light': '#99fae8',
                }
            }
        },

    },

    plugins: [require('@tailwindcss/forms')],
};
