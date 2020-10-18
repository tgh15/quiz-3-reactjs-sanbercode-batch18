import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isLogin, setIsLogin } = useContext(AuthContext)
    return (
        <header>
            <img id="logo" src={Logo} alt="logo" width="200px" />
            <nav>
                <ul>
                    <li><Link to="/">Home </Link> </li>
                    <li><Link to="/about">About </Link> </li>
                    {isLogin ? (
                        <>
                            <li><Link to="/movie">Movie List Editor </Link> </li>
                            <li><Link to="/#" onClick={() => setIsLogin(false)}>Logout </Link> </li>
                        </>
                    ) : (
                            <li><Link to="/login">Login </Link> </li>
                        )}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
