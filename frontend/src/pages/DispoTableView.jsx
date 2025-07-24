import { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';
import dayjs from 'dayjs';
import SalleCard from '../components/SalleCard';
import Spinner from './Spinner';
import DatetimePicker from '../components/DateTimePicker'; // à intégrer

const DispoTablesView = () => {
  const [datetime, setDatetime] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [tablesLibres, setTablesLibres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDispo = async () => {
      setLoading(true);
      try {
        const res = await secureGet(`/tables-disponibles?datetime=${datetime}`);
        setTablesLibres(res.data);
      } catch (error) {
        console.error('Erreur récupération des tables', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDispo();
  }, [datetime]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">🪑 Disponibilité des Tables</h2>

      <DatetimePicker value={datetime} onChange={setDatetime} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tablesLibres.map((table) => (
            <SalleCard key={table.id} table={table} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DispoTablesView;
