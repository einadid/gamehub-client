// src/pages/MyProfile/MyProfile.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    // যদি কোনো কারণে user লোড না হয়
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | My Profile</title>
            </Helmet>

            <div className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg p-8 border">
                <div className="flex flex-col items-center">
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} alt={user.displayName} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mt-4">{user.displayName}</h1>
                    <p className="text-lg text-gray-500 mt-2">{user.email}</p>
                    
                    <div className="mt-8">
                        <Link to="/update-profile" className="btn btn-primary">
                            <FaUserEdit />
                            Update Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;