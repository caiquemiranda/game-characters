import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CharacterList from './components/characters/CharacterList';
import CharacterCreate from './components/characters/CharacterCreate';
import CharacterEdit from './components/characters/CharacterEdit';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/pages/NotFound';

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/characters"
                        element={
                            <PrivateRoute>
                                <CharacterList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/characters/create"
                        element={
                            <PrivateRoute>
                                <CharacterCreate />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/characters/edit/:id"
                        element={
                            <PrivateRoute>
                                <CharacterEdit />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <ToastContainer />
        </>
    );
}

export default App; 