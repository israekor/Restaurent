import React from 'react';

const MenuCard = ({ nom, prix, available }) => {
  return (
    <div
      className={`relative rounded-lg shadow-md p-4 transition duration-300 ${
        available ? 'bg-white hover:scale-[1.02]' : 'bg-gray-100 opacity-60'
      }`}
    >
      <h2 className="text-xl font-bold text-gray-800">{nom}</h2>
      <p className="text-md text-gray-600 mt-2">{prix} MAD</p>

      <div className="mt-4 flex items-center">
        <span
          className={`mr-3 font-medium ${
            available ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {available ? 'Disponible' : 'Indisponible'}
        </span>

        <button
          role="switch"
          aria-checked={available}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
            available ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              available ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
