import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    const slideImages = [
        "https://i.ibb.co/L9nZzV0/cyberpunk.jpg",
        "https://i.ibb.co/zZ3yS5C/genshin.jpg",
        "https://i.ibb.co/k3t8rPj/valorant.jpg"
    ];

    return (
        <div className="carousel w-full h-[400px] md:h-[600px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={slideImages[0]} className="w-full object-cover" alt="Banner 1" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='text-white space-y-4 p-4'
                    >
                        <h2 className='text-3xl md:text-6xl font-bold font-orbitron'>Explore the Universe of Games</h2>
                        <p className='text-lg md:text-xl'>Discover and support your favorite indie developers.</p>
                        <button className="btn btn-primary font-orbitron">Browse Now</button>
                    </motion.div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide2" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={slideImages[1]} className="w-full object-cover" alt="Banner 2" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide3" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={slideImages[2]} className="w-full object-cover" alt="Banner 3" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle btn-ghost text-white">❮</a>
                    <a href="#slide1" className="btn btn-circle btn-ghost text-white">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;