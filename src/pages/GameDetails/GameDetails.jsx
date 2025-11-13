// src/pages/GameDetails/GameDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GameDetails = () => {
    const { id } = useParams(); // URL থেকে id প্যারামিটারটি নিবে (e.g., /game/1)
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                // সব গেমের মধ্যে থেকে নির্দিষ্ট id-এর গেমটি খুঁজে বের করা
                const foundGame = data.find(item => item.id === id);
                setGame(foundGame);
                setLoading(false);
            });
    }, [id]); // id পরিবর্তন হলে useEffect আবার রান করবে

    if (loading) {
        return <div className="text-center my-20"><span className="loading loading-lg"></span></div>;
    }

    if (!game) {
        return <div className="text-center my-20 text-2xl font-bold">Game not found!</div>;
    }

    const { title, coverPhoto, category, downloadLink, description, ratings, developer } = game;

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>{`GameHub | ${title}`}</title>
            </Helmet>

            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/3">
                    <img src={coverPhoto} alt={title} className="w-full h-full object-cover"/>
                </figure>
                <div className="card-body lg:w-2/3">
                    <h1 className="card-title text-4xl font-bold">{title}</h1>
                    <p className="text-lg mt-2">Developed by: <span className="font-semibold">{developer}</span></p>
                    <div className="flex items-center gap-4 my-2">
                        <span className="badge badge-primary badge-lg">{category}</span>
                        <span className="font-bold text-yellow-500">⭐ {ratings}</span>
                    </div>
                    <p className="mt-4 text-base">{description}</p>
                    <div className="card-actions justify-end mt-6">
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Download Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;