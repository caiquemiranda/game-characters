import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verificar se o usuário está logado ao carregar
    useEffect(() => {
        const checkUser = async () => {
            if (localStorage.getItem('token')) {
                setAuthToken(localStorage.getItem('token'));
                try {
                    const res = await axios.get('/api/auth/me');
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                } catch (err) {
                    localStorage.removeItem('token');
                    setError(err.response?.data?.message || 'Erro ao autenticar usuário');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    // Configurar token no cabeçalho
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    // Registrar usuário
    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);

            setUser(res.data.user);
            setIsAuthenticated(true);
            setLoading(false);
            setError(null);

            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao registrar usuário');
            return { success: false, message: err.response?.data?.message || 'Erro ao registrar usuário' };
        }
    };

    // Login de usuário
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);

            setUser(res.data.user);
            setIsAuthenticated(true);
            setLoading(false);
            setError(null);

            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciais inválidas');
            return { success: false, message: err.response?.data?.message || 'Credenciais inválidas' };
        }
    };

    // Logout de usuário
    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                error,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 