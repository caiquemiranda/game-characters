import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = formData;
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }

        const result = await register({ username, email, password });

        if (result.success) {
            toast.success('Cadastro realizado com sucesso!');
            navigate('/characters');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Cadastro</h2>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            minLength="6"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
                <p className="auth-link">
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register; 