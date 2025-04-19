import { useState, useEffect } from 'react';
import { getGenres } from '../services/mangaService';

const GenreFilter = ({ selectedGenres, onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      // Remove duplicates and sort alphabetically
      const uniqueGenres = Array.from(new Map(data.map(genre => [genre.mal_id, genre])).values())
        .sort((a, b) => a.name.localeCompare(b.name));
      setGenres(uniqueGenres);
      setLoading(false);
    };
    fetchGenres();
  }, []);

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreSelect(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreSelect([...selectedGenres, genreId]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Filter by Genres</h3>
          {selectedGenres.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {selectedGenres.length} {selectedGenres.length === 1 ? 'genre' : 'genres'} selected
            </p>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className={`grid gap-2 transition-all duration-300 ${
        isExpanded ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {genres.slice(0, isExpanded ? genres.length : 8).map((genre) => (
          <button
            key={genre.mal_id}
            onClick={() => toggleGenre(genre.mal_id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedGenres.includes(genre.mal_id)
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {selectedGenres.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => onGenreSelect([])}
            className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreFilter; 