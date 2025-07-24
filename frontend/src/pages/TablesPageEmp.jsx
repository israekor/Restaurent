import { useState, useEffect } from 'react';
import { secureGet, securePut } from '../api/secureApi';
import TableCardEmp from '@/components/TableCardEmp';
import Spinner from '../components/Spinner';
import dining from '../assets/dining-room.png';

const TablesPage = () => {
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const res = await secureGet('/salles');
        setSalles(res.data);
      } catch (error) {
        console.error('Erreur chargement des salles :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalles();
  }, []);

  const handleToggleDisponibilite = async (salleId, tableId) => {
    try {
      const table = salles
        .find((s) => s.id === salleId)
        .restaurent_tables.find((t) => t.id === tableId);

      const updatedStatut = table.statut === 'libre' ? 'occupée' : 'libre';

      await securePut(`/tables/${tableId}`, { statut: updatedStatut });

      setSalles((prev) =>
        prev.map((salle) =>
          salle.id === salleId
            ? {
                ...salle,
                restaurent_tables: salle.restaurent_tables.map((t) =>
                  t.id === tableId ? { ...t, statut: updatedStatut } : t,
                ),
              }
            : salle,
        ),
      );
    } catch (error) {
      console.error('Erreur lors du changement de statut', error);
      alert('Action non autorisée ou erreur serveur');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        🧭 Les Salles et tables
      </h1>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        salles.map((salle) => (
          <div key={salle.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
              <img
                src={dining}
                alt="Salle"
                className="w-8 h-8 text-orange-500"
                style={{
                  filter:
                    'invert(42%) sepia(83%) saturate(746%) hue-rotate(360deg) brightness(95%) contrast(90%)',
                }}
              />
              {salle.nom}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(salle.restaurent_tables || []).map((table) => (
                <TableCardEmp key={table.id} table={table} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TablesPage;
