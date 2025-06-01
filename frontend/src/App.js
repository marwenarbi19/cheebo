import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminRoute } from './routes/AdminRoutes'; // Assure-toi que c'est un export nommé

// Pages
import AdminDashboard from './pages/admin_pages/AdminDashboard';
import Adoption from './pages/Adoption';
import Home from './pages/Home';
import ProductDetail from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Pets from './pages/pets';        // si le fichier est pets.jsx
import Vet from './pages/vet';          // si le fichier est vet.jsx
import AdminProduct from './components/admin/AdminProduct';
import AdminUsers from './components/admin/AdminUsers';
import AdminPosts from './components/admin/AdminPosts';
import AdminStats from './components/admin/AdminStats';
import AdminOrders from './components/admin/AdminOrders';
import AdminSettings from './components/admin/AdminSettings';
import AdminVets from './components/admin/AdminVets';
import AdminReports from './components/admin/AdminReports';

import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <AdminRoute>
              <AdminPosts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/stats"
          element={
            <AdminRoute>
              <AdminStats />
            </AdminRoute>
          }
        />

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/vet" element={<Vet />} />
        <Route path="/adoption" element={<Adoption />} />
      </Routes>
    </Router>
  );
}

export default App;