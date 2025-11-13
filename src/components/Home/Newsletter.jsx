import React from 'react';

const Newsletter = () => {
    return (
        <div className="p-10 my-20 bg-base-200">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-orbitron">Stay in the Loop!</h2>
                <p className="py-4 text-lg">Subscribe to our newsletter to get the latest updates on new games, offers, and more.</p>
            </div>
            <div className="form-control max-w-md mx-auto mt-4">
                <div className="relative">
                    <input type="email" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                    <button className="btn btn-primary absolute top-0 right-0 rounded-l-none font-orbitron">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;