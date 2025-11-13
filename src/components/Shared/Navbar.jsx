import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import { themeChange } from 'theme-change';
import { FaPalette } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";

import hoverSound from '/hover.mp3';
import clickSound from '/click.mp3';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    useEffect(() => {
        themeChange(false);
    }, []);

    const [playHover] = useSound(hoverSound, { volume: 0.25 });
    const [playClick] = useSound(clickSound, { volume: 0.5 });

    const closeDrawer = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4');
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };
    
    const handleLogOut = () => {
        playClick();
        closeDrawer();
        logOut()
            .then(() => toast.success('Logout successful!'))
            .catch(error => console.error(error));
    };

    // ড্রয়ার এবং ডেস্কটপ উভয়ের জন্য লিঙ্ক
    const navLinks = (
        <>
            <li onMouseEnter={playHover} onClick={() => { playClick(); closeDrawer(); }}><NavLink to="/">Home</NavLink></li>
            <li onMouseEnter={playHover} onClick={() => { playClick(); closeDrawer(); }}><NavLink to="/all-games">All Games</NavLink></li>
        </>
    );

    const themeList = ["synthwave", "light", "dark", "cyberpunk", "dracula", "forest", "aqua"];

    return (
        <div className="drawer drawer-end font-montserrat">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-200/80 backdrop-blur-sm shadow-lg px-2 sm:px-4 sticky top-0 z-40">
                    
                    {/* Navbar Start: মোবাইল লোগো এবং ডেস্কটপ লিঙ্ক */}
                    <div className="navbar-start">
                        {/* মোবাইল লোগো */}
                        <Link to="/" className="btn btn-ghost text-xl font-bold font-pixel normal-case lg:hidden" onMouseEnter={playHover}>
                            Game<span className="text-primary">Hub</span>
                        </Link>
                        {/* ডেস্কটপ লিঙ্ক */}
                        <ul className="menu menu-horizontal px-1 font-orbitron hidden lg:flex">
                            {navLinks}
                        </ul>
                    </div>
                    
                    {/* Navbar Center: ডেস্কটপ লোগো */}
                    <div className="navbar-center hidden lg:flex">
                        <Link to="/" className="btn btn-ghost text-2xl font-bold font-pixel normal-case" onMouseEnter={playHover}>
                            Game<span className="text-primary">Hub</span>
                        </Link>
                    </div>

                    {/* Navbar End: প্রোফাইল/লগইন এবং মেন্যু আইকন */}
                    <div className="navbar-end">
                        {/* ডেস্কটপ প্রোফাইল/লগইন এবং থিম চেঞ্জার */}
                        <div className="hidden lg:flex items-center gap-2">
                             {/* Theme Changer */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" title="Change Theme"><FaPalette size={20} /></div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-300 rounded-box w-52 h-60 overflow-y-auto">
                                    {themeList.map(theme => <li key={theme}><button data-set-theme={theme} data-act-class="active" className='capitalize'>{theme}</button></li>)}
                                </ul>
                            </div>
                            {/* User Section */}
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar" title={user.displayName}>
                                        <div className="w-10 rounded-full ring ring-primary"><img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} alt={user.displayName} /></div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-200 rounded-box w-52">
                                        <li className="p-2 font-bold disabled">{user.displayName}</li>
                                        <li><Link to="/my-profile">My Profile</Link></li>
                                        <li onClick={handleLogOut}><a>Logout</a></li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login" className="btn btn-outline btn-primary btn-sm font-orbitron">Login</Link>
                                    <Link to="/register" className="btn btn-secondary btn-sm font-orbitron">Sign Up</Link>
                                </div>
                            )}
                        </div>
                        {/* মোবাইল মেন্যু আইকন */}
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden">
                            <CgMenuRight size={28} />
                        </label>
                    </div>
                </div>
                {/* পেজের কন্টেন্ট */}
            </div>
            
            {/* Drawer Sidebar - মোবাইল ভিউ */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* সাইডবার কন্টেন্ট */}
                    <li className="font-pixel text-2xl mb-4"><Link to="/" onClick={closeDrawer}>GameHub</Link></li>
                    {navLinks}
                    <div className="divider"></div>
                    {/* Login/Signup or Profile/Logout */}
                    {user ? (
                         <>
                            <li><Link to="/my-profile" onClick={closeDrawer} className="justify-between">My Profile</Link></li>
                            <li onClick={handleLogOut}><a>Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={closeDrawer} className="btn btn-outline btn-primary mb-2">Login</Link></li>
                            <li><Link to="/register" onClick={closeDrawer} className="btn btn-secondary">Sign Up</Link></li>
                        </>
                    )}
                    <div className="divider"></div>
                    {/* থিম চেঞ্জার */}
                    <li>
                        <details>
                            <summary><FaPalette /> Theme</summary>
                            <ul className='p-2 bg-base-100 rounded-t-none h-40 overflow-y-auto'>
                                {themeList.map(theme => <li key={theme}><button data-set-theme={theme} data-act-class="active" className='capitalize'>{theme}</button></li>)}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;