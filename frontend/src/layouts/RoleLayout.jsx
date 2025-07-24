import Sidebar from '@/components/Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) {
    return <Navigate to="/" />; // Redirection vers login si non connecté
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#1E1E1E]">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RoleLayout;
