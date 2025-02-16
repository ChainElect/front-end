import React, { useCallback, useState } from "react";
import { AuthService } from "services/authService";
import { ERROR_MESSAGES } from "@utils/messages/errorMessages";

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1); // Step 1: Form, Step 2: Confirmation

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError(ERROR_MESSAGES.PASSWORDS_NOT_MATCHING.message);
        return;
      }

      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.idNumber ||
        !formData.phoneNumber
      ) {
        setError(ERROR_MESSAGES.MISSING_FIELDS.message);
        return;
      }

      try {
        await AuthService.registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          idNumber: formData.idNumber,
          phoneNumber: formData.phoneNumber,
        });

        setError(null);
        setStep(2);
      } catch (err) {
        setError(ERROR_MESSAGES.REGISTRATION_FAILED.message);
      }
    },
    [formData]
  );

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
              {[
                { name: "fullName", label: "Пълно име", type: "text" },
                { name: "email", label: "Имейл", type: "email" },
                { name: "password", label: "Парола", type: "password" },
                {
                  name: "confirmPassword",
                  label: "Потвърди паролата",
                  type: "password",
                },
                {
                  name: "idNumber",
                  label: "Номер на лична карта",
                  type: "text",
                },
                {
                  name: "phoneNumber",
                  label: "Мобилен номер",
                  type: "tel",
                },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                    required
                  />
                </div>
              ))}
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
};
