import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">No Favorites Yet</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't added any manga to your favorites yet. Start exploring and add your favorite manga to this list!
          </p>
          <Link
            to="/search"
            className="btn btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Manga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((manga) => (
            <div key={manga.mal_id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Link to={`/manga/${manga.mal_id}`}>
                <div className="relative">
                  <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{manga.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-semibold">Score: {manga.score}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{manga.status}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{manga.synopsis}</p>
                </div>
              </Link>
              <div className="p-4 border-t">
                <button
                  onClick={() => removeFavorite(manga.mal_id)}
                  className="btn btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites; 