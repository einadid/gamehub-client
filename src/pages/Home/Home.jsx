import React from 'react';
import Banner from '../../components/Home/Banner';
import PopularGames from '../../components/Home/PopularGames';
import Newsletter from '../../components/Home/Newsletter';
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
            <Newsletter />
        </div>
    );
};

export default Home;