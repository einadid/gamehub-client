// src/pages/UpdateProfile/UpdateProfile.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const UpdateProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;

        updateUserProfile(name, photoURL)
            .then(() => {
                toast.success('Profile updated successfully!');
                navigate('/my-profile'); // আপডেট শেষে প্রোফাইল পেজে ফেরত পাঠানো
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | Update Profile</title>
            </Helmet>

            <div className="max-w-md mx-auto bg-base-100 shadow-xl rounded-lg p-8 border">
                <h1 className="text-3xl font-bold text-center mb-6">Update Your Information</h1>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            defaultValue={user?.photoURL}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary">
                            Update Information
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;