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
import AllGames from "../pages/AllGames/AllGames.jsx"; // ১. এই লাইনটি ইম্পোর্ট করো

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/game/:id",
                element: (
                    <PrivateRoute>
                        <GameDetails />
                    </PrivateRoute>
                ),
            },
            { // ২. এই নতুন রুটটি যোগ করো
                path: "/all-games",
                element: <AllGames />,
            },
            // এখানে ভবিষ্যতে আরও রুট যোগ করা যাবে
        ],
    },
]);