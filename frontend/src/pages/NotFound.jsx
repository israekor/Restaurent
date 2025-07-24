import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oups ! Cette page n'existe pas.
        </h2>
        <p className="text-gray-600 mb-6">
          La page que vous recherchez est introuvable. Elle a peut-être été
          déplacée ou supprimée.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FaArrowLeft className="mr-2" />
          Retour
        </button>
      </div>
    </div>
  );
};

export default NotFound;
