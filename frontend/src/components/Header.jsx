import { useState } from "react";
import { Moon, Sun, User, Home, Menu, PawPrint, Store, Stethoscope } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Gestionnaire pour les boutons de navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Fermer le menu après la navigation
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#8657ff] dark:bg-[#8657ff] shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:px-10 lg:px-48">
        {/* Bouton utilisateur (lien vers profile) */}
        <button onClick={() => handleNavigation('/profile')} aria-label="Accéder au profil utilisateur">
          <User className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
        </button>

        {/* Icônes de navigation (visibles uniquement sur grand écran) */}
        <div className="hidden md:flex gap-8">
          <button onClick={() => handleNavigation('/home')} aria-label="Accéder à l'accueil">
            <Home className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
          </button>
          <button onClick={() => handleNavigation('/pets')} aria-label="Voir les animaux">
            <PawPrint className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
          </button>
          <button onClick={() => handleNavigation('/product')} aria-label="Voir la boutique">
            <Store className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
          </button>
          <button onClick={() => handleNavigation('/vet')} aria-label="Consulter le vétérinaire">
            <Stethoscope className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
          </button>
        </div>

        {/* Actions à droite (mode sombre et menu mobile) */}
        <div className="flex items-center gap-4">
          {/* Bouton pour basculer le mode sombre */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-opacity-30 hover:bg-opacity-50 bg-gray-600 hover:bg-gray-200 dark:hover:bg-primary-dark transition-colors duration-300"
            aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors duration-300" />
            ) : (
              <Moon className="w-6 h-6 text-white hover:text-purple-300 transition-colors duration-300" />
            )}
          </button>

          {/* Bouton pour ouvrir/fermer le menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-primary-dark transition-colors duration-300"
            aria-label={isMenuOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile"}
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary dark:bg-primary-dark shadow-md transition-colors duration-300">
          <div className="flex flex-col items-center gap-4 py-4">
            <button
              className="w-full text-center py-2 hover:bg-gray-200 dark:hover:bg-purple-700 transition-colors duration-300"
              onClick={() => handleNavigation('/home')}
              aria-label="Accueil"
            >
              <Home className="w-6 h-6 mx-auto text-white" />
              <span className="text-white text-xs mt-1">Accueil</span>
            </button>
            <button
              className="w-full text-center py-2 hover:bg-gray-200 dark:hover:bg-purple-700 transition-colors duration-300"
              onClick={() => handleNavigation('/pets')}
              aria-label="Animaux"
            >
              <PawPrint className="w-6 h-6 mx-auto text-white" />
              <span className="text-white text-xs mt-1">Animaux</span>
            </button>
            <button
              className="w-full text-center py-2 hover:bg-gray-200 dark:hover:bg-purple-700 transition-colors duration-300"
              onClick={() => handleNavigation('/product')}
              aria-label="Boutique"
            >
              <Store className="w-6 h-6 mx-auto text-white" />
              <span className="text-white text-xs mt-1">Boutique</span>
            </button>
            <button
              className="w-full text-center py-2 hover:bg-gray-200 dark:hover:bg-purple-700 transition-colors duration-300"
              onClick={() => handleNavigation('/vet')}
              aria-label="Vétérinaire"
            >
              <Stethoscope className="w-6 h-6 mx-auto text-white" />
              <span className="text-white text-xs mt-1">Vétérinaire</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
