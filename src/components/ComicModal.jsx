import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import './ComicModal.css';
import relleno from '../Images/relleno.png';
import vacio from '../Images/vacio.png';

const ComicModal = ({ comic, onClose, onToggleFavorite, isFavorite }) => {
    const [characters, setCharacters] = useState([]);
    const publicKey = 'b2cd457e14a14d64111d1b983f7814d2';
    const privateKey = 'd9438918955a614e195d9d5f2d0c00669f23b1a9';

    useEffect(() => {
        const fetchCharacters = async () => {
            const ts = new Date().getTime().toString();
            const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

            try {
                const characterRequests = comic.characters.items.map(async (character) => {
                    const characterId = character.resourceURI.split('/').pop();
                    const response = await fetch(
                        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
                    );
                    if (!response.ok) throw new Error(`Error: ${response.status}`);
                    const data = await response.json();
                    return data.data.results[0];
                });
                const characterData = await Promise.all(characterRequests);
                setCharacters(characterData);
            } catch (error) {
                console.error('Error al obtener los personajes:', error);
            }
        };

        fetchCharacters();
    }, [comic]);

    if (!comic) return null;

    const handleFavoriteClick = () => {
        onToggleFavorite(comic.id);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <button className="favorite-button" onClick={handleFavoriteClick}>
                    <img src={isFavorite ? relleno : vacio} alt="Favorito" className="favorite-icon" />
                </button>
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className="comic-image" />
                <div className="modal-body">
                    <h2>{comic.title}</h2>
                    <p><strong>Descripción:</strong> {comic.description || "No disponible"}</p>
                    <p><strong>Personajes:</strong></p>
                    {characters.length > 0 ? (
                        characters.map(character => (
                            <div key={character.id} className="character-item">
                                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className="character-image" />
                                <span>{character.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>No hay personajes disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComicModal;
