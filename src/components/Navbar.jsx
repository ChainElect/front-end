// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ConnectButton from "./Metamask/ConnectButton";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="ml-2 font-bold text-xl text-purple-600">
              ChainElect
            </span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/main" className="text-gray-700 hover:text-purple-600">
              Главна страница
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-600">
                Админ
              </Link>
            )}
            <Link to="/user" className="text-gray-700 hover:text-purple-600">
              User
            </Link>
            <Link to="/" className="text-gray-700 hover:text-purple-600">
              Resources
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-purple-600">
              Резултати
            </Link>
            <Link to="/hero" className="text-gray-700 hover:text-purple-600">
              Hero
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-500"
                >
                  Изход
                </button>
                <Link to="/connect">
                  <ConnectButton />
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
