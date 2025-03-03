import React from 'react';
import Layout from '../components/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Profil</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Email: utilisateur@example.com</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;