import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/image1.png';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import ResetSessionButton from '../components/ResetSessionButton';

import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import api from '../api/axios';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const testCookie = async () => {
      try {
        const res = await api.get('/debug-cookie');
        console.log('Réponse debug-cookie:', res.data);
      } catch (err) {
        console.error('Erreur debug-cookie:', err);
      }
    };

    testCookie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      const res = await api.get('/user');
      const data = await res.data;

      console.log('Réponse complète:', res);

      switch (data.role) {
        case 'responsable':
          navigate('/responsable/menu');
          break;
        case 'serveur':
          navigate('/serveur/menu');
          break;
        case 'chef':
          navigate('/chef/menu');
          break;
        case 'receptionniste':
          navigate('/reception/tables');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error('Erreur Axios:', err.response?.data || err.message);
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex items-center justify-center px-4`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" bg-[#121212]/90 p-8 rounded-xl shadow-2xl backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Bienvenue au Resto
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Adresse Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-[#2C2C2C]  bg-[#1E1E1E] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Mot de Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-[#2C2C2C] bg-[#1E1E1E] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-600 font-semibold text-white py-2 rounded-lg transition-all shadow-md ${
              isLoading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-orange-700'
            }`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
      <ResetSessionButton className="fixed bottom-6 right-6 z-50" />
    </div>
  );
};

export default LoginPage;
