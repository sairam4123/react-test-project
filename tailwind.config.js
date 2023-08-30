/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("content-editable", '&[contentEditable="true"]');
        }),
    ],
};
