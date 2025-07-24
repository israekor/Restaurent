import { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';

const AddReservation = ({ onCreate, onClose }) => {
  const [nomClient, setNomClient] = useState('');
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlotId || !nomClient || nbPersonnes < 1) return;
    onCreate({
      slot_id: selectedSlotId,
      nom_client: nomClient,
      nb_personnes: nbPersonnes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">➕ Nouvelle Réservation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom du client</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Nombre de personnes
            </label>
            <input
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2"
              value={nbPersonnes}
              onChange={(e) => setNbPersonnes(parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={date}
              onChange={async (e) => {
                const rawDate = e.target.value;
                setDate(rawDate);

                try {
                  const res = await secureGet('/reservations/slots-libres', {
                    date: rawDate,
                  });
                  const data = Array.isArray(res.data) ? res.data : [];
                  setAvailableSlots(data);
                } catch (err) {
                  console.error('Erreur chargement slots', err);
                  setAvailableSlots([]);
                }
              }}
              required
            />

            <p className="text-sm text-gray-500">
              Jour sélectionnée : {date ? new Date(date).toLocaleString() : ''}
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-1">Table</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              required
            >
              <option value="">-- Choisir un créneau --</option>
              {availableSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  Table {slot.table.numero} • {slot.table.capacite} pers. •{' '}
                  {slot.table.salle.nom} • 🕒{' '}
                  {new Date(slot.start_time).toLocaleString()}
                </option>
              ))}
            </select>
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

export default AddReservation;
