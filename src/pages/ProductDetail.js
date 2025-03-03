import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Simule une liste de produits pour récupérer celui correspondant à l'ID
  const products = [
    { id: 1, name: 'Produit Premium', price: 99.99, description: 'Description détaillée du produit' },
    { id: 2, name: 'Produit Standard', price: 49.99, description: 'Un produit abordable avec une qualité supérieure.' },
    { id: 3, name: 'Produit Basique', price: 19.99, description: 'Un produit simple et efficace.' }
  ];

  // Recherche du produit correspondant à l'ID
  const product = products.find((p) => p.id === parseInt(id));

  // Vérifier si le produit existe
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-2xl font-bold text-red-600">Produit non trouvé</h2>
          <p>Le produit que vous recherchez n'existe pas.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img 
              src="https://via.placeholder.com/400" 
              alt={product.name} 
              className="rounded-lg w-full"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-2xl text-white font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-white mb-6">{product.description}</p>
            <button 
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
