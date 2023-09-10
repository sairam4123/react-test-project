/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        borderWidth: {
            DEFAULT: "1px",
            0: "0",
            0.5: "0.5px",
            1: "1px",
            1.5: "1.5px",
            2: "2px",
            2.5: "2.5px",
            3: "3px",
            3.5: "3.5px",
            4: "4px",
            4.5: "4.5px",
            5: "5px",
            5.5: "5.5px",
            6: "6px",
            6.5: "6.5px",
            7: "7px",
            7.5: "7.5px",
            8: "8px",
        },
        extend: {},
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("content-editable", "&[contentEditable]");
        }),
    ],
};
