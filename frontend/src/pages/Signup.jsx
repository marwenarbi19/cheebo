import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription soumise:', { firstName, lastName, email, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#8657ff]  text-gray-600">
      <div className="container mx-auto p-4 max-w-md">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="mx-auto mb-4"
          style={{ width: '200px', height: '150px', marginBottom: '40px' }}
        />
        <main className="flex-grow flex items-center justify-center">
          <div className="bg-[#8657ff] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-white text-2xl text-center mb-6">S'inscrire</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-4 mb-4 w-full border border-gray-300 rounded-md shadow-inner text-gray-600"
                aria-label="Prénom"
              />
              <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-4 mb-4 w-full border border-gray-300 rounded-md shadow-inner text-gray-600"
                aria-label="Nom"
              />
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 mb-4 w-full border border-gray-300 rounded-md shadow-inner text-gray-600"
                aria-label="Adresse e-mail"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 mb-4 w-full border border-gray-300 rounded-md shadow-inner text-gray-600"
                aria-label="Mot de passe"
              />
              <button
                type="submit"
                className="p-4 mt-2 w-full bg-[#ff6b6b] text-white rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-[#ff4949]"
              >
                S'inscrire
              </button>
            </form>

            <p className="mt-2 text-center text-white">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-white no-underline hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;
