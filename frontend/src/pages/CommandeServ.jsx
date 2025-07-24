import React, { useState, useEffect } from 'react';
import { secureGet, securePost } from '../api/secureApi';
import CommandeCard from '../components/CommandeCard';
import Spinner from '../components/Spinner';
import AddCommande from '../components/AddCommande';
import CommandeDetails from '../components/CommandeDetails';
import { FaPlus } from 'react-icons/fa';

const CommandeServ = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const res = await secureGet('/commandes');
        setCommandes(res.data);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des commandes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommande();
  }, []);

  // Handler pour créer une nouvelle commande
  const handleCreateCommande = async (data) => {
    try {
      const res = await securePost('/commandes', {
        restaurent_table_id: data.restaurent_table_id,
        lignes_commande: data.lignes_commande,
      });

      setCommandes([res.data.commande, ...commandes]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur création commande :', error.response?.data);
      alert(error.response?.data?.message || 'Erreur lors de la création');
    }
  };

  // Handler pour consulter les détails
  const handleViewDetails = (commande) => {
    console.log('Commande sélectionnée :', commande);
    setSelectedCommande(commande);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🧾 Commandes</h1>
          <button
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> Nouvelle commande
          </button>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commandes.map((commande) => (
              <CommandeCard
                key={commande.id}
                commande={commande}
                onView={handleViewDetails}
              />
            ))}
          </div>
        )}
        {/* Modales */}
        {showAddModal && (
          <AddCommande
            onClose={() => setShowAddModal(false)}
            onCreate={handleCreateCommande}
          />
        )}
        {showDetailsModal && selectedCommande && (
          <CommandeDetails
            commande={selectedCommande}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedCommande(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CommandeServ;
