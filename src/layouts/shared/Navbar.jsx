import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { ConnectButton } from "../../components/button/ConnectButton";

export const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const logoutHandler = useCallback(() => {
    handleLogout();
    toggleMenu();
  }, [handleLogout, toggleMenu]);

  const handleMenuClick = useCallback(() => {
    toggleMenu();
  }, [toggleMenu]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="ml-2 mr-10 font-bold text-xl text-purple-600">
                ChainElect
              </span>
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className="text-gray-700 focus:outline-none focus:text-purple-600"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
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
            <Link
              to="/resources"
              className="text-gray-700 hover:text-purple-600"
            >
              Ресурси
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600">
              За нас
            </Link>

            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-600">
                Админ
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link to="/connect">
                  <ConnectButton />
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                >
                  Изход
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                  onClick={handleMenuClick}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                  onClick={handleMenuClick}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden md:hidden`}
        >
          <div className="space-y-4 pt-4 pb-4 px-2">
            <Link
              to="/home"
              className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
              onClick={handleMenuClick}
            >
              Начало
            </Link>
            <Link
              to="/voting"
              className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
              onClick={handleMenuClick}
            >
              Гласуване
            </Link>
            <Link
              to="/results"
              className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
              onClick={handleMenuClick}
            >
              Резултати
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                onClick={handleMenuClick}
              >
                Админ
              </Link>
            )}
            <Link
              to="/resources"
              className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
              onClick={handleMenuClick}
            >
              Ресурси
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
              onClick={handleMenuClick}
            >
              За нас
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                  onClick={handleMenuClick}
                >
                  Профил
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                >
                  Изход
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                  onClick={handleMenuClick}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-700 hover:text-purple-600 transition-all duration-300"
                  onClick={handleMenuClick}
                >
                  Регистрация
                </Link>
                <Link to="/connect">
                  <ConnectButton />
                </Link>
                s
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
