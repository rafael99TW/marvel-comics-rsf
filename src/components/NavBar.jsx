import './NavBar.css';

function NavBar({ onToggleFavorites, showFavorites }) {
    return (
        <nav className="navbar">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" 
                alt="Marvel Logo" 
                className="navbar-logo" 
            />
            <button 
                className={`navbar-favorites ${showFavorites ? 'active' : ''}`} 
                onClick={onToggleFavorites}
            >
                Favoritos
            </button>
        </nav>
    );
}

export default NavBar;
