import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await login({ username, password });

        if (result.success) {
            toast.success('Login bem-sucedido!');
            navigate('/characters');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            minLength="6"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>
                <p className="auth-link">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 