/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  
  plugins: [require("daisyui")],

  // DaisyUI কনফিগারেশন - এখানে থিমের তালিকা আপডেট করা হয়েছে
  daisyui: {
    themes: [
      {
        // আমাদের কাস্টমাইজড synthwave থিমটি এখানে থাকবে
        synthwave: {
          "primary": "#ffc700",      // গোল্ডেন ইয়েলো
          "secondary": "#08d9d6",    // সাইবার ব্লু
          "accent": "#f400a1",
          "neutral": "#1b192f",
          "base-100": "#1a103d",
          "info": "#72c2e8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--tab-border": "2px",
        },
      },
      // অন্যান্য বিল্ট-ইন থিম যা ইউজার সিলেক্ট করতে পারবে
      "light",
      "dark",
      "cyberpunk",
      "dracula",
      "forest",
      "aqua",
    ],
  },
};