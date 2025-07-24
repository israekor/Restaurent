import React, { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TauxOccupationTables = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, [dateDebut, dateFin]);

  const fetchStats = async () => {
    try {
      const response = await secureGet('/rapports/occupation-tables', {
        date_debut: dateDebut,
        date_fin: dateFin,
      });
      setLabels(response.data.labels);
      setData(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement du taux d’occupation', error);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#10b981', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md min-h-[350px] h-full">
      <h2 className="text-xl font-semibold mb-4">
        🪑 Taux d’occupation des tables
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          className="border px-4 py-2 rounded-md"
          placeholder="Date début"
        />
        <input
          type="date"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          className="border px-4 py-2 rounded-md"
          placeholder="Date fin"
        />
      </div>

      <Pie data={chartData} />
    </div>
  );
};

export default TauxOccupationTables;
