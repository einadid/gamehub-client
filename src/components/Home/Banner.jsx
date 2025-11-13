// src/components/Home/Banner.jsx

import React from 'react';

const Banner = () => {
    // আমরা আমাদের JSON ডেটা থেকে কিছু ছবি ব্যবহার করব
    const slideImages = [
        "https://i.ibb.co/L9nZzV0/cyberpunk.jpg", // Cyberpunk 2077
        "https://i.ibb.co/zZ3yS5C/genshin.jpg", // Genshin Impact
        "https://i.ibb.co/k3t8rPj/valorant.jpg"  // Valorant
    ];

    return (
        <div className="carousel w-full h-[600px]">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
                <img src={slideImages[0]} className="w-full object-cover" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className='text-center text-white space-y-4'>
                        <h2 className='text-5xl font-bold'>Explore the Universe of Games</h2>
                        <p>Discover and support your favorite indie developers.</p>
                        <button className="btn btn-primary">Browse Games</button>
                    </div>
                </div>
            </div>
            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full">
                <img src={slideImages[1]} className="w-full object-cover" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
                <img src={slideImages[2]} className="w-full object-cover" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;