import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { data, loading, error, dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.match(/^[a-zA-Z\s]+$/)) newErrors.name = 'Movie name must contain letters only';
    if (!year.match(/^\d{4}$/)) newErrors.year = 'Year must be exactly 4 digits';
    if (!genre.trim()) newErrors.genre = 'Genre is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    dispatch({ type: 'ADD_MOVIE', payload: { id: Date.now(), name: name.trim(), year: year.trim(), genre: genre.trim(), watched: false } });
    setName(''); setYear(''); setGenre(''); setErrors({});
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Movie Wishlist</h1>
      <section>
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Movie Name</label><br />
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }} placeholder="Letters only" />
            {errors.name && <p data-testid="name-error">{errors.name}</p>}
          </div>
          <div>
            <label>Year</label><br />
            <input type="text" value={year} onChange={(e) => { setYear(e.target.value); setErrors(p => ({ ...p, year: '' })); }} placeholder="e.g. 2023" maxLength={4} />
            {errors.year && <p data-testid="year-error">{errors.year}</p>}
          </div>
          <div>
            <label>Genre</label><br />
            <input type="text" value={genre} onChange={(e) => { setGenre(e.target.value); setErrors(p => ({ ...p, genre: '' })); }} placeholder="e.g. Action" />
            {errors.genre && <p data-testid="genre-error">{errors.genre}</p>}
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </section>
      <section>
        <h2>All Movies ({data.length})</h2>
        {data.length === 0 ? <p>No movies yet!</p> : data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </section>
    </main>
  );
};

export default Home;