import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PopularGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                const sortedGames = data.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));
                setGames(sortedGames.slice(0, 3));
            });
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
            },
        }),
    };

    return (
        <div className="my-20">
            <h2 className="text-4xl font-bold text-center mb-10 font-orbitron">Popular Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game, index) => (
                    <motion.div
                        key={game.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="card bg-base-200 shadow-xl image-full transition-transform duration-300 hover:scale-105"
                    >
                        <figure><img src={game.coverPhoto} alt={game.title} className="w-full h-full object-cover" /></figure>
                        <div className="card-body justify-between">
                            <div>
                                <h2 className="card-title text-2xl font-montserrat">{game.title}</h2>
                                <p className='text-lg'>Rating: <span className='font-bold text-yellow-400'>{game.ratings} ⭐</span></p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/game/${game.id}`} className="btn btn-primary font-orbitron">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PopularGames;