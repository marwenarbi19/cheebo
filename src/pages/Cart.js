import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-8">Panier</h1>
        
        {cart.length === 0 ? (
          <p className="text-white">Votre panier est vide</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-blue-600">${item.price}</p>
              </div>
            ))}
            
            <div className="mt-8 text-right">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;