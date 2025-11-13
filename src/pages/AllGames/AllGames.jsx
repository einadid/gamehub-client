// src/pages/AllGames/AllGames.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AllGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center my-20"><span className="loading loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | All Games</title>
            </Helmet>

            <h2 className="text-4xl font-bold text-center mb-10">All Available Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {games.map(game => (
                    <div key={game.id} className="card bg-base-100 shadow-xl border">
                        <figure className="h-56">
                            <img src={game.coverPhoto} alt={game.title} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {game.title}
                                <div className="badge badge-secondary">{game.category}</div>
                            </h2>
                            <p>Developer: {game.developer}</p>
                            <div className="card-actions justify-end items-center mt-4">
                                <div className="font-bold text-yellow-500">⭐ {game.ratings}</div>
                                <Link to={`/game/${game.id}`} className="btn btn-primary btn-sm">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllGames;