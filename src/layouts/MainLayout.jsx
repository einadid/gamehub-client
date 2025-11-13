// src/layouts/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar.jsx';
import Footer from '../components/Shared/Footer.jsx';

const MainLayout = () => {
    return (
        <div className="font-montserrat bg-base-100">
            <Navbar />
            <main className="min-h-[calc(100vh-128px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;