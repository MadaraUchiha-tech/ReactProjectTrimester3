import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-dark dark:bg-gray-900 shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              MangaWorld
            </Link>
          </div>
          
          {/* Mobile menu button*/}
          <div className="md:hidden flex items-center">
            <button
              className="text-white bg-primary/20 p-2 rounded-md focus:outline-none mr-14"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
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
          </div>

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
        {isMobile && (
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? 'max-h-60 opacity-100 pb-4 mb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-2 space-y-2 bg-gray-800 rounded-lg mt-2 mx-2">
              <Link
                to="/"
                className="block text-white hover:text-primary transition-colors p-5 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block text-white hover:text-primary transition-colors p-5 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/favorites"
                className="block text-white hover:text-primary transition-colors p-5 text-lg font-medium relative"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-primary text-white text-xs rounded-full w-5 h-5 animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 