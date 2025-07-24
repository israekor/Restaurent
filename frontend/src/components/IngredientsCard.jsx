import React from 'react';
import { MdInventory } from 'react-icons/md';
import { GiWeight } from 'react-icons/gi';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

const IngredientsCard = ({ ingredient, onUpdate, onDelete }) => {
  const isLowStock = ingredient.stock < ingredient.seuil_alerte;

  return (
    <div
      className={`relative rounded-lg shadow-md p-4 transition duration-300 ${
        isLowStock ? 'bg-red-50' : 'bg-white hover:scale-[1.02]'
      }`}
    >
      {/* 🛠️ Boutons Modifier / Supprimer */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          title="Supprimer"
        >
          <FaTrash />
        </button>
      </div>

      {/* 🧾 Infos ingrédient */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          {isLowStock && (
            <BsExclamationCircleFill
              className="text-red-600"
              title="Stock faible"
            />
          )}
          <MdInventory className="text-orange-500" />
          {ingredient.nom}
        </h2>
      </div>

      <h2 className="flex items-center gap-2 font-bold text-gray-800">
        <GiWeight className="text-gray-600" />
        {ingredient.stock} kg
      </h2>

      <button
        onClick={onUpdate}
        className="text-sm px-3 py-1 mt-4 rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
      >
        ✏️ Modifier la quantité
      </button>
    </div>
  );
};

export default IngredientsCard;
