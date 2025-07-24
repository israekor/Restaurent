import MenuCardServer from '../components/MenuCardServer';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import { secureGet } from '../api/secureApi';

const MenuPage = () => {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlats = async () => {
      setLoading(true);
      try {
        const res = await secureGet('/plats');
        setPlats(res.data);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des commandes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">🍽️ Les plats</h1>
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plats.map((plat) => (
            <MenuCardServer
              key={plat.id}
              nom={plat.nom}
              prix={plat.prix}
              available={plat.statut === 'disponible'}
              onToggle={() => handleToggleDisponibilite(plat.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
