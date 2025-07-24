import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdPendingActions } from 'react-icons/md';

const CommandeCard = ({ commande, onView }) => {
  const statutConfig = {
    'en attente': {
      text: 'En attente',
      color: 'text-yellow-600',
      icon: <MdPendingActions />,
    },
    'en cours': {
      text: 'En cours',
      color: 'text-blue-600',
      icon: <AiOutlineClockCircle />,
    },
    terminée: {
      text: 'Terminée',
      color: 'text-green-600',
      icon: <FaCheckCircle />,
    },
  };

  const config = statutConfig[commande.statut] || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">
          🪑 Table {commande.table?.numero || commande.restaurent_table_id}
        </h2>
        <button
          onClick={() => onView(commande)}
          className="text-sm px-3 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 transition"
        >
          Détails
        </button>
      </div>
      <div className={`flex items-center gap-2 ${config.color}`}>
        {config.icon}
        <span className="capitalize font-semibold">{config.text}</span>
      </div>
    </div>
  );
};

export default CommandeCard;
