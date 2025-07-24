import MenuCard from '@/components/MenuCard.jsx';
import PlatForm from '@/components/PlatForm';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import {
  secureDelete,
  securePost,
  secureGet,
  securePut,
} from '../api/secureApi';

const MenuPage = () => {
  const [plats, setPlats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlat, setEditingPlat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlats = async () => {
      setLoading(true);
      try {
        const res = await secureGet('/plats');
        setPlats(res.data);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des données', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlats();
  }, []);

  const handleAddPlat = async (nwePlat) => {
    const res = await securePost('/plats', nwePlat);
    setPlats([...plats, res.data]);
  };

  const handleUpdatePlat = async (updatedplat) => {
    const res = await securePut(`/plats/${updatedplat.id}`, updatedplat);
    setPlats((prev) =>
      prev.map((plat) => (plat.id === updatedplat.id ? res.data : plat)),
    );
    setEditingPlat(null);
  };

  const handleDeletePlat = async (id) => {
    await secureDelete(`/plats/${id}`);
    setPlats(plats.filter((plat) => plat.id != id));
  };

  const handleToggleDisponibilite = async (id) => {
    const plat = plats.find((p) => p.id === id);
    const updated = {
      ...plat,
      statut: plat.statut === 'disponible' ? 'indisponible' : 'disponible',
    };
    const res = await securePut(`/plats/${id}`, updated);
    setPlats((prev) => prev.map((plat) => (plat.id === id ? res.data : plat)));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          🍽️ Gestion des plats
        </h1>

        <button
          onClick={() => {
            setEditingPlat(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 shadow"
        >
          ➕ Ajouter un plat
        </button>
      </div>

      {showForm && (
        <PlatForm
          onSubmit={(data) => {
            editingPlat ? handleUpdatePlat(data) : handleAddPlat(data);
            setShowForm(false);
          }}
          initialData={editingPlat}
          onCancel={() => {
            setShowForm(false);
            setEditingPlat(null);
          }}
        />
      )}

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plats.map((plat) => (
            <MenuCard
              key={plat.id}
              nom={plat.nom}
              prix={plat.prix}
              available={plat.statut === 'disponible'}
              onToggle={() => handleToggleDisponibilite(plat.id)}
              onEdit={() => {
                setEditingPlat(plat);
                setShowForm(true);
              }}
              onDelete={() => handleDeletePlat(plat.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
