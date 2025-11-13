// src/providers/AuthProvider.jsx

import React, { createContext, useEffect, useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail // Forget Password এর জন্য এটি ইম্পোর্ট করো
} from "firebase/auth";
import app from '../firebase/firebase.config'; // তোমার firebase কনফিগারেশন ফাইল

// ১. AuthContext তৈরি করা
export const AuthContext = createContext(null);

// Firebase থেকে auth সার্ভিস ইনিশিয়ালাইজ করা
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // ২. দুটি স্টেট তৈরি করা: একটি ইউজারের জন্য, অন্যটি লোডিং অবস্থার জন্য
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ৩. নতুন ইউজার তৈরি করার ফাংশন (Registration এর জন্য)
    const createUser = (email, password) => {
        setLoading(true); // ডেটা লোড হওয়ার আগে লোডিং শুরু
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ৪. ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করার ফাংশন
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ৫. Google দিয়ে লগইন করার ফাংশন
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // ৬. লগআউট করার ফাংশন
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // ৭. ইউজারের প্রোফাইল (নাম এবং ছবি) আপডেট করার ফাংশন
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // ৮. পাসওয়ার্ড রিসেট ইমেইল পাঠানোর ফাংশন (Forget Password এর জন্য)
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    // ৯. ইউজারের লগইন অবস্থা পর্যবেক্ষণ করার জন্য useEffect
    // এই অংশটি একবারই রান হবে এবং ইউজারের লগইন বা লগআউট حالة পরিবর্তন হলে 자동으로 user স্টেট আপডেট করবে
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current logged in user:', currentUser);
            setLoading(false); // ইউজার পাওয়া বা না পাওয়ার পর লোডিং শেষ
        });

        // কম্পোনেন্ট আনমাউন্ট হলে এই listener-টি বন্ধ করে দেওয়া হবে মেমোরি লিক এড়ানোর জন্য
        return () => {
            return unsubscribe();
        }
    }, []);


    // ১০. সকল ফাংশন এবং স্টেটগুলোকে একটি অবজেক্টে রাখা
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        resetPassword // এখানে ফাংশনটি যোগ করো
    };

    // ১১. Context Provider এর মাধ্যমে children কম্পোনেন্টগুলোতে authInfo পাঠানো
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;