import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    const slideImages = [
        "https://www.cyberpunk.net/build/images/pre-order/buy-b/keyart-ue-en@2x-cd66fd0d.jpg",
        "https://scontent.fdac13-1.fna.fbcdn.net/v/t1.6435-9/125113706_819401132243412_471089394870265014_n.png?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dqlHBm3m56wQ7kNvwEFVz0t&_nc_oc=AdmnQP3GgRmv6rMXkSqwRlx37O26cXDNt_-lgXyAmZWGSoXMoVJ6gsxPpoLABzpp72c&_nc_zt=23&_nc_ht=scontent.fdac13-1.fna&_nc_gid=7Ti1czaZ1B339K1H0gDj_A&oh=00_AfiTlI-4a3BDexakb_hQQqC3g1NeyfQKSEOB8EpgvTqJrA&oe=693D7013",
        "https://content.screen.nsw.gov.au/assets/Uploads/Past-productions/valorant__ResizedImageWzEwMjQsNTc2XQ.webp"
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