import { useState, useEffect } from 'react';
import { secureGet, secureDelete, securePost } from '../api/secureApi';
import TableCard from '@/components/TableCard';
import SalleForm from '@/components/SalleForm';
import TableForm from '@/components/TableForm';
import Spinner from '../components/Spinner';
import { FaTrash } from 'react-icons/fa';
import dining from '../assets/dining-room.png';

const TablesPage = () => {
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSalleId, setOpenSalleId] = useState(null);
  const [showSalleForm, setShowSalleForm] = useState(false);
  const [openTableFormId, setOpenTableFormId] = useState(null); // salle.id ciblée

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      try {
        const res = await secureGet('/salles');
        setSalles(res.data);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des données', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const toggleSalle = (id) => {
    setOpenSalleId(openSalleId === id ? null : id);
  };

  const handleAddSalle = async (newSalle) => {
    const res = await securePost('/salles', newSalle);
    setSalles([...salles, { ...res.data, restaurent_tables: [] }]);
  };

  const handleDeleteSalle = async (id) => {
    await secureDelete(`/salles/${id}`);
    setSalles(salles.filter((salle) => salle.id !== id));
  };

  const handleAddTable = async (newTable) => {
    const res = await securePost('/tables', newTable);

    setSalles((prev) =>
      prev.map((salle) =>
        salle.id === newTable.salle_id
          ? {
              ...salle,
              restaurent_tables: [...salle.restaurent_tables, res.data],
            }
          : salle,
      ),
    );
  };

  const handleDeleteTable = async (salleId, tableId) => {
    await secureDelete(`/tables/${tableId}`);
    setSalles((prev) =>
      prev.map((salle) =>
        salle.id === salleId
          ? {
              ...salle,
              restaurent_tables: salle.restaurent_tables.filter(
                (table) => table.id !== tableId,
              ),
            }
          : salle,
      ),
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          🧭 Gestion des salles et des tables
        </h1>
        <button
          onClick={() => setShowSalleForm(!showSalleForm)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          ➕ Ajouter une salle
        </button>

        {showSalleForm && (
          <SalleForm
            onSubmit={(data) => {
              handleAddSalle(data);
              setShowSalleForm(false);
            }}
          />
        )}
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        salles.map((salle) => (
          <div key={salle.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <h2
                className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3"
                onClick={() => toggleSalle(salle.id)}
              >
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
              <button onClick={() => handleDeleteSalle(salle.id)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>

            {openSalleId === salle.id && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {(salle.restaurent_tables || []).map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onDelete={() => handleDeleteTable(salle.id, table.id)}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setOpenTableFormId(
                      openTableFormId === salle.id ? null : salle.id,
                    )
                  }
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow mt-4"
                >
                  ➕ Ajouter une table
                </button>

                {openTableFormId === salle.id && (
                  <TableForm
                    salleId={salle.id}
                    onSubmit={(data) => {
                      handleAddTable(data);
                      setOpenTableFormId(null);
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TablesPage;
