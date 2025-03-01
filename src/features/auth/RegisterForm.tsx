import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthService } from "services/authService";
import { ERROR_MESSAGES } from "@utils/messages/errorMessages";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone } from "react-icons/fa";

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const { primary, secondary, text, background, border, accent } =
    useThemeColors();

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
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-full max-w-md p-8 space-y-6 backdrop-blur-xl shadow-xl border rounded-2xl"
        style={{
          background: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${border} 40%, transparent)`,
        }}
      >
        {/* Title */}
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: primary }}
        >
          {t("auth.register.title")}
        </h2>

        {step === 1 ? (
          <>
            <p
              className="text-sm text-center opacity-80"
              style={{ color: text }}
            >
              {t("auth.register.subtitle")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  name: "fullName",
                  label: t("auth.register.fullName"),
                  type: "text",
                  icon: <FaUser />,
                },
                {
                  name: "email",
                  label: t("auth.register.email"),
                  type: "email",
                  icon: <FaEnvelope />,
                },
                {
                  name: "password",
                  label: t("auth.register.password"),
                  type: "password",
                  icon: <FaLock />,
                },
                {
                  name: "confirmPassword",
                  label: t("auth.register.confirmPassword"),
                  type: "password",
                  icon: <FaLock />,
                },
                {
                  name: "idNumber",
                  label: t("auth.register.idNumber"),
                  type: "text",
                  icon: <FaIdCard />,
                },
                // Uncomment and set up if needed
                // {
                //   name: "phoneNumber",
                //   label: t("auth.register.phoneNumber"),
                //   type: "tel",
                //   icon: <FaPhone />,
                // },
              ].map(({ name, label, type, icon }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={label}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      background: background,
                      borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                      color: text,
                    }}
                  />
                  <div
                    className="absolute right-4 top-3"
                    style={{ color: accent }}
                  >
                    {icon}
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold rounded-lg transition-all"
                style={{
                  background: `linear-gradient(to right, ${primary}, ${secondary})`,
                  color: "white",
                }}
              >
                {t("auth.register.registerButton")}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-center" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </>
        ) : (
          // Success Message
          <div className="text-center">
            <p className="text-xl font-semibold" style={{ color: primary }}>
              {t("auth.register.successTitle")}
            </p>
            <p className="text-sm mt-2 opacity-80" style={{ color: text }}>
              {t("auth.register.successSubtitle")}
            </p>
            <a
              href="/login"
              className="mt-4 inline-block px-4 py-3 font-semibold rounded-lg transition-all"
              style={{
                background: `linear-gradient(to right, ${primary}, ${secondary})`,
                color: "white",
              }}
            >
              {t("auth.register.loginLink")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
