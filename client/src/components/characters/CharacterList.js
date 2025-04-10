import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Character.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscar personagens ao carregar o componente
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await axios.get('/api/characters');
                setCharacters(res.data.characters);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar personagens:', error);
                toast.error('Erro ao carregar personagens');
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    // Função para excluir personagem
    const deleteCharacter = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
            try {
                await axios.delete(`/api/characters/${id}`);
                setCharacters(characters.filter(character => character.id !== id));
                toast.success('Personagem excluído com sucesso');
            } catch (error) {
                console.error('Erro ao excluir personagem:', error);
                toast.error('Erro ao excluir personagem');
            }
        }
    };

    if (loading) {
        return <div className="loading">Carregando personagens...</div>;
    }

    return (
        <div className="character-list-container">
            <div className="character-list-header">
                <h2>Meus Personagens</h2>
                <Link to="/characters/create" className="btn btn-primary">
                    Criar Novo Personagem
                </Link>
            </div>

            {characters.length === 0 ? (
                <div className="no-characters">
                    <p>Você ainda não tem personagens. Crie seu primeiro personagem!</p>
                </div>
            ) : (
                <div className="character-grid">
                    {characters.map(character => (
                        <div key={character.id} className="character-card">
                            <div className="character-info">
                                <h3>{character.name}</h3>
                                <div className="character-attributes">
                                    <p><strong>Força:</strong> {character.strength}</p>
                                    <p><strong>Inteligência:</strong> {character.intelligence}</p>
                                    <p><strong>Cor da Pele:</strong> {character.skin_color}</p>
                                    <p><strong>Cor do Cabelo:</strong> {character.hair_color}</p>
                                    <p><strong>Estilo do Cabelo:</strong> {character.hair_style}</p>
                                </div>
                            </div>
                            <div className="character-actions">
                                <Link to={`/characters/edit/${character.id}`} className="btn btn-success">
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCharacter(character.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CharacterList; 