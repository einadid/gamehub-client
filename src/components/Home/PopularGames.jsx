import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Swiper.js থেকে প্রয়োজনীয় কম্পোনেন্ট এবং মডিউল ইম্পোর্ট
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';

// Swiper.js-এর স্টাইলশীট
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const PopularGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/games.json')
            .then(res => res.json())
            .then(data => {
                const sortedGames = data.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings));
                setGames(sortedGames.slice(0, 9));
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch popular games:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="my-20 text-center">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );
    }
    
    return (
        <div className="my-20">
            <h2 className="text-4xl font-bold text-center mb-10 font-orbitron">Popular Games</h2>

            <Swiper
                modules={[Navigation, Autoplay, FreeMode]}
                loop={true}
                navigation={true}
                freeMode={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 40 },
                }}
                className="mySwiper px-4"
            >
                {games.map((game) => (
                    <SwiperSlide key={game.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* 
                              এখানে মূল পরিবর্তন আনা হয়েছে:
                              1. 'image-full' ক্লাসটি সরিয়ে দেওয়া হয়েছে।
                              2. 'relative' ক্লাস যোগ করা হয়েছে।
                              3. ::before pseudo-element এর জন্য কাস্টম ক্লাস যোগ করা হয়েছে।
                            */}
                            <div className="card relative bg-base-100 shadow-xl h-96 overflow-hidden group transition-all duration-300 hover:shadow-primary/50">
                                <figure className='h-full'>
                                    <img src={game.coverPhoto} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </figure>
                                
                                {/* কাস্টম ওভারলে */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                {/* card-body এখন absolute পজিশনে */}
                                <div className="card-body absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <div>
                                        <h2 className="card-title text-2xl font-orbitron drop-shadow-lg">{game.title}</h2>
                                        <p className='text-lg mt-1'>
                                            Rating: <span className='font-bold text-yellow-300'>{game.ratings} ⭐</span>
                                        </p>
                                    </div>
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/game/${game.id}`} className="btn btn-primary btn-sm font-orbitron">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularGames;