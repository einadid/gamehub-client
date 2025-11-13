// src/components/Shared/Navbar.jsx

import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Logout successful!');
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-games">All Games</NavLink></li>
    </>;

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-2xl font-bold">
                    Game<span className="text-primary">Hub</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" title={user.displayName}>
                                <img src={user.photoURL} alt={user.displayName} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                            {/* Display Name */}
                            <li className="p-2 font-bold">{user.displayName}</li>

                            {/* My Profile লিঙ্ক */}
                            <li>
                                <Link to="/my-profile" className='justify-between'>My Profile</Link>
                            </li>

                            {/* Logout */}
                            <li onClick={handleLogOut}><a>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-outline btn-primary">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
