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

  daisyui: {
    themes: [
      {
        synthwave: {
          // প্রাইমারি কালার গোল্ডেন ইয়েলো
          "primary": "#ffc700",

          // সেকেন্ডারি কালার হিসেবে একটি সাইবার ব্লু ব্যবহার করা হয়েছে
          "secondary": "#08d9d6",   // <-- এই লাইনটি পরিবর্তন করা হয়েছে
          
          // বাকি রঙগুলো অপরিবর্তিত
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
    ],
  },
};