// src/routes/Routes.jsx

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import GameDetails from "../pages/GameDetails/GameDetails.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";
import AllGames from "../pages/AllGames/AllGames.jsx"; 
import MyProfile from '../pages/MyProfile/MyProfile.jsx'; 
import UpdateProfile from '../pages/UpdateProfile/UpdateProfile.jsx'; 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            // Home
            {
                path: "/",
                element: <Home />,
            },
            // Login
            {
                path: "/login",
                element: <Login />,
            },
            // Register
            {
                path: "/register",
                element: <Register />,
            },
            // Forgot Password
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            // Game Details (Private)
            {
                path: "/game/:id",
                element: (
                    <PrivateRoute>
                        <GameDetails />
                    </PrivateRoute>
                ),
            },
            // All Games
            {
                path: "/all-games",
                element: <AllGames />,
            },
            // My Profile (Private)
            {
                path: "/my-profile",
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },
            // Update Profile (Private)
            {
                path: "/update-profile",
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                ),
            },
            // এখানে ভবিষ্যতে আরও রুট যোগ করা যাবে
        ],
    },
]);
