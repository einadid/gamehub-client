// src/pages/ErrorPage/ErrorPage.jsx

import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    // react-router-dom থেকে এররের বিস্তারিত তথ্য পাওয়া যায়
    const error = useRouteError();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <Helmet>
                <title>GameHub | 404 Not Found</title>
            </Helmet>
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h1 className="text-9xl font-extrabold text-primary">404</h1>
                <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
                <p className="mt-4 text-lg">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                
                {/* এররের স্ট্যাটাস বা মেসেজ দেখানোর জন্য (ঐচ্ছিক) */}
                {error && (
                    <p className="mt-2 text-red-500">
                        <i>{error.statusText || error.message}</i>
                    </p>
                )}
                
                <div className="mt-8">
                    <Link 
                        to="/" 
                        className="btn btn-primary"
                    >
                        Go Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;