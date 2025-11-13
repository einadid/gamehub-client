/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // এখানে আমরা কাস্টম ফন্ট ফ্যামিলি যোগ করছি
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'], // নতুন পিক্সেল ফন্ট
      },
    },
  },
  // DaisyUI কনফিগারেশন, যেখানে আমরা থিম নির্ধারণ করছি
  daisyui: {
    themes: ["synthwave"], // তুমি চাইলে এখানে অন্য থিমও চেষ্টা করতে পারো, যেমন: "cyberpunk", "dracula", "night"
  },
  plugins: [require("daisyui")],
};