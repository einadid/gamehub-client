// src/components/Home/PopularGames.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // public ফোল্ডার থেকে ডেটা fetch করা
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                // রেটিং অনুযায়ী sort করা (বেশি রেটিং আগে)
                const sortedGames = data.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));
                // প্রথম ৩টি গেম নেওয়া
                setGames(sortedGames.slice(0, 3));
            });
    }, []);

    return (
        <div className="my-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">Popular Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map(game => (
                    <div key={game.id} className="card bg-base-100 shadow-xl image-full">
                        <figure><img src={game.coverPhoto} alt={game.title} /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl">{game.title}</h2>
                            <p>Rating: {game.ratings} ⭐</p>
                            <div className="card-actions justify-end">
                                {/* এখন আমরা Game Details পেজে লিংক করব */}
                                <Link to={`/game/${game.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularGames;