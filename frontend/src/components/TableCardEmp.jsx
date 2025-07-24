import React from 'react';
import { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';
import SlotTimeline from './SlotTimeline';

const TableCard = ({ table }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await secureGet(`/tables/${table.id}/slots`);
        setSlots(res.data.slot);
      } catch (error) {
        console.error('Erreur chargement des slots', error);
      }
    };
    fetchSlots();
  }, [table.id]);

  return (
    <div className="rounded-lg shadow-md p-4 bg-white hover:scale-[1.02] transition duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Table {table.numero}
      </h2>
      <p className="text-sm text-gray-600">Capacité : {table.capacite}</p>

      {/* 🕓 Timeline des slots */}
      <SlotTimeline slots={slots} />
    </div>
  );
};

export default TableCard;
