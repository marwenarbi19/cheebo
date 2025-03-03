import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="bg-[#8657ff] shadow text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Cheebo</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/search" className="hover:text-[#a15e9a]">Recherche</Link>
          <Link to="/cart" className="flex items-center">
            <ShoppingCartIcon className="h-6 w-6 mr-1" />
            <span>({cart.length})</span>
          </Link>
          <Link to="/profile" className="hover:text-[#a15e9a]">Profil</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
