import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import axios from 'axios';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setUploading(true);

        const form = e.target;
        const name = form.name.value;
        const imageFile = form.image.files[0];
        const email = form.email.value;
        const password = form.password.value;

        // পাসওয়ার্ড ভ্যালিডেশন
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            setUploading(false);
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain an uppercase letter.");
            setUploading(false);
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error("Password must contain a lowercase letter.");
            setUploading(false);
            return;
        }

        let photoURL = `https://i.pinimg.com/736x/dc/80/c5/dc80c5160bd01d66a163ffe15c4e5517.jpg`; // ডিফল্ট অ্যাভাটার

        // যদি ইউজার নতুন ছবি আপলোড করে
        if (imageFile) {
            if (imageFile.size > 300 * 1024) { // 300KB
                toast.error('Image size should be less than 300KB.');
                setUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
                if (response.data.success) {
                    photoURL = response.data.data.display_url;
                } else {
                    throw new Error('Image upload failed.');
                }
            } catch (error) {
                toast.error('Failed to upload image. Please try again.');
                setUploading(false);
                return;
            }
        }

        // Firebase ইউজার তৈরি এবং প্রোফাইল আপডেট
        try {
            await createUser(email, password);
            await updateUserProfile(name, photoURL);
            toast.success('Registration Successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
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
                    <h1 className="text-3xl font-bold text-center font-orbitron">Create Account</h1>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    
                    {/* ফটো আপলোড ইনপুট - required সরিয়ে দেওয়া হয়েছে */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Profile Photo (Optional, Max 300KB)</span></label>
                        <input
                            type="file"
                            name="image"
                            className="file-input file-input-bordered file-input-secondary w-full"
                            accept="image/*"
                        />
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
                        <button type="submit" className="btn btn-secondary font-orbitron" disabled={uploading}>
                            {uploading ? <span className="loading loading-spinner"></span> : 'Register'}
                        </button>
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