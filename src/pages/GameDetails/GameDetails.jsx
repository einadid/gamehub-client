import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.find(item => item.id === id);
                setGame(foundGame);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center my-20"><span className="loading loading-lg text-primary"></span></div>;
    }

    if (!game) {
        return <div className="text-center my-20 text-2xl font-bold">Game not found!</div>;
    }

    const { title, coverPhoto, category, downloadLink, description, ratings, developer } = game;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto my-12 p-4"
        >
            <Helmet>
                <title>{`GameHub | ${title}`}</title>
            </Helmet>

            <div className="card lg:card-side bg-base-200 shadow-xl">
                <figure className="lg:w-1/3">
                    <img src={coverPhoto} alt={title} className="w-full h-full object-cover"/>
                </figure>
                <div className="card-body lg:w-2/3">
                    <h1 className="card-title text-4xl font-bold font-orbitron">{title}</h1>
                    <p className="text-lg mt-2">Developed by: <span className="font-semibold">{developer}</span></p>
                    <div className="flex items-center gap-4 my-2">
                        <span className="badge badge-primary badge-lg font-orbitron">{category}</span>
                        <span className="font-bold text-yellow-400 text-lg">⭐ {ratings}</span>
                    </div>
                    <p className="mt-4 text-base leading-relaxed">{description}</p>
                    <div className="card-actions justify-end mt-6">
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary font-orbitron">
                            Download Now
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GameDetails;