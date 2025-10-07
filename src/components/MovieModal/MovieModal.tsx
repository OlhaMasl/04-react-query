import { useEffect } from 'react';
import css from './MovieModal.module.css'
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
    onClose: () => void,
    movie: Movie,
};

const MovieModal = ({ onClose, movie }: MovieModalProps) => {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = "hidden";

        return () => {
          document.removeEventListener('keydown', handleKeyDown); 
          document.body.style.overflow = "";
        }
    }, [onClose]);

    return createPortal (<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
  <div className={css.modal}>
    <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt={movie.title}
      className={css.image}
    />
    <div className={css.content}>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
      <p>
                    <strong>{`Release Date: ${movie.release_date}`}</strong>
      </p>
      <p>
        <strong>{`Rating: ${movie.vote_average}`}</strong>
      </p>
    </div>
  </div>
</div>, document.getElementById('movie-modal')!
)
 };
export default MovieModal;