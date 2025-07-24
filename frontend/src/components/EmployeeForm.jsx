import React from 'react';
import { useState, useEffect } from 'react';

const EmployeeForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [actif, setActif] = useState(true);

  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom || '');
      setPrenom(initialData.prenom || '');
      setEmail(initialData.email || '');
      setPassword(initialData.password || '');
      setRole(initialData.role || '');
      setActif(initialData.actif ?? true);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...(initialData?.id && { id: initialData.id }),
      nom,
      prenom,
      email,
      password,
      role,
      actif,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? 'Modifier un employé' : 'Ajouter un employé'}
      </h2>

      <div>
        <label className="block font-medium">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Prénom</label>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <textarea
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required={!initialData} // obligatoire seulement à l'ajout
        />
      </div>

      <div>
        <label className="block font-medium">Rôle</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Choisir un rôle --</option>
          <option value="responsable">Responsable</option>
          <option value="chef">Chef</option>
          <option value="serveur">Serveur</option>
          <option value="receptionniste">Réceptionniste</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Role</label>
        <select
          value={actif ? 'actif' : 'inactif'}
          onChange={(e) => setActif(e.target.value === 'actif')}
          className="w-full border rounded px-3 py-2"
        >
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
