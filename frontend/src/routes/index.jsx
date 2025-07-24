import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/Dashboard';
import KitchenOrders from '@/pages/kitchen/Orders';
import ServerOrders from '@/pages/server/Orders';
import ReceptionReservations from '@/pages/reception/Reservations';

const router = createBrowserRouter([
  {
    path: '/admin',
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'employees', element: <EmployeesPage /> },
    ],
  },
  {
    path: '/kitchen',
    children: [{ path: 'orders', element: <KitchenOrders /> }],
  },
  {
    path: '/server',
    children: [
      { path: 'orders', element: <ServerOrders /> },
      { path: 'tables', element: <ServerTables /> },
    ],
  },
  {
    path: '/reception',
    children: [
      { path: 'reservations', element: <ReceptionReservations /> },
      { path: 'tables', element: <ReceptionTables /> },
    ],
  },
]);

export default router;
