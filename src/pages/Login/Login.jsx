// src/pages/Login/Login.jsx

import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from "react-icons/fa"; // ১. এই লাইনটি ঠিক করো

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value; // email state থেকে নেওয়া হচ্ছে

        signIn(email, password)
            .then(result => {
                toast.success('Login Successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                toast.success('Successfully logged in with Google!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <Helmet>
                <title>GameHub | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl font-bold text-center">Login now!</h1>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link
                                    to="/forgot-password"
                                    state={{ email: email }}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className="text-center mb-4">New to GameHub? <Link to="/register" className="link link-primary">Create an account</Link></p>
                    
                    {/* Google Sign-in বাটন */}
                    <div className="divider px-8">OR</div>
                    <div className="px-8 mb-6">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                            <FaGoogle />
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;