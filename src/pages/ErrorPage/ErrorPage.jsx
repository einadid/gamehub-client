import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Player } from '@lottiefiles/react-lottie-player'; // Lottie Player

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content p-4 text-center">
            <Helmet>
                <title>GameHub | 404 - Page Lost</title>
            </Helmet>

            {/* Lottie অ্যানিমেশন */}
            <Player
                autoplay
                loop
                // একটি পাবলিক এবং কার্যকরী Lottie অ্যানিমেশনের URL ব্যবহার করা হয়েছে
                src="https://assets3.lottiefiles.com/packages/lf20_p8bfn5to.json"
                style={{ height: '300px', width: '300px' }}
            />

            <h1 className="text-5xl md:text-7xl font-bold font-orbitron mt-8">LEVEL NOT FOUND</h1>
            <p className="mt-4 text-lg max-w-md">
                Oops! It seems you've taken a wrong turn in the digital universe. This area is still under construction or has been wiped by a solar flare.
            </p>

            {/* এরর মেসেজ (যদি রাউটার থেকে কোনো এরর আসে) */}
            {error && (
                <p className="mt-2 text-error font-semibold">
                    <i>Error: {error.statusText || error.message}</i>
                </p>
            )}

            <div className="mt-8">
                <Link to="/" className="btn btn-primary font-orbitron">
                    Return to Lobby
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;