import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { fetchMovies } from '../../services/movieService';
import { useQuery, keepPreviousData} from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

function App() {

  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] =useState(1)
  const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', title, currentPage],
    queryFn: () => fetchMovies(title, currentPage),
    enabled: title.trim().length > 0,
    placeholderData: keepPreviousData
  });

  const handleSearch = async (searchQuery: string) => {
    setTitle(searchQuery);
    setCurrentPage(1);
  };
   useEffect(() => {
        if (isSuccess && data?.results.length === 0 ) {
     toast("No movies found for your request.", {
        duration: 3000,
        position: "top-center",
      })
  };
    }, [isSuccess, data]);
  
  const openModal = (oneMovie: Movie) => {
    setChosenMovie(oneMovie);
  };
  
  const closeModal = () => {
    setChosenMovie(null);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />}
      {data && data.results.length > 0 && <MovieGrid movies={data.results} onSelect={openModal} />} 
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {chosenMovie !== null && <MovieModal onClose={closeModal} movie={chosenMovie} />}
    </div>
  )
};

export default App
