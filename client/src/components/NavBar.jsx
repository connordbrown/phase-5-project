import React from 'react';
// enable links to other pages and .active styling
import { NavLink } from 'react-router-dom';
// styling for NavBar
import './styling/NavBar.css';

// create nav bar multiple endpoints
function NavBar() {
    return (
        <div className='nav-container'>
            <nav className='navbar'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/write'>Write</NavLink>
                <NavLink to='/logout'>Logout</NavLink>
            </nav>
        </div>
    )
}

export default NavBar;