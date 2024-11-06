import React from "react";
import { Link } from "react-router-dom";
import ConnectButton from "./Metamask/ConnectButton";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* <img src={ChainElectLogo} className="h-8 w-auto" alt="Logo" /> */}
            <span className="ml-2 font-bold text-xl text-purple-600">
              ChainElect
            </span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/main" className="text-gray-700 hover:text-purple-600">
              Главна страница
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-purple-600">
              Админ
            </Link>
            <Link to="/user" className="text-gray-700 hover:text-purple-600">
              user
            </Link>
            <Link to="/" className="text-gray-700 hover:text-purple-600">
              Resources
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-purple-600">
              резултати
            </Link>
            <Link to="/hero" className="text-gray-700 hover:text-purple-600">
              Hero
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            <Link to="/login">
              <button className="px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100">
                Вход
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-1 rounded-md bg-gray-900 text-white hover:bg-gray-800">
                Регистрация
              </button>
            </Link>
            <Link to="/connect">
              <ConnectButton />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
