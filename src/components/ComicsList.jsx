import React, { useEffect, useState } from 'react';
import ComicCard from './ComicCard';
import ComicModal from './ComicModal';
import CryptoJS from 'crypto-js';
import './ComicsList.css';

function ComicsList({ showFavorites }) {
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    const obtenerDatos = async () => {
        const publicKey = 'b2cd457e14a14d64111d1b983f7814d2';
        const privateKey = 'd9438918955a614e195d9d5f2d0c00669f23b1a9';
        const ts = new Date().getTime().toString();
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    
        const url = `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setComics(data.data.results);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

    const toggleFavorite = (comicId) => {
        const updatedFavorites = favorites.includes(comicId)
            ? favorites.filter(id => id !== comicId)
            : [...favorites, comicId];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const comicsToShow = showFavorites
        ? comics.filter(comic => favorites.includes(comic.id))
        : comics;

    return (
        <div className="comics-list">
            {comicsToShow.map((comic) => (
                <ComicCard 
                    key={comic.id} 
                    comic={comic} 
                    onClick={() => setSelectedComic(comic)} 
                />
            ))}
            {selectedComic && (
                <ComicModal 
                    comic={selectedComic} 
                    onClose={() => setSelectedComic(null)} 
                    onToggleFavorite={() => toggleFavorite(selectedComic.id)}
                    isFavorite={favorites.includes(selectedComic.id)}
                />
            )}
        </div>
    );
}

export default ComicsList;
