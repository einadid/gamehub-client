import React from 'react';
import Banner from '../../components/Home/Banner.jsx';
import PopularGames from '../../components/Home/PopularGames.jsx';
// import Newsletter from '../../components/Home/Newsletter.jsx'; // ১. এই লাইনটি কমেন্ট আউট বা মুছে দাও
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className='font-montserrat'>
            <Helmet>
                <title>GameHub | Home</title>
            </Helmet>
            <Banner />
            <div className='container mx-auto px-4'>
                <PopularGames />
            </div>
            {/* <Newsletter /> */} {/* ২. এই কম্পোনেন্টটিকে কমেন্ট আউট বা মুছে দাও */}
        </div>
    );
};

export default Home;