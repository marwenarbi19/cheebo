import React from 'react';
import Header from './Header';
import Footer from './Footer'; 

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#8657ff]  text-gray-600">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
