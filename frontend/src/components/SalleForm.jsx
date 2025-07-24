import { useState } from 'react';

const SalleForm = ({ onSubmit }) => {
  const [nom, setNom] = useState('');
  const [etage, setEtage] = useState('');
  const [capacite, setCapacite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom || !etage || !capacite) return;
    onSubmit({ nom, etage: parseInt(etage), capacite: parseInt(capacite) });
    setNom('');
    setEtage('');
    setCapacite('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-gray-50 p-4 rounded-lg shadow"
    >
      <h3 className="text-lg font-semibold">➕ Nouvelle salle</h3>
      <input
        type="text"
        placeholder="Nom de la salle"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Étage"
        value={etage}
        onChange={(e) => setEtage(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Capacité"
        value={capacite}
        onChange={(e) => setCapacite(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
      >
        Ajouter
      </button>
    </form>
  );
};

export default SalleForm;
