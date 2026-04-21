import { useAppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { data, favorites } = useAppContext();
  const favoriteMovies = data.filter((movie) => favorites.includes(movie.id));

  return (
    <main>
      <h1>Favorite Movies</h1>
      <p data-testid="favorites-count">Total Favorites: {favoriteMovies.length}</p>
      {favoriteMovies.length === 0
        ? <p>No favorites yet. Add from Home page!</p>
        : favoriteMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      }
    </main>
  );
};

export default Favorites;