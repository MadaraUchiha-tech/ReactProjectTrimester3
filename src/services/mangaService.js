import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Add delay to handle API rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTopManga = async (page = 1, limit = 24) => {
  try {
    const response = await axios.get(`${BASE_URL}/top/manga`, {
      params: {
        page,
        limit,
      },
    });
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
};

export const getMangaDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    return null;
  }
};

export const getGenres = async () => {
  try {
    await delay(1000); // Add delay to handle rate limiting
    const response = await axios.get(`${BASE_URL}/genres/manga`);
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    console.error('Error fetching manga by genres:', error);
    return [];
  }
}; 