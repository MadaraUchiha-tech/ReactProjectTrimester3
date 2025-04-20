import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

const Navigation = () => {
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
       'bg-dark/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg' 
     `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            MangaWorld
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="nav-link text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/search" className="nav-link text-white hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/favorites" className="nav-link text-white hover:text-primary transition-colors relative">
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            <Link
              to="/"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              to="/favorites"
              className="block text-white hover:text-primary transition-colors relative inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 