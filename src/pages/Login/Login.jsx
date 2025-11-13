import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FaGoogle } from "react-icons/fa";
import { motion } from 'framer-motion';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                toast.success('Login Successful!');
                navigate(from, { replace: true });
            })
            .catch(error => toast.error(error.message));
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Successfully logged in with Google!');
                navigate(from, { replace: true });
            })
            .catch(error => toast.error(error.message));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hero min-h-screen bg-base-200"
        >
            <Helmet>
                <title>GameHub | Login</title>
            </Helmet>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-primary">
                <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-3xl font-bold text-center font-orbitron">Login Now!</h1>
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
                            <Link to="/forgot-password" state={{ email: email }} className="label-text-alt link link-hover">
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary font-orbitron">Login</button>
                    </div>
                </form>
                <div className="px-8 pb-6">
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                        <FaGoogle /> Continue with Google
                    </button>
                    <p className="text-center mt-4">
                        New to GameHub? <Link to="/register" className="link link-primary">Create an account</Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;