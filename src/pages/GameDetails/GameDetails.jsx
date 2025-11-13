import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ContentLoader from 'react-content-loader'; // Skeleton Loader

// Skeleton Loader কম্পোনেন্ট
const GameDetailsSkeleton = (props) => (
    <div className="container mx-auto my-12 p-4">
        <ContentLoader
            speed={2}
            width="100%"
            height={500}
            viewBox="0 0 1200 500"
            backgroundColor="#2a2a2a" // ডার্ক থিমের জন্য
            foregroundColor="#4a4a4a" // ডার্ক থিমের জন্য
            {...props}
        >
            <rect x="0" y="0" rx="16" ry="16" width="450" height="500" />
            <rect x="500" y="20" rx="5" ry="5" width="500" height="40" />
            <rect x="500" y="80" rx="5" ry="5" width="300" height="20" />
            <rect x="500" y="120" rx="5" ry="5" width="200" height="20" />
            <rect x="500" y="180" rx="5" ry="5" width="650" height="15" />
            <rect x="500" y="210" rx="5" ry="5" width="620" height="15" />
            <rect x="500" y="240" rx="5" ry="5" width="580" height="15" />
            <rect x="500" y="440" rx="8" ry="8" width="200" height="50" />
        </ContentLoader>
    </div>
);


const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        // ডেটা লোডিং-এ একটি কৃত্রিম ডিলে যোগ করা, যাতে লোডারটি দেখা যায়
        setTimeout(() => {
            fetch('/games.json')
                .then(res => res.json())
                .then(data => {
                    const foundGame = data.find(item => item.id === id);
                    setGame(foundGame);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch game data:", error);
                    setLoading(false);
                });
        }, 500); // 0.5 সেকেন্ড ডিলে
    }, [id]);

    useEffect(() => {
        if (selectedImage) {
            modalRef.current.showModal();
        }
    }, [selectedImage]);

    if (loading) {
        return <GameDetailsSkeleton />; // লোডিং অবস্থায় স্কেলিটন দেখানো হচ্ছে
    }

    if (!game) {
        return (
            <div className="text-center my-20">
                <h2 className="text-3xl font-bold font-orbitron">Game Not Found</h2>
                <p className="mt-4">Sorry, we couldn't find the game you're looking for.</p>
            </div>
        );
    }

    const { title, coverPhoto, category, downloadLink, description, ratings, developer, releaseDate, tags, gallery } = game;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container mx-auto my-12 p-4 font-montserrat"
        >
            <Helmet>
                <title>{`GameHub | ${title}`}</title>
            </Helmet>

            {/* Main Game Details Section */}
            <div className="card lg:card-side bg-base-200 shadow-xl overflow-hidden">
                <figure className="lg:w-2/5"><img src={coverPhoto} alt={title} className="w-full h-full object-cover"/></figure>
                <div className="card-body lg:w-3/5">
                    <h1 className="card-title text-4xl lg:text-5xl font-bold font-orbitron">{title}</h1>
                    <p className="text-lg mt-2">Developed by: <span className="font-semibold text-primary">{developer}</span></p>
                    <p className="text-md">Release Date: <span className="font-semibold">{new Date(releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                    <div className="flex items-center gap-4 my-4">
                        <span className="badge badge-primary badge-lg font-orbitron">{category}</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-yellow-400 text-xl">⭐</span>
                            <span className="font-bold text-xl">{ratings}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-base-content/80 leading-relaxed text-justify">{description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {tags && tags.map(tag => <span key={tag} className="badge badge-outline badge-secondary">{tag}</span>)}
                    </div>
                    <div className="card-actions justify-end mt-auto pt-6">
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg font-orbitron">Download Now</a>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {gallery && gallery.length > 0 && (
                <div className="mt-16">
                    <h3 className="text-3xl font-bold font-orbitron mb-6 text-center">Gallery</h3>
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.1 }}>
                        {gallery.map((imgUrl, index) => (
                            <motion.div key={index} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="overflow-hidden rounded-lg shadow-lg cursor-pointer" onClick={() => setSelectedImage(imgUrl)}>
                                <img src={imgUrl} alt={`${title} screenshot ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* Modal for Gallery Image */}
            <dialog ref={modalRef} className="modal" onClose={() => setSelectedImage(null)}>
                <div className="modal-box w-11/12 max-w-5xl p-0 bg-transparent">
                    <img src={selectedImage} alt="Enlarged view" className="w-full h-full object-contain" />
                </div>
                <form method="dialog" className="modal-backdrop"><button>close</button></form>
            </dialog>
        </motion.div>
    );
};

export default GameDetails;