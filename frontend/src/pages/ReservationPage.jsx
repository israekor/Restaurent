import React, { useState, useEffect } from 'react';
import { secureGet, securePost } from '../api/secureApi';
import { FaPlus } from 'react-icons/fa';
import ReservationCard from '../components/ReservationCard';
import ReservationDetails from '../components/ReservationDetails';
import AddReservation from '../components/AddReservation';
import Spinner from '../components/Spinner';

const ReservationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    secureGet('/reservations')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReservations(res.data);
        } else {
          setReservations([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Erreur récupération réservation', err);
        setReservations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };

  const handleAddReservation = (data) => {
    securePost('/reservations', data)
      .then((res) => {
        setReservations([res.data.reservation, ...reservations]);
        setShowModal(false);
      })
      .catch((err) => {
        console.error('Erreur ajout réservation', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📅 Réservations</h1>
          <button
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Nouvelle réservation
          </button>
        </div>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res) => (
              <ReservationCard
                key={res.id}
                reservation={res}
                onView={handleViewDetails}
              />
            ))}
          </div>
        )}
        {showDetailsModal && selectedReservation && (
          <ReservationDetails
            reservation={selectedReservation}
            onClose={() => {
              setSelectedReservation(null);
              setShowDetailsModal(false);
            }}
          />
        )}

        {showModal && (
          <AddReservation
            onCreate={handleAddReservation}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
