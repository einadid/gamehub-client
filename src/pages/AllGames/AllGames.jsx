// src/pages/AllGames.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AllGames = () => {
    const [allGames, setAllGames] = useState([]); // মূল ডেটা
    const [filteredGames, setFilteredGames] = useState([]); // ফিল্টার করা ডেটা
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // ডেটা ফেচ করা
    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                setAllGames(data);
                setFilteredGames(data);
                setLoading(false);
            });
    }, []);

    // সার্চ ও ক্যাটাগরি অনুযায়ী ফিল্টার করা
    useEffect(() => {
        let games = [...allGames];

        // সার্চ ফিল্টার
        if (searchTerm) {
            games = games.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // ক্যাটাগরি ফিল্টার
        if (selectedCategory !== 'All') {
            games = games.filter(game => game.category === selectedCategory);
        }

        setFilteredGames(games);
    }, [searchTerm, selectedCategory, allGames]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="text-center my-20">
                <span className="loading loading-lg text-primary"></span>
            </div>
        );
    }

    // ইউনিক ক্যাটাগরি লিস্ট বের করা
    const categories = ['All', ...new Set(allGames.map(game => game.category))];

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | All Games</title>
            </Helmet>

            <h2 className="text-4xl font-bold text-center mb-10 font-orbitron">
                All Available Games
            </h2>

            {/* সার্চ ও ফিল্টার */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search games..."
                    className="input input-bordered w-full md:w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {filteredGames.map(game => (
                    <motion.div
                        key={game.id}
                        variants={itemVariants}
                        className="card bg-base-200 shadow-xl border border-transparent hover:border-primary transition-all duration-300"
                    >
                        <figure className="h-56">
                            <img
                                src={game.coverPhoto}
                                alt={game.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-montserrat">{game.title}</h2>
                            <p>Developer: {game.developer}</p>
                            <div className="card-actions justify-end items-center mt-4">
                                <div className="font-bold text-yellow-400">
                                    ⭐ {game.ratings}
                                </div>
                                <Link
                                    to={`/game/${game.id}`}
                                    className="btn btn-primary btn-sm font-orbitron"
                                >
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
