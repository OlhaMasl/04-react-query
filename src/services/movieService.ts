import axios from 'axios';
import type { Movie } from '../types/movie';
const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface ResponseData {
  results:  Movie[],
};

const options = {
  headers: {
    Authorization: `Bearer ${myToken}`,
    accept: 'application/json',
  }
};

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const { data: { results } } = await axios.get<ResponseData>(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
    return results;
};
      