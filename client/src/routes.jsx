import React from 'react';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';
import ArticleInfo from './pages/ArticleInfo';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },    
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                path: "/articles/:id",
                element: <ArticleInfo />
            },
            {
                path: "/profile/:id",
                element: <UserProfile />
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    }
]

export default routes;