import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Stats = () => {
  const { data, favorites } = useAppContext();

  const totalMovies = data.length;
  const watchedMovies = data.filter((m) => m.watched);
  const unwatchedMovies = data.filter((m) => !m.watched);
  const favoriteMovies = data.filter((m) => favorites.includes(m.id));
  const moviesByGenre = data.reduce((acc, movie) => {
    const genre = movie.genre || 'Unknown';
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    window.appState = { totalMovies, watchedCount: watchedMovies.length, unwatchedCount: unwatchedMovies.length, favoritesCount: favoriteMovies.length, moviesByGenre, allMovies: data };
  }, [data, favorites]);

  return (
    <main>
      <h1>Stats Dashboard</h1>
      <section>
        <h2>Overview</h2>
        <p>Total Movies: <strong data-testid="total-movies">{totalMovies}</strong></p>
        <p>Watched: <strong data-testid="watched-count">{watchedMovies.length}</strong></p>
        <p>Unwatched: <strong data-testid="unwatched-count">{unwatchedMovies.length}</strong></p>
        <p>Favorites: <strong data-testid="favorites-count">{favoriteMovies.length}</strong></p>
      </section>
      <section>
        <h2>Movies by Genre</h2>
        {Object.keys(moviesByGenre).length === 0 ? <p>No data</p> :
          <ul data-testid="genre-breakdown">
            {Object.entries(moviesByGenre).map(([genre, count]) => (
              <li key={genre} data-testid={`genre-${genre.toLowerCase()}`}>{genre}: {count}</li>
            ))}
          </ul>
        }
      </section>
      <section>
        <h2>Watched List</h2>
        {watchedMovies.length === 0 ? <p>No watched movies</p> :
          <ul data-testid="watched-list">
            {watchedMovies.map((m) => <li key={m.id}>{m.name} ({m.year})</li>)}
          </ul>
        }
      </section>
    </main>
  );
};

export default Stats;