import React, { useState, useEffect } from 'react';

const AddCommandeModal = ({ onClose, onCreate }) => {
  const [plats, setPlats] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [lignesCommande, setLignesCommande] = useState([]);

  // Simule l’appel API
  useEffect(() => {
    // Replace with API calls later
    setPlats([
      { id: 1, nom: 'Tajine' },
      { id: 2, nom: 'Couscous' },
      { id: 3, nom: 'Pastilla' },
    ]);
    setTables([
      { id: 1, numero: 1 },
      { id: 2, numero: 2 },
    ]);
  }, []);

  const handleAddLigne = (platId, quantite) => {
    const updated = [...lignesCommande];
    const index = updated.findIndex((l) => l.plat_id === platId);
    if (index >= 0) {
      updated[index].quantite = quantite;
    } else {
      updated.push({ plat_id: platId, quantite });
    }
    setLignesCommande(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTable || lignesCommande.length === 0) return;
    onCreate({
      restaurent_table_id: selectedTable,
      lignes_commande: lignesCommande,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">➕ Nouvelle Commande</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Table</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              required
            >
              <option value="">-- Choisir une table --</option>
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  Table {t.numero}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Plats</label>
            {plats.map((plat) => (
              <div
                key={plat.id}
                className="flex items-center justify-between mb-2"
              >
                <span>{plat.nom}</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Quantité"
                  className="w-20 border px-2 py-1 rounded"
                  onChange={(e) =>
                    handleAddLigne(plat.id, parseInt(e.target.value))
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommandeModal;
