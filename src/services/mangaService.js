import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Add delay to handle API rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter out adult content
const filterAdultContent = (mangaList) => {
  return mangaList.filter(manga => {
    // Filter out explicit content based on rating or genres
    const isAdult = manga.rating === 'rx' || 
                   manga.genres?.some(genre => 
                     genre.name.includes('Hentai') || 
                     genre.name.includes('Erotica') || 
                     genre.name.includes('Adult')
                   );
    return !isAdult;
  });
};

export const getTopManga = async (page = 1, limit = 24) => {
  try {
    const response = await axios.get(`${BASE_URL}/top/manga`, {
      params: {
        page,
        limit,
      },
    });
    return filterAdultContent(response.data.data);
  } catch (error) {
    console.error('Error fetching top manga:', error);
    return [];
  }
};

export const searchManga = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: { q: query },
    });
    return filterAdultContent(response.data.data);
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
};

export const getMangaDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${id}`);
    const manga = response.data.data;
    
    // If manga is adult content, return null
    const isAdult = manga.rating === 'rx' || 
                   manga.genres?.some(genre => 
                     genre.name.includes('Hentai') || 
                     genre.name.includes('Erotica') || 
                     genre.name.includes('Adult')
                   );
    if (isAdult) {
      return null;
    }
    
    return manga;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    return null;
  }
};

export const getGenres = async () => {
  try {
    await delay(1000); // Add delay to handle rate limiting
    const response = await axios.get(`${BASE_URL}/genres/manga`);
    
    // Filter out adult genres
    const filteredGenres = response.data.data.filter(genre => 
      !genre.name.includes('Hentai') && 
      !genre.name.includes('Erotica') && 
      !genre.name.includes('Adult')
    );
    
    return filteredGenres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const getMangaByGenres = async (genreIds, page = 1, limit = 24) => {
  try {
    await delay(1000); // Add delay to handle rate limiting
    const genreParam = genreIds.join(',');
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: {
        genres: genreParam,
        page,
        limit,
        order_by: 'popularity',
        sort: 'asc',
      },
    });
    return filterAdultContent(response.data.data);
  } catch (error) {
    console.error('Error fetching manga by genres:', error);
    return [];
  }
}; 