// src/pages/ForgotPassword/ForgotPassword.jsx

import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent! Please check your inbox.');
                // Gmail এ রিডাইরেক্ট করা
                // window.location.href = 'https://mail.google.com/';
                // উপরের লাইনটি ব্যবহারকারীকে সরাসরি gmail এ নিয়ে যাবে, যা অনেক সময় ভালো UX না। 
                // তাই আপাতত শুধু একটি success message দেখানোই ভালো।
                navigate('/login'); // রিসেট লিঙ্কে পাঠানোর পর লগইন পেজে ফেরত পাঠানো
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    return (
        <div>
            <Helmet>
                <title>GameHub | Reset Password</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleResetPassword} className="card-body">
                        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
                        <p className="text-center text-sm">Enter your email to receive a password reset link.</p>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="your-email@example.com" 
                                className="input input-bordered" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Send Reset Link</button>
                        </div>
                        <div className='text-center mt-4'>
                            <Link to="/login" className="link link-primary">Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;