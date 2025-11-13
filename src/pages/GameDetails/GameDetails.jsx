import React, { useEffect, useState, useRef } from 'react'; // useRef ইম্পোর্ট করো
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal-এর জন্য নতুন state এবং ref
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);

    // ডেটা fetch করার useEffect
    useEffect(() => {
        setLoading(true);
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
    }, [id]);

    // Modal খোলার এবং বন্ধ করার জন্য useEffect
    useEffect(() => {
        if (selectedImage) {
            modalRef.current.showModal(); // DaisyUI-এর modal খোলার মেথড
        }
    }, [selectedImage]);

    // লোডিং এবং গেম না পাওয়ার UI
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!game) {
        // ... (আগের মতোই)
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

            {/* Main Game Details Section (আগের মতোই) */}
            <div className="card lg:card-side bg-base-200 shadow-xl overflow-hidden">
                {/* ... (এই অংশের কোড অপরিবর্তিত) */}
                <figure className="lg:w-2/5"><img src={coverPhoto} alt={title} className="w-full h-full object-cover"/></figure>
                <div className="card-body lg:w-3/5">
                    {/* ... (এই অংশের কোড অপরিবর্তিত) */}
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
                        {tags && tags.map(tag => (
                            <span key={tag} className="badge badge-outline badge-secondary">{tag}</span>
                        ))}
                    </div>
                    <div className="card-actions justify-end mt-auto pt-6">
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg font-orbitron">Download Now</a>
                    </div>
                </div>
            </div>

            {/* Gallery Section - এখানে পরিবর্তন করা হয়েছে */}
            {gallery && gallery.length > 0 && (
                <div className="mt-16">
                    <h3 className="text-3xl font-bold font-orbitron mb-6 text-center">Gallery</h3>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {gallery.map((imgUrl, index) => (
                            <motion.div
                                key={index}
                                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                onClick={() => setSelectedImage(imgUrl)} // ছবিতে ক্লিক করলে state আপডেট হবে
                            >
                                <img
                                    src={imgUrl}
                                    alt={`${title} screenshot ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* DaisyUI Modal Component - এই নতুন অংশটি যোগ করা হয়েছে */}
            <dialog ref={modalRef} className="modal" onClose={() => setSelectedImage(null)}>
                <div className="modal-box w-11/12 max-w-5xl p-0">
                    <img src={selectedImage} alt="Enlarged view" className="w-full h-full object-contain" />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </motion.div>
    );
};

export default GameDetails;