import React, { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PlatsVendusParType = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await secureGet('/rapports/plats-vendus');
      setLabels(response.data.labels);
      setData(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des plats vendus', error);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Quantité vendue',
        data,
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md min-h-[350px] h-full">
      <h2 className="text-xl font-semibold mb-4">🍽️ Plats vendus par type</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PlatsVendusParType;
