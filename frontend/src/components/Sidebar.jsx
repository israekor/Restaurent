import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adapte le chemin si besoin

import { FaUtensils, FaUsers } from 'react-icons/fa';
import { MdTableRestaurant } from 'react-icons/md';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdInventory } from 'react-icons/md';

const Sidebar = () => {
  const { user, logout, loading } = useAuth();
  const userRole = user?.role || '';

  const navItemsByRole = {
    responsable: [
      {
        name: 'Menu',
        path: '/responsable/menu',
        icon: <FaUtensils size={20} />,
      },
      {
        name: 'Tables',
        path: '/responsable/tables',
        icon: <MdTableRestaurant size={20} />,
      },
      {
        name: 'Employés',
        path: '/responsable/employees',
        icon: <FaUsers size={20} />,
      },
      {
        name: 'Stock',
        path: '/responsable/stock',
        icon: <MdInventory size={20} />,
      },
      {
        name: 'Statistiques',
        path: '/responsable/stats',
        icon: <AiOutlineBarChart size={20} />,
      },
      {
        name: 'Déconnexion',
        action: 'logout',
        icon: <FiLogOut size={20} />,
      },
    ],
    serveur: [
      { name: 'Menu', path: '/serveur/menu', icon: <FaUtensils size={20} /> },
      {
        name: 'Tables',
        path: '/serveur/tables',
        icon: <MdTableRestaurant size={20} />,
      },
      {
        name: 'Commandes',
        path: '/serveur/commandes',
        icon: <FaUsers size={20} />,
      },
      {
        name: 'Déconnexion',
        action: 'logout',
        icon: <FiLogOut size={20} />,
      },
    ],
    receptionniste: [
      {
        name: 'Tables',
        path: '/reception/tables',
        icon: <MdTableRestaurant size={20} />,
      },
      {
        name: 'Reservations',
        path: '/reception/reservations',
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        name: 'Déconnexion',
        action: 'logout',
        icon: <FiLogOut size={20} />,
      },
    ],
    chef: [
      { name: 'Menu', path: '/chef/menu', icon: <FaUtensils size={20} /> },
      {
        name: 'Commandes',
        path: '/chef/commandes',
        icon: <FaUsers size={20} />,
      },
      {
        name: 'Stock',
        path: '/chef/stock',
        icon: <MdInventory size={20} />,
      },
      {
        name: 'Déconnexion',
        action: 'logout',
        icon: <FiLogOut size={20} />,
      },
    ],
  };

  const navItems = navItemsByRole[userRole] || [];
  if (loading || !user) return null;

  return (
    <div className="h-screen w-64 bg-[#121212]/90 text-white p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6">🍴 Mon Resto</h1>
      {navItems.map((item, index) => {
        if (item.action === 'logout') {
          return (
            <button
              key={index}
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#121212]/90 transition text-left w-full"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          );
        }

        return (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#121212]/90 transition ${
                isActive ? 'bg-[#121212] font-semibold' : ''
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
