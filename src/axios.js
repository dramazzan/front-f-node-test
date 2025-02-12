import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/account',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => localStorage.getItem('token');

const getUserData = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('Токен отсутствует!');

    const response = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (err) {
    console.error("Ошибка при получении данных пользователя:", err);
    throw err;
  }
};


const loginUser = async (login, password) => {
  try {
    const response = await api.post('/auth', { login, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const registerUser = async (user) => {
  try {
    const response = await api.post('/reg', user);
    return response.data;
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    throw err.response?.data || { message: "Registration failed" };
  }
};

const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/update/${id}`, user);
    return response.data;
  } catch (err) {
    throw err;
  }
};

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  getUserData
};
