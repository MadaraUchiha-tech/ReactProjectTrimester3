import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMangaDetails } from '../services/mangaService';
import { useFavorites } from '../context/FavoritesContext';

const MangaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const data = await getMangaDetails(id);
        if (!data) {
          setError('This content is not available due to content restrictions.');
          // Auto-redirect after 3 seconds
          setTimeout(() => navigate('/'), 3000);
        } else {
          setManga(data);
        }
      } catch (error) {
        console.error('Error fetching manga details:', error);
        setError('Error loading manga details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id, navigate]);

  const handleFavoriteToggle = () => {
    if (isFavorite(manga.mal_id)) {
      removeFavorite(manga.mal_id);
    } else {
      addFavorite(manga);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 px-4 pt-16">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{error}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Redirecting to home page...</p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Go back home
        </button>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 px-4 pt-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Manga not found</h1>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 py-8 pt-16">
      <div className="container mx-auto px-4">
        {/* Mobile view - stack vertically */}
        {isMobile ? (
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-2">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{manga.title}</h1>
              <img
                src={manga.images.jpg.large_image_url}
                alt={manga.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-xl mb-4"
              />
              <button
                onClick={handleFavoriteToggle}
                className={`btn w-full mt-2 mb-6 ${
                  isFavorite(manga.mal_id) ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {isFavorite(manga.mal_id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Score</h3>
                  <p className="text-xl font-bold text-primary">{manga.score || 'N/A'}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Status</h3>
                  <p className="text-xl font-bold text-primary">{manga.status}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Chapters</h3>
                  <p className="text-xl font-bold text-primary">{manga.chapters || 'N/A'}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Volumes</h3>
                  <p className="text-xl font-bold text-primary">{manga.volumes || 'N/A'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Synopsis</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{manga.synopsis}</p>
              </div>
              
              {manga.genres && manga.genres.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop view with sticky sidebar
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="sticky top-24">
              <img
                src={manga.images.jpg.large_image_url}
                alt={manga.title}
                className="w-full rounded-lg shadow-xl"
              />
              <button
                onClick={handleFavoriteToggle}
                className={`btn w-full mt-4 ${
                  isFavorite(manga.mal_id) ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {isFavorite(manga.mal_id) ? (
                  <span className="flex items-center justify-center gap-2">
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
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Add to Favorites
                  </span>
                )}
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{manga.title}</h1>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Score</h3>
                  <p className="text-2xl font-bold text-primary">{manga.score || 'N/A'}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Status</h3>
                  <p className="text-2xl font-bold text-primary">{manga.status}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Chapters</h3>
                  <p className="text-2xl font-bold text-primary">{manga.chapters || 'N/A'}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Volumes</h3>
                  <p className="text-2xl font-bold text-primary">{manga.volumes || 'N/A'}</p>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Synopsis</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{manga.synopsis}</p>
              </div>
              {manga.genres && manga.genres.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaDetail; 