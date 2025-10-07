import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import css from './App.module.css';
import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);
  
  const handleSearch = async (searchQuery: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);
      const results = await fetchMovies(searchQuery);
      setMovies(results);
      if (results.length === 0) {
       toast("No movies found for your request.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    };
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const openModal = (oneMovie: Movie) => {
    setChosenMovie(oneMovie);
  };
  
  const closeModal = () => {
    setChosenMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {chosenMovie !== null && <MovieModal onClose={closeModal} movie={chosenMovie} />}
    </div>
  )
};

export default App
