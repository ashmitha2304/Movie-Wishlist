import { useAppContext } from '../context/AppContext';

const MovieCard = ({ movie }) => {
  const { dispatch, favorites } = useAppContext();
  const isFavorite = favorites.includes(movie.id);

  return (
    <div data-testid="movie-card">
      <h3 data-testid="movie-name">{movie.name}</h3>
      <p>Year: <span data-testid="movie-year">{movie.year}</span></p>
      <p>Genre: <span data-testid="movie-genre">{movie.genre}</span></p>
      <p>Status: <span data-testid="movie-status">{movie.watched ? 'Watched' : 'Unwatched'}</span></p>
      <button onClick={() => dispatch({ type: 'TOGGLE_WATCHED', payload: movie.id })}>
        {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
      </button>
      <button onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: movie.id })}>
        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
      </button>
      <button onClick={() => dispatch({ type: 'DELETE_MOVIE', payload: movie.id })}>
        Delete
      </button>
    </div>
  );
};

export default MovieCard;