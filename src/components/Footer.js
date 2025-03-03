import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#8657ff] p-4 text-white text-center">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; 2025 Cheebo. Tous droits réservés.</p>
        <div className="flex justify-center space-x-4">
          <a href="/terms" className="hover:text-[#a15e9a]">Conditions d'utilisation</a>
          <a href="/privacy" className="hover:text-[#a15e9a]">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
