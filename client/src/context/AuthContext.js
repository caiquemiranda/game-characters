import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configuração global do Axios com timeout maior
axios.defaults.timeout = 30000; // 30 segundos

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API base URL - vamos usar o proxy do React que está configurado em setupProxy.js
    const apiUrl = '/api';

    // Log da URL da API em uso
    console.log('AuthContext - API URL em uso:', apiUrl);

    // Verificar se o usuário está logado ao carregar
    useEffect(() => {
        const checkUser = async () => {
            if (localStorage.getItem('token')) {
                setAuthToken(localStorage.getItem('token'));
                try {
                    console.log('Verificando autenticação do usuário...');
                    const res = await axios.get(`${apiUrl}/auth/me`);
                    console.log('Resposta da API:', res.data);
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('Erro na autenticação:', err.message);
                    localStorage.removeItem('token');
                    setError(err.response?.data?.message || 'Erro ao autenticar usuário');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, [apiUrl]);

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
            console.log('Enviando requisição de registro para:', `${apiUrl}/auth/register`);
            console.log('Dados de registro:', formData);

            // Adicione um cabeçalho Accept explícito para garantir que o servidor retorne JSON
            const res = await axios.post(`${apiUrl}/auth/register`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log('Resposta do registro:', res.data);

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);

            setUser(res.data.user);
            setIsAuthenticated(true);
            setLoading(false);
            setError(null);

            return { success: true };
        } catch (err) {
            console.error('Erro no registro:', err);
            // Log detalhado do erro
            if (err.response) {
                console.error('Resposta do servidor:', err.response.data);
                console.error('Status HTTP:', err.response.status);
            } else if (err.request) {
                console.error('Requisição enviada mas sem resposta do servidor');
            }

            const errorMsg = err.response?.data?.message || 'Erro ao registrar usuário. Verifique a conexão com o servidor.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        }
    };

    // Login de usuário
    const login = async (formData) => {
        try {
            console.log('Enviando requisição de login para:', `${apiUrl}/auth/login`);
            console.log('Dados de login:', { username: formData.username, senha: '*****' });

            // Adicione um cabeçalho Accept explícito para garantir que o servidor retorne JSON
            const res = await axios.post(`${apiUrl}/auth/login`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log('Resposta do login:', res.data);

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);

            setUser(res.data.user);
            setIsAuthenticated(true);
            setLoading(false);
            setError(null);

            return { success: true };
        } catch (err) {
            console.error('Erro no login:', err);
            // Log detalhado do erro
            if (err.response) {
                console.error('Resposta do servidor:', err.response.data);
                console.error('Status HTTP:', err.response.status);
            } else if (err.request) {
                console.error('Requisição enviada mas sem resposta do servidor');
            }

            const errorMsg = err.response?.data?.message || 'Credenciais inválidas ou problema de conexão com o servidor.';
            setError(errorMsg);
            return { success: false, message: errorMsg };
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