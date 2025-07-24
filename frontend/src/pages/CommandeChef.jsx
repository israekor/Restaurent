import React, { useState, useEffect } from 'react';
import { secureGet, securePut } from '../api/secureApi';
import CommandeCardChef from '../components/CommandeCardChef';
import CommandeDetails from '../components/CommandeDetails';
import Spinner from '../components/Spinner';

const CommandeChef = () => {
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCommandes = () => {
    setLoading(true);
    secureGet('/commandes/chef')
      .then((res) => setCommandes(res.data))
      .catch((error) => {
        console.error('Erreur lors du rafraîchissement des commandes', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshCommandes();
  }, []);

  const handleUpdateStatut = async (id, newStatut) => {
    try {
      await securePut(`/commandes/statut/${id}`, { statut: newStatut });
      refreshCommandes(); // recharge depuis le backend
    } catch (error) {
      console.error('Erreur mise à jour du statut', error);
      alert('Impossible de modifier le statut.');
    }
  };

  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-[1400px] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🍽️ Commandes du Chef
        </h1>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.isArray(commandes) &&
              commandes.map((commande) => (
                <CommandeCardChef
                  key={commande.id}
                  commande={commande}
                  onUpdateStatut={handleUpdateStatut}
                  onView={handleViewDetails}
                />
              ))}
          </div>
        )}
        {showDetails && selectedCommande && (
          <CommandeDetails
            commande={selectedCommande}
            onClose={() => {
              setSelectedCommande(null);
              setShowDetails(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CommandeChef;
