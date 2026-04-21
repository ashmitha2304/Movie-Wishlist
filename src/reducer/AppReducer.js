const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };

    case 'ADD_MOVIE':
      return { ...state, data: [...state.data, action.payload] };

    case 'DELETE_MOVIE':
      return {
        ...state,
        data: state.data.filter((m) => m.id !== action.payload),
        favorites: state.favorites.filter((id) => id !== action.payload),
      };

    case 'TOGGLE_WATCHED':
      return {
        ...state,
        data: state.data.map((m) =>
          m.id === action.payload ? { ...m, watched: !m.watched } : m
        ),
      };

    case 'TOGGLE_FAVORITE':
      const isFav = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

export default AppReducer;