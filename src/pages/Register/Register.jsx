import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain an uppercase letter.");
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error("Password must contain a lowercase letter.");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success('Registration Successful!');
                        navigate('/');
                    });
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
                <title>GameHub | Register</title>
            </Helmet>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-secondary">
                <form onSubmit={handleRegister} className="card-body">
                    <h1 className="text-3xl font-bold text-center font-orbitron">Register Now!</h1>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-secondary font-orbitron">Register</button>
                    </div>
                </form>
                <p className="text-center mb-6">
                    Already have an account? <Link to="/login" className="link link-secondary">Login</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;