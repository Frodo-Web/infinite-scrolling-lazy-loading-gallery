import React from 'react';
import { NavLink } from 'react-router-dom';

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