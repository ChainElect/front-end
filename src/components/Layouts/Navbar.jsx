// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ConnectButton from "../UI/ConnectButton";

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
            <Link to="/" className="flex items-center">
              <span className="ml-2 font-bold text-xl text-purple-600">
                ChainElect
              </span>
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/home" className="text-gray-700 hover:text-purple-600">
              Начало
            </Link>
            <Link to="/voting" className="text-gray-700 hover:text-purple-600">
              Гласуване
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-purple-600">
              Резултати
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-600">
                Админ
              </Link>
            )}
            <Link
              to="/resources"
              className="text-gray-700 hover:text-purple-600"
            >
              Ресурси
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600">
              За нас
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            {isLoggedIn ? (
              <>
                {/* Profile Dropdown (if needed) */}
                <div className="relative">
                  <button className="text-gray-700 hover:text-purple-600">
                    Профил
                  </button>
                  {/* Dropdown example - add logic for toggle */}
                  {/* <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                  </div> */}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-500"
                >
                  Изход
                </button>

                {/* Blockchain Connect Button */}
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
