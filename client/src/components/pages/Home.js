import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bem-vindo ao Game Characters</h1>
        <p className="home-description">
          Um sistema de personalização de personagens onde você pode criar, personalizar e gerenciar 
          seus próprios personagens de jogo.
        </p>
        
        <div className="features">
          <div className="feature-item">
            <h3>Crie Personagens Únicos</h3>
            <p>Personalize atributos como força, inteligência, aparência e muito mais.</p>
          </div>
          
          <div className="feature-item">
            <h3>Gerencie Sua Coleção</h3>
            <p>Mantenha um registro de todos os seus personagens em um só lugar.</p>
          </div>
          
          <div className="feature-item">
            <h3>Segurança Garantida</h3>
            <p>Sistema de login e senha para manter seus personagens seguros.</p>
          </div>
        </div>
        
        {!isAuthenticated ? (
          <div className="home-buttons">
            <Link to="/register" className="btn btn-primary">Cadastre-se Agora</Link>
            <Link to="/login" className="btn">Fazer Login</Link>
          </div>
        ) : (
          <div className="home-buttons">
            <Link to="/characters" className="btn btn-primary">Meus Personagens</Link>
            <Link to="/characters/create" className="btn">Criar Novo Personagem</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 