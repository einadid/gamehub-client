import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

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

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return <div className="text-center my-20"><span className="loading loading-lg text-primary"></span></div>;
    }

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | All Games</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center mb-10 font-orbitron">All Available Games</h2>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {games.map(game => (
                    <motion.div
                        key={game.id}
                        variants={itemVariants}
                        className="card bg-base-200 shadow-xl border border-transparent hover:border-primary transition-all duration-300"
                    >
                        <figure className="h-56">
                            <img src={game.coverPhoto} alt={game.title} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-montserrat">{game.title}</h2>
                            <p>Developer: {game.developer}</p>
                            <div className="card-actions justify-end items-center mt-4">
                                <div className="font-bold text-yellow-400">⭐ {game.ratings}</div>
                                <Link to={`/game/${game.id}`} className="btn btn-primary btn-sm font-orbitron">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AllGames;