import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/path-to-your-logo.svg" alt="Logo" />
            <span className="ml-2 font-bold text-xl text-purple-600">ChainElect</span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-purple-600">Products</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Solutions</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Community</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Resources</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Contact</a>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            <button className="px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100">Вход</button>
            <button className="px-4 py-1 rounded-md bg-gray-900 text-white hover:bg-gray-800">Регистрация</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
