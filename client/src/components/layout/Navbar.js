import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const authLinks = (
        <>
            <li><Link to="/characters">Meus Personagens</Link></li>
            <li><Link to="/characters/create">Criar Personagem</Link></li>
            <li>
                <span className="user-name">Olá, {user?.username}</span>
                <a href="#!" onClick={handleLogout}>Sair</a>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Cadastrar</Link></li>
        </>
    );

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo">
                    <Link to="/">Game Characters</Link>
                </h1>
                <ul className="nav-menu">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 