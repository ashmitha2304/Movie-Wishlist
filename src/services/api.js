import axios from 'axios';

const BASE_URL = 'https://t4e-demotestserver.onrender.com/api';
const STUDENT_ID = 'E0323002';
const SET = 'setA';

const getToken = async (studentId, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    set,
  });
  return data;
};

const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.movies;
};

export const fetchMoviesData = async () => {
  try {
    const tokenData = await getToken(STUDENT_ID, SET);
    const movies = await getDataset(tokenData.token, tokenData.dataUrl);
    return movies;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};