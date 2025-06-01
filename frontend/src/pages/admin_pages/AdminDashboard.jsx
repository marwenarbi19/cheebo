import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8657ff] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/users" className="block hover:text-gray-300">
            👤 Gestion des utilisateurs
          </Link>
          <Link to="/admin/product" className="block hover:text-gray-300">
            📝 Gestion des products
          </Link>
          <Link to="/admin/stats" className="block hover:text-gray-300">
            📊 Statistiques
          </Link>
          <Link to="/" className="block text-red-300 hover:text-red-200">
            🔓 Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#8657ff]">Tableau de bord Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Exemple de cards dashboard */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">Utilisateurs</h2>
            <p className="text-2xl font-bold mt-2">52</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">Posts</h2>
            <p className="text-2xl font-bold mt-2">128</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700">Visites</h2>
            <p className="text-2xl font-bold mt-2">1,204</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
