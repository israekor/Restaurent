import React, { useEffect, useState } from 'react';
import {
  secureDelete,
  secureGet,
  securePost,
  securePut,
} from '../api/secureApi.js';
import IngredientsCard from '../components/IngredientsCard';
import AddIngredient from '../components/AddIngredient';
import UpdateQuantite from '../components/UpdateQuantite.jsx';
import Spinner from '../components/Spinner.jsx';

const StockPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Charger les ingrédients depuis l'API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await secureGet('/ingredients');
        setIngredients(res.data);
      } catch (error) {
        console.error('Erreur chargement ingrédients :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  // ➕ Ajouter un ingrédient
  const handleAddIngredient = async (newIngredient) => {
    try {
      const res = await securePost('/ingredients', newIngredient);
      setIngredients([...ingredients, res.data]);
    } catch (error) {
      console.error('Erreur ajout ingrédient :', error);
    }
  };

  // ✏️ Ouvrir la modale de mise à jour
  const handleOpenUpdate = (ingredient) => {
    setSelectedIngredient(ingredient);
    setShowUpdateModal(true);
  };

  // 🔁 Mettre à jour la quantité (et l'API)
  const handleUpdateQuantite = async (id, newQuantite) => {
    try {
      const res = await securePut(`/ingredients/${id}`, {
        ...selectedIngredient,
        stock: newQuantite,
      });

      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === id ? { ...ing, stock: res.data.stock } : ing,
        ),
      );
    } catch (error) {
      console.error('Erreur mise à jour quantité :', error);
    }
  };

  // 🗑️ Supprimer un ingrédient
  const handleDeleteIngredient = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer cet ingrédient ?')) {
      try {
        await secureDelete(`/ingredients/${id}`);
        setIngredients((prev) => prev.filter((ing) => ing.id !== id));
      } catch (error) {
        console.error('Erreur suppression ingrédient :', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* 🧭 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Gestion du stock
          </h1>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Nouvel ingrédient
          </button>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ingredient) => (
              <IngredientsCard
                key={ingredient.id}
                ingredient={ingredient}
                onUpdate={() => handleOpenUpdate(ingredient)}
                onDelete={() => handleDeleteIngredient(ingredient.id)}
              />
            ))}
          </div>
        )}
        {/* ➕ Modale ajout */}
        {showAddModal && (
          <AddIngredient
            onClose={() => setShowAddModal(false)}
            onConfirm={handleAddIngredient}
          />
        )}

        {/* 🔁 Modale mise à jour */}
        {showUpdateModal && selectedIngredient && (
          <UpdateQuantite
            ingredient={selectedIngredient}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedIngredient(null);
            }}
            onConfirm={(newQuantite) =>
              handleUpdateQuantite(selectedIngredient.id, newQuantite)
            }
          />
        )}
      </div>
    </div>
  );
};

export default StockPage;
