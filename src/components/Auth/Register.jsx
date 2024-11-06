import React, { useState } from "react";
import { registerUser } from "../../api.js"; // Adjust the import path based on your structure

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Registration form, Step 2: Confirmation message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Паролите не съвпадат.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.idNumber ||
      !formData.phoneNumber
    ) {
      setError("Моля, попълнете всички задължителни полета.");
      return;
    }

    try {
      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        idNumber: formData.idNumber,
        phoneNumber: formData.phoneNumber,
      });

      setError("");
      setStep(2); // Move to the confirmation step
    } catch (error) {
      setError("Възникна грешка при регистрацията. Моля, опитайте отново.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md min-w-[30rem] p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-900">
          Регистрация
        </h2>
        {step === 1 ? (
          <>
            <p className="text-sm text-gray-500 text-center">
              Моля, попълнете формата за регистрация.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* form fields here as before */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-2 text-white bg-purple-900 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-900"
              >
                Регистрирай се
              </button>
            </form>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-purple-900">
              Регистрацията е успешна!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Можете сега да влезете в профила си.
            </p>
            <a
              href="/login"
              className="mt-4 inline-block px-4 py-2 text-white bg-purple-900 rounded-md hover:bg-purple-800"
            >
              Вход
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
