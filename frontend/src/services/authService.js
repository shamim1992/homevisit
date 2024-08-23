import axios from 'axios';

const API_URL = 'http://localhost:5002/api/users/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export const authService = {
  register,
  login,
  logout,
};
