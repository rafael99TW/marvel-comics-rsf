import React from 'react';
import './ComicCard.css';

function ComicCard({ comic, onClick }) {
    const thumbnail = comic.thumbnail 
        ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` 
        : "https://http2.mlstatic.com/D_NQ_NP_2X_942761-MLC31876373866_082019-F.webp";

    return (
        <div className="comic-card" onClick={onClick}>
            <img src={thumbnail} alt="Comic" className="comic-image" />
        </div>
    );
}

export default ComicCard;
