import React from 'react';

const ReservationCard = ({ reservation, onView }) => {
  const slot = reservation.slot;
  const date = reservation.date?.split(' ')[0];
  const fullStart =
    date && slot?.start_time ? `${date}T${slot.start_time}` : null;
  const fullEnd = date && slot?.end_time ? `${date}T${slot.end_time}` : null;

  const start = fullStart ? new Date(fullStart) : null;
  const end = fullEnd ? new Date(fullEnd) : null;
  const isValid = start instanceof Date && !isNaN(start);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">
          🪑 Table {slot?.table?.numero || '❓'}
        </h2>
        <button
          onClick={() => onView(reservation)}
          className="text-sm px-3 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 transition"
        >
          Détails
        </button>
      </div>
      <p className="text-gray-600">
        👤 {reservation.nom_client} — 👥 {reservation.nb_personnes} personnes
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {isValid
          ? `${start.toLocaleTimeString()} → ${end?.toLocaleTimeString() ?? ''}`
          : 'Créneau invalide'}
      </p>
    </div>
  );
};

export default ReservationCard;
