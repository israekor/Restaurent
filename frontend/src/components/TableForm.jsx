import { useState } from 'react';

const TableForm = ({ salleId, onSubmit }) => {
  const [numero, setNumero] = useState('');
  const [capacite, setCapacite] = useState('');
  const [statut, setStatut] = useState('libre');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numero || !capacite || !statut) return;
    onSubmit({
      numero: parseInt(numero),
      capacite: parseInt(capacite),
      statut,
      salle_id: salleId,
    });
    setNumero('');
    setCapacite('');
    setStatut('libre');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-gray-50 p-4 rounded-lg shadow mt-4"
    >
      <h3 className="text-lg font-semibold">➕ Nouvelle table</h3>
      <input
        type="number"
        placeholder="Numéro"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Capacité"
        value={capacite}
        onChange={(e) => setCapacite(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <select
        value={statut}
        onChange={(e) => setStatut(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="libre">Libre</option>
        <option value="occupée">Occupée</option>
        <option value="réservée">Réservée</option>
      </select>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
      >
        Ajouter
      </button>
    </form>
  );
};

export default TableForm;
