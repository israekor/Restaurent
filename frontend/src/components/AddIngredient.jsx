import React, { useState } from 'react';

const AddIngredient = ({ onClose, onConfirm }) => {
  const [nom, setNom] = useState('');
  const [stock, setQuantite] = useState(0);
  const [seuil_alerte, setSeuil] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIngredient = { nom, stock, seuil_alerte };
    onConfirm(newIngredient);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">➕ Nouvel ingrédient</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Nom de l'ingredient
            </label>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantite</label>
            <input
              type="number"
              min="0"
              placeholder="Quantité"
              value={stock}
              onChange={(e) => setQuantite(parseInt(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Seuil d'alerte</label>
            <input
              type="number"
              min="0"
              placeholder="Seuil alerte"
              value={seuil_alerte}
              onChange={(e) => setSeuil(parseInt(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIngredient;
