import axios from 'axios';
import type { Movie } from '../types/movie';
const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface ResponseData {
  results: Movie[],
  total_pages: number
};

const options = {
  headers: {
    Authorization: `Bearer ${myToken}`,
    accept: 'application/json',
  }
};

export const fetchMovies = async (query: string, page: number): Promise<ResponseData> => {
    const response = await axios.get<ResponseData>(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
  return response.data;
};
      