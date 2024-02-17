import React from 'react';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';
import ErrorPage from './pages/ErrorPage';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/about",
                        element: <About />
                    },
                    {
                        path: "/logout",
                        element: <Logout />
                    },
                    {
                        path: "/profile/:id",
                        element: <UserProfile />
                    },
                ]
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    }
]

export default routes;