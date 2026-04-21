import { createContext, useReducer, useContext } from 'react';
import AppReducer from '../reducer/AppReducer';

const initialState = {
  data: [],
  favorites: [],
  loading: false,
  error: null,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);