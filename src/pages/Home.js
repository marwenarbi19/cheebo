import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur Cheebo</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Exemple de produits */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Produit 1</h2>
            <p className="text-gray-600">Description du produit</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;