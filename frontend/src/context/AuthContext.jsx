import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
// import { secureGet, securePost } from '../api/secureApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Login avec Sanctum
  const login = async (credentials) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      await api.post('/login', credentials);
      const response = await api.get('/user');
      setUser(response.data);
      console.log('User connecté', response.data);
    } catch (err) {
      console.error('Erreur de login', err);
    }
  };

  // 🔓 Logout
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erreur de logout', error);
    } finally {
      localStorage.removeItem('token'); // ⚠️ seulement si utilisé
      setUser(null);
      navigate('/login'); // ✅ redirection ici
    }
  };

  // 🧠 Récupérer l'utilisateur au chargement initial
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        console.log('User récupéré', response.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
