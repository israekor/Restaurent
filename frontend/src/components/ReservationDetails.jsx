import React, { useEffect, useState } from 'react';
import { secureGet } from '../api/secureApi';

const ReservationDetails = ({ reservation, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (reservation) {
      secureGet(`/reservations/${reservation.id}`)
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [reservation]);

  if (!details || !details.slot) return null;

  const { slot } = details;
  const formatDate = (rawDate) => rawDate.split(' ')[0];
  const fullStart = `${formatDate(details.date)}T${slot.start_time}`;
  const fullEnd = `${formatDate(details.date)}T${slot.end_time}`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">📋 Détails Réservation</h2>

        <p>
          <strong>Client :</strong> {details.nom_client}
        </p>
        <p>
          <strong>Personnes :</strong> {details.nb_personnes}
        </p>
        <p>
          <strong>Table :</strong> {slot.table.numero} — {slot.table.capacite}{' '}
          pers.
        </p>
        <p>
          <strong>Salle :</strong> {slot.table.salle?.nom || 'Non spécifiée'}
        </p>
        <p>
          <strong>Créneau :</strong> {new Date(fullStart).toLocaleString()} →{' '}
          {new Date(fullEnd).toLocaleTimeString()}
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
