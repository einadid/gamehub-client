// src/pages/AllGames/AllGames.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AllGames = () => {
    // ... state এবং useEffect (ডেটা fetch ও filter) অপরিবর্তিত ...
    const [allGames, setAllGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                setAllGames(data);
                setFilteredGames(data);
                const uniqueCategories = [...new Set(data.map(game => game.category))];
                setCategories(['All', ...uniqueCategories]);
                setLoading(false);
            });
    }, []);

     useEffect(() => {
        let games = [...allGames];

        if (searchTerm) {
            games = games.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

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
    
    // ... JSX ...
    return (
        <div className="container mx-auto my-12 p-4">
             <Helmet>
                <title>GameHub | All Games</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center mb-10 font-orbitron">All Available Games</h2>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-base-200/50 backdrop-blur-sm rounded-lg">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {filteredGames.length > 0 ? (
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
            ) : (
                <div className="text-center my-20">
                    <h3 className="text-2xl font-bold">No Games Found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};
export default AllGames;