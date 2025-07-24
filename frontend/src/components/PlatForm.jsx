import React from 'react';
import { useState, useEffect } from 'react';

const PlatForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [statut, setStatut] = useState('disponible');

  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom || '');
      setPrix(initialData.prix || '');
      setDescription(initialData.description || '');
      setCategorie(initialData.categorie || '');
      setStatut(initialData.statut || 'disponible');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...(initialData?.id && { id: initialData.id }),
      nom,
      prix: parseFloat(prix),
      description,
      categorie,
      statut,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? 'Modifier le plat' : 'Ajouter un plat'}
      </h2>

      <div>
        <label className="block font-medium">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Prix (MAD)</label>
        <input
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Catégorie</label>
        <input
          type="text"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Statut</label>
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="disponible">Disponible</option>
          <option value="indisponible">Indisponible</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default PlatForm;
