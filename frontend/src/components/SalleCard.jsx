const SalleCard = ({ table }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow border-l-4 border-green-500">
      <h3 className="text-lg font-semibold mb-2">Table {table.numero}</h3>
      <p className="text-sm text-gray-500">Capacité : {table.capacite}</p>
      <p className="text-sm text-gray-500">Salle : {table.salle.nom}</p>
      <span className="text-green-600 font-medium mt-2 inline-block">
        ✅ Disponible
      </span>
    </div>
  );
};

export default SalleCard;
