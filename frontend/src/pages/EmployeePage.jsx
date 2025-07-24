import { useEffect, useState } from 'react';
import {
  secureDelete,
  secureGet,
  securePost,
  securePut,
} from '../api/secureApi';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';
import Spinner from '../components/Spinner';

const EmployeePage = () => {
  const [employes, setEmployes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const res = await secureGet('/users');
        setEmployes(res.data);
      } catch (error) {
        console.error('Erreur lors du rafraîchissement des données', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployes();
  }, []);

  const handleAddemp = async (newEmp) => {
    const res = await securePost('/register', newEmp);
    setEmployes([...employes, res.data]);
  };

  const handleUpdateEmp = async (updatedEmp) => {
    const res = await securePut(`/users/${updatedEmp.id}`, updatedEmp);
    setEmployes((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? res.data : emp)),
    );
    setEditingEmp(null);
  };

  const handleDeleteEmp = async (id) => {
    await secureDelete(`/users/${id}`);
    setEmployes(employes.filter((emp) => emp.id != id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">👥 Gestion des employés</h1>
        <button
          onClick={() => {
            setEditingEmp(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          ➕ Ajouter un employé
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          initialData={editingEmp}
          onSubmit={(data) => {
            editingEmp ? handleUpdateEmp(data) : handleAddemp(data);
            setShowForm(false);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingEmp(null);
          }}
        />
      )}

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employes.map((emp) => (
            <EmployeeCard
              key={emp.id}
              nom={emp.nom}
              prenom={emp.prenom}
              role={emp.role}
              actif={emp.actif}
              onEdit={() => {
                setEditingEmp(emp);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteEmp(emp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
