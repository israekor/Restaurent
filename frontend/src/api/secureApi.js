// src/api/secureApi.js
import api from './axios';

const getCsrfToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

// 🔐 Assure que le cookie CSRF est bien installé
const ensureCsrfToken = async () => {
  await api.get('/sanctum/csrf-cookie');
};

// ✅ Requêtes sécurisées
export const secureGet = async (url, params = {}) => {
  await ensureCsrfToken();
  return api.get(url, { params });
};

export const securePost = async (url, data) => {
  await ensureCsrfToken();
  const csrfToken = getCsrfToken();

  return api.post(url, data, {
    headers: {
      'X-XSRF-TOKEN': csrfToken, // ✅ Ajout explicite du token
    },
  });
};

export const securePut = async (url, data) => {
  await ensureCsrfToken();
  return api.put(url, data);
};

export const secureDelete = async (url) => {
  await ensureCsrfToken();
  return api.delete(url);
};
