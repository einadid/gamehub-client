// src/routes/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // ১. ডেটা লোডিং অবস্থায় থাকলে একটি লোডিং স্পিনার দেখানো হবে
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // ২. যদি ইউজার লগইন করা থাকে, তাহলে তাকে কাঙ্ক্ষিত পেজে যেতে দেওয়া হবে
    if (user) {
        return children;
    }

    // ৩. যদি ইউজার লগইন করা না থাকে, তাকে লগইন পেজে পাঠানো হবে
    // `state` এ `location` পাঠানোর কারণ হলো, লগইন করার পর ইউজারকে আবার আগের পেজেই ফেরত আনা
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;