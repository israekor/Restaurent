import React from 'react';

const CommandeDetails = ({ commande, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">🧾 Détails Commande</h2>

        <p>
          <strong>Table :</strong>{' '}
          {commande.table?.numero || commande.restaurent_table_id}
        </p>
        <p>
          <strong>Statut :</strong> {commande.statut}
        </p>

        <h3 className="mt-4 font-semibold">Plats :</h3>
        <ul className="list-disc list-inside">
          {commande.lignes_commande?.map((ligne, i) => (
            <li key={i}>
              {ligne.plat?.nom || `Plat ID ${ligne.plat_id}`} — {ligne.quantite}
            </li>
          ))}
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandeDetails;
