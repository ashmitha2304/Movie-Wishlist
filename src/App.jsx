import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { fetchMoviesData } from './services/api';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';

const AppContent = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const movies = await fetchMoviesData();
        dispatch({ type: 'SET_DATA', payload: movies });
      } catch (err) {
        dispatch({
          type: 'SET_ERROR',
          payload: err.message || 'Failed to load data',
        });
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;