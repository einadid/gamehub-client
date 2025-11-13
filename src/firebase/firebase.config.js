// src/firebase/firebase.config.js

import { initializeApp } from "firebase/app";

// এখানে আমরা .env.local ফাইল থেকে ভ্যারিয়েবলগুলো নিরাপদে লোড করছি
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Firebase ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);

// app ভ্যারিয়েবলটি এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইল এটি ব্যবহার করতে পারে
export default app;