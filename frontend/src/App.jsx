import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RoleLayout from './layouts/RoleLayout.jsx';
import MenuPage from './pages/MenuPage.jsx';
import MenuPageServer from './pages/MenuPageServer.jsx';
import TablesPage from './pages/TablesPage.jsx';
import TablesPageEmp from './pages/TablesPageEmp.jsx';
import EmployeePage from './pages/EmployeePage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import CommandeServ from './pages/CommandeServ.jsx';
import ReservationPage from './pages/ReservationPage.jsx';
import CommandeChef from './pages/CommandeChef.jsx';
import StockPage from './pages/StockPage.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/*Responsable */}
      <Route element={<ProtectedRoute allowedRoles={['responsable']} />}>
        <Route path="/responsable" element={<RoleLayout />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Route>

      {/*Serveur */}
      <Route element={<ProtectedRoute allowedRoles={['serveur']} />}>
        <Route path="/serveur" element={<RoleLayout />}>
          <Route path="menu" element={<MenuPageServer />} />
          <Route path="tables" element={<TablesPageEmp />} />
          <Route path="commandes" element={<CommandeServ />} />
        </Route>
      </Route>

      {/*Receptionniste */}
      <Route element={<ProtectedRoute allowedRoles={['receptionniste']} />}>
        <Route path="/reception" element={<RoleLayout />}>
          <Route path="tables" element={<TablesPageEmp />} />
          <Route path="reservations" element={<ReservationPage />} />
        </Route>
      </Route>

      {/*Chef */}
      <Route element={<ProtectedRoute allowedRoles={['chef']} />}>
        <Route path="/chef" element={<RoleLayout />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="commandes" element={<CommandeChef />} />
          <Route path="stock" element={<StockPage />} />
        </Route>
      </Route>

      {/* Route non définie */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
