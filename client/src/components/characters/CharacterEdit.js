import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Character.css';

const CharacterEdit = () => {
    const [formData, setFormData] = useState({
        name: '',
        strength: 5,
        intelligence: 5,
        skin_color: 'natural',
        hair_color: 'black',
        hair_style: 'normal'
    });

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    // Buscar dados do personagem ao carregar
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await axios.get(`/api/characters/${id}`);
                setFormData({
                    name: res.data.character.name,
                    strength: res.data.character.strength,
                    intelligence: res.data.character.intelligence,
                    skin_color: res.data.character.skin_color,
                    hair_color: res.data.character.hair_color,
                    hair_style: res.data.character.hair_style
                });
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar personagem:', error);
                toast.error('Erro ao carregar dados do personagem');
                navigate('/characters');
            }
        };

        fetchCharacter();
    }, [id, navigate]);

    const { name, strength, intelligence, skin_color, hair_color, hair_style } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/characters/${id}`, formData);
            toast.success('Personagem atualizado com sucesso!');
            navigate('/characters');
        } catch (error) {
            console.error('Erro ao atualizar personagem:', error);
            toast.error(error.response?.data?.message || 'Erro ao atualizar personagem');
        }
    };

    if (loading) {
        return <div className="loading">Carregando dados do personagem...</div>;
    }

    return (
        <div className="character-form-container">
            <h2>Editar Personagem</h2>

            <form onSubmit={onSubmit} className="character-form">
                <div className="form-group">
                    <label htmlFor="name">Nome do Personagem</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="attribute-group">
                    <h3>Atributos</h3>

                    <div className="form-group">
                        <label htmlFor="strength">Força ({strength})</label>
                        <input
                            type="range"
                            id="strength"
                            name="strength"
                            min="1"
                            max="10"
                            value={strength}
                            onChange={onChange}
                            className="form-control-range"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="intelligence">Inteligência ({intelligence})</label>
                        <input
                            type="range"
                            id="intelligence"
                            name="intelligence"
                            min="1"
                            max="10"
                            value={intelligence}
                            onChange={onChange}
                            className="form-control-range"
                        />
                    </div>
                </div>

                <div className="appearance-group">
                    <h3>Aparência</h3>

                    <div className="form-group">
                        <label htmlFor="skin_color">Cor da Pele</label>
                        <select
                            id="skin_color"
                            name="skin_color"
                            value={skin_color}
                            onChange={onChange}
                            className="form-control"
                        >
                            <option value="natural">Natural</option>
                            <option value="pale">Pálida</option>
                            <option value="tan">Bronzeada</option>
                            <option value="brown">Morena</option>
                            <option value="dark">Escura</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hair_color">Cor do Cabelo</label>
                        <select
                            id="hair_color"
                            name="hair_color"
                            value={hair_color}
                            onChange={onChange}
                            className="form-control"
                        >
                            <option value="black">Preto</option>
                            <option value="brown">Castanho</option>
                            <option value="blonde">Loiro</option>
                            <option value="red">Ruivo</option>
                            <option value="white">Branco</option>
                            <option value="gray">Grisalho</option>
                            <option value="blue">Azul</option>
                            <option value="green">Verde</option>
                            <option value="purple">Roxo</option>
                            <option value="pink">Rosa</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hair_style">Estilo do Cabelo</label>
                        <select
                            id="hair_style"
                            name="hair_style"
                            value={hair_style}
                            onChange={onChange}
                            className="form-control"
                        >
                            <option value="normal">Normal</option>
                            <option value="curly">Cacheado</option>
                            <option value="wavy">Ondulado</option>
                            <option value="straight">Liso</option>
                            <option value="mohawk">Moicano</option>
                            <option value="ponytail">Rabo de Cavalo</option>
                            <option value="bald">Careca</option>
                            <option value="braided">Trançado</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-success">Atualizar Personagem</button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigate('/characters')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharacterEdit; 