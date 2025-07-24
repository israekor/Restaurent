import React, { useState } from 'react';

const UpdateQuantite = ({ ingredient, onClose, onConfirm }) => {
  const [stock, setStock] = useState(ingredient.stock);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(stock);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">✏️ Modifier quantité</h2>
        <p className="mb-2 text-gray-700 font-medium">{ingredient.nom}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuantite;
