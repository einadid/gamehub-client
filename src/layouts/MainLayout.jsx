// src/layouts/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className='min-h-[calc(100vh-250px)]'>
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
