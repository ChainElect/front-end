// src/components/Login.js
import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext.js";
import { AuthService } from "../../services/authService.js";
import { ERROR_MESSAGES } from "../../utilities/messages/errorMessages.js";

export const LoginForm = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    if (idNumber && password) {
      try {
        const response = await AuthService.loginUser({ idNumber, password });
        const token = response.data.token;
        login(token); // Trigger login by setting the token
        navigate("/"); // Redirect to user page
      } catch (error) {
        setError(ERROR_MESSAGES.LOGIN_FAILED);
      }
    } else {
      setError(ERROR_MESSAGES.MISSING_FIELDS);
    }
  }, [idNumber, password, login, navigate]);

  const handleIdNumberChange = useCallback((e) => {
    setIdNumber(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-900">
          Вход в системата
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Моля, влезте с номер на лична карта и парола.
        </p>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="idNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Номер на лична карта
            </label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={handleIdNumberChange}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Парола
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 mt-2 text-white bg-purple-900 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-900"
          >
            Вход
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <a href="/register" className="hover:underline">
            Нямате профил? Регистрация
          </a>
          <a href="/faq" className="hover:underline">
            Помощ / ЧЗВ
          </a>
        </div>
      </div>
    </div>
  );
};
