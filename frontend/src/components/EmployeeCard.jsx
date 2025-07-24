import { FaUserTie } from 'react-icons/fa';
import { FaTrash, FaEdit } from 'react-icons/fa';

const EmployeeCard = ({ nom, prenom, role, actif, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-500 flex items-start gap-4">
      {/* Icône employé */}
      <div className="text-blue-500 text-3xl mt-1">
        <FaUserTie />
      </div>

      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700"
          title="Modifier"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          title="Supprimer"
        >
          <FaTrash />
        </button>
      </div>

      {/* Infos employé */}
      <div>
        <h3 className="text-lg font-bold text-gray-800">
          {prenom} {nom}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Rôle : <span className="font-medium text-gray-800">{role}</span>
        </p>
        <p className="text-sm mt-1">
          Actif :{' '}
          <span
            className={`font-semibold ${
              actif ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {actif ? 'Oui' : 'Non'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
