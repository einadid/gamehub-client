import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Swiper.js থেকে প্রয়োজনীয় কম্পোনেন্ট এবং মডিউল ইম্পোর্ট করো
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';

// Swiper.js-এর স্টাইলশীটগুলো ইম্পোর্ট করো
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
                setGames(sortedGames.slice(0, 9)); // লুপের জন্য কিছু বেশি আইটেম নেওয়া ভালো
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

            {/* Swiper Carousel */}
            <Swiper
                modules={[Navigation, Autoplay, FreeMode]}
                loop={true} // <-- এই প্রপটি Infinite Loop তৈরি করবে
                navigation={true} // <-- নেভিগেশন অ্যারো দেখানোর জন্য
                freeMode={true} // <-- স্মুথ স্ক্রলিং এবং সোয়াইপিং এর জন্য
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    // মোবাইল ভিউ
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // ট্যাবলেট ভিউ
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // ডেস্কটপ ভিউ
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="mySwiper px-4"
            >
                {games.map((game) => (
                    <SwiperSlide key={game.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card bg-base-100 shadow-xl image-full h-96 transition-transform duration-300 hover:scale-105">
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
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularGames;