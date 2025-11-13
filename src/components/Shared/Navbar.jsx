import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import hoverSound from '/hover.mp3';
import clickSound from '/click.mp3';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [playHover] = useSound(hoverSound, { volume: 0.25 });
    const [playClick] = useSound(clickSound, { volume: 0.5 });

    const handleLogOut = () => {
        playClick();
        logOut()
            .then(() => toast.success('Logout successful!'))
            .catch(error => console.error(error));
    };

    const navLinks = (
        <>
            <li onMouseEnter={playHover} onClick={playClick}>
                <NavLink to="/">Home</NavLink>
            </li>
            <li onMouseEnter={playHover} onClick={playClick}>
                <NavLink to="/all-games">All Games</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-200/80 backdrop-blur-sm shadow-lg px-4 sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden" onMouseEnter={playHover} onClick={playClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-bold font-pixel normal-case" onMouseEnter={playHover}>
                    Game<span className="text-primary">Hub</span>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-orbitron">
                    {navLinks}
                </ul>
            </div>

            {/* Navbar End - এখানে মূল পরিবর্তন আনা হয়েছে */}
            <div className="navbar-end flex items-center gap-2">
                {/* Login এবং Register বাটন এখন সবসময় দেখা যাবে */}
                <div className="hidden md:flex gap-2">
                    <Link to="/login" className="btn btn-outline btn-primary btn-sm font-orbitron" onMouseEnter={playHover} onClick={playClick}>
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary btn-sm font-orbitron" onMouseEnter={playHover} onClick={playClick}>
                        Sign Up
                    </Link>
                </div>

                {/* যদি ইউজার লগইন করা থাকে, তাহলে প্রোফাইল ছবিটিও দেখা যাবে */}
                {user && (
                    <div className="dropdown dropdown-end ml-2">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onMouseEnter={playHover}>
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" title={user.displayName}>
                                <img 
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                                    alt={user.displayName} 
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 font-montserrat">
                            <li className="p-2 font-bold disabled">{user.displayName}</li>
                            <li onMouseEnter={playHover} onClick={playClick}>
                                <Link to="/my-profile" className='justify-between'>My Profile</Link>
                            </li>
                            <li onMouseEnter={playHover} onClick={handleLogOut}>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;