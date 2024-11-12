import React, { useState } from 'react';
import Navbar from './components/NavBar';
import ComicsList from './components/ComicsList';
import './App.css';

function App() {
    const [showFavorites, setShowFavorites] = useState(false);

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    return (
        <div className="App">
            <Navbar onToggleFavorites={toggleFavorites} showFavorites={showFavorites} />
            <ComicsList showFavorites={showFavorites} />
        </div>
    );
}

export default App;
