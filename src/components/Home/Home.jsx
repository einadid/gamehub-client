// src/pages/Home/Home.jsx

import React from 'react';
import Banner from '../../components/Home/Banner';
import PopularGames from '../../components/Home/PopularGames';
import Newsletter from '../../components/Home/Newsletter';
import { Helmet } from 'react-helmet-async'; // Dynamic Title এর জন্য

const Home = () => {
    return (
        <div>
            {/* ডাইনামিক টাইটেল সেট করার জন্য Helmet */}
            <Helmet>
                <title>GameHub | Home</title>
            </Helmet>

            <Banner />
            <PopularGames />
            <Newsletter />
        </div>
    );
};

export default Home;