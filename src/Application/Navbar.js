import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav className='menu'>
                <NavLink to='/'>Images</NavLink>
                <NavLink to='/gifs'>Gifs</NavLink>
            </nav>
        </>
    )
}

export default Navbar;