import React from 'react';

const CommandeCardChef = ({ commande, onUpdateStatut, onView }) => {
  const statuts = ['en attente', 'en cours', 'terminée'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition hover:scale-[1.02]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          🪑 Table {commande.restaurent_table_id}
        </h2>
        <button
          className="text-sm px-3 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200"
          onClick={() => onView(commande)}
        >
          Détails
        </button>
      </div>

      <div className="flex gap-2">
        {statuts.map((statut) => (
          <button
            key={statut}
            onClick={() => onUpdateStatut(commande.id, statut)}
            className={`px-3 py-1 rounded font-medium border transition ${
              commande.statut === statut
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {statut === 'en attente'
              ? 'À faire'
              : statut === 'en cours'
              ? 'En cours'
              : 'Terminée'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandeCardChef;
