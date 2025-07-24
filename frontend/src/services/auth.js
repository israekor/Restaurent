// src/services/auth.js
import api from '../api/axios';
import axios from 'axios';

export const loginWithSanctum = async (email, password) => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
  const res = await api.post('/login', { email, password });
  return res.data;
};
