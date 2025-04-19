import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopManga, getMangaByGenres } from '../services/mangaService';
import GenreFilter from '../components/GenreFilter';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [allManga, setAllManga] = useState([]);
  const [displayedManga, setDisplayedManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchManga();
  }, [selectedGenres]);

  const fetchManga = async () => {
    setLoading(true);
    setError(null);
    try {
      let manga;
      if (selectedGenres.length > 0) {
        setIsFiltering(true);
        manga = await getMangaByGenres(selectedGenres);
      } else {
        setIsFiltering(false);
        manga = await getTopManga();
      }
      
      setAllManga(manga);
      setDisplayedManga(manga.slice(0, ITEMS_PER_PAGE));
      setHasMore(manga.length > ITEMS_PER_PAGE);
      setPage(1);
    } catch (error) {
      console.error('Error fetching manga:', error);
      setError('Failed to load manga. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    setTimeout(() => {
      setDisplayedManga(prevManga => [...prevManga, ...allManga.slice(startIndex, endIndex)]);
      setPage(nextPage);
      setHasMore(endIndex < allManga.length);
      setLoadingMore(false);
    }, 500);
  };

  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button onClick={fetchManga} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="text-5xl font-bold mb-6">Welcome to MangaWorld</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Discover and explore your favorite manga series. Browse through our collection,
            search for specific titles, and keep track of your favorites.
          </p>
          <Link
            to="/search"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Start Exploring
          </Link>
        </div>
      </div>

      {/* Featured Manga Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold">
            {isFiltering ? 'Filtered Manga' : 'Featured Manga'}
          </h2>
          {isFiltering && allManga.length > 0 && (
            <p className="text-gray-600">
              Found {allManga.length} manga matching your filters
            </p>
          )}
        </div>

        <GenreFilter
          selectedGenres={selectedGenres}
          onGenreSelect={handleGenreSelect}
        />

        {displayedManga.length > 0 ? (
          <>
            <div className="manga-grid">
              {displayedManga.map((manga) => (
                <Link
                  key={manga.mal_id}
                  to={`/manga/${manga.mal_id}`}
                  className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={manga.images.jpg.image_url}
                      alt={manga.title}
                      className="manga-card-image"
                    />
                    <div className="manga-card-overlay">
                      <div className="manga-card-content">
                        <h3 className="text-xl font-bold mb-2">{manga.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary/90 px-2 py-1 rounded text-sm">
                            Score: {manga.score || 'N/A'}
                          </span>
                          <span className="bg-secondary/90 px-2 py-1 rounded text-sm">
                            {manga.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 line-clamp-2">
                          {manga.synopsis || 'No synopsis available.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Section */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="btn btn-primary px-8 py-3 flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      Load More
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No manga found matching your filters</p>
            <button
              onClick={() => setSelectedGenres([])}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 