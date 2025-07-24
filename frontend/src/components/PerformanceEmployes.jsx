import React, { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';

const PerformanceEmployes = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    fetchStats();
  }, [dateDebut, dateFin]);

  const fetchStats = async () => {
    try {
      const response = await secureGet('/rapports/performance-employes', {
        date_debut: dateDebut,
        date_fin: dateFin,
      });
      setEmployes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des performances', error);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md min-h-[350px] h-full">
      <h2 className="text-xl font-semibold mb-4">
        👥 Performance des employés
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

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Rôle</th>
            <th className="px-4 py-2">Tâches</th>
          </tr>
        </thead>
        <tbody>
          {employes.map((emp, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{emp.nom}</td>
              <td className="px-4 py-2">{emp.role}</td>
              <td className="px-4 py-2">{emp.taches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceEmployes;
