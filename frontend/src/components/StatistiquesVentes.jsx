import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { secureGet } from '../api/secureApi';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatistiquesVentes = () => {
  const [periode, setPeriode] = useState('jour');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, [periode, date]);

  const fetchStats = async () => {
    try {
      const response = await secureGet('/rapports/ventes', {
        periode,
        date,
      });
      setLabels(response.data.labels);
      setData(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques', error);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Commandes',
        data,
        backgroundColor: '#6366f1',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md min-h-[350px] h-full">
      <h2 className="text-xl font-semibold mb-4">📊 Statistiques de ventes</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="jour">Jour</option>
          <option value="semaine">Semaine</option>
          <option value="mois">Mois</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
      </div>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
};

export default StatistiquesVentes;
