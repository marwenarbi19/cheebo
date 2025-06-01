import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Menu, MapPin, LogOut, UserCog } from 'lucide-react';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 bg-secondary dark:bg-dark-card text-black dark:text-dark-text min-h-screen relative transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-end items-center mb-6 relative">
          <div className="relative">
            <Menu
              className="w-6 h-6 cursor-pointer hover:text-primary dark:hover:text-primary-dark transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* Menu déroulant */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-gray border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-dark-accent transition-colors"
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  Modifier Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-dark-accent text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-400 dark:bg-gray-600 flex items-center justify-center mr-4">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">Utilisateur</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Tunis</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <span className="block font-semibold">0</span>
            <span className="text-gray-600 dark:text-gray-400">Articles</span>
          </div>
          <div className="text-center">
            <span className="block font-semibold">0</span>
            <span className="text-gray-600 dark:text-gray-400">Abonnés</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="border-t border-primary pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">Vous n'avez aucun article</p>
        </div>
      </div>

      {/* Modal de modification du profil */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto scrollbar scrollbar-thumb-custom-purple scrollbar-track-custom-light-track dark:scrollbar-track-custom-dark-track scrollbar-rounded">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-3">
              {/* Preview image upload */}
              <div className="text-center">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Aucune image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="mt-2"
                />
              </div>

              {/* Form inputs */}
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Téléphone"
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Adresse"
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Ville"
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              />
              <input
                type="text"
                placeholder="Code Postal"
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              />

              <select
                className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-gray text-black dark:text-dark-text"
              >
                <option>Algeria</option>
                <option>Tunisia</option>
                <option>Morocco</option>
              </select>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full mt-4 transition-colors"
                onClick={() => {
                  if (selectedImage) setProfileImage(selectedImage);
                  closeModal();
                }}
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
