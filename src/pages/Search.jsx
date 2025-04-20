import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchManga } from '../services/mangaService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const manga = await searchManga(query);
      setResults(manga);
      if (manga.length === 0) {
        setError('No results found. Adult content is filtered out by default.');
      }
    } catch (err) {
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">Search Manga</h1>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for manga..."
                className="w-full p-4 pr-12 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                <svg
                  className="w-6 h-6"
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
              </button>
            </div>
            {error && (
              <p className="text-red-500 mt-2 text-center">{error}</p>
            )}
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((manga) => (
              <Link
                key={manga.mal_id}
                to={`/manga/${manga.mal_id}`}
                className="card bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-300 transform hover:-translate-y-1"
              >
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
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{manga.status}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{manga.synopsis}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              {query 
                ? 'No results found. Adult content is filtered out by default.' 
                : 'Enter a search term to find manga.'}
            </p>
            {query && (
              <p className="text-gray-500 dark:text-gray-500 text-md">
                Try a different search term.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 