// src/components/Pages/Resources.jsx
import React from "react";

const Resources = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Ресурси</h1>
          <p className="text-lg text-center mt-4">
            Полезна информация и ръководства за използване на ChainElect.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tutorials Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">
              Ръководства за потребители
            </h2>
            <ul className="mt-4 space-y-4">
              <li className="text-gray-700 text-lg">
                📘{" "}
                <a
                  href="/guide/voting"
                  className="text-purple-600 hover:underline"
                >
                  Как да гласувате с ChainElect
                </a>
              </li>
              <li className="text-gray-700 text-lg">
                📘{" "}
                <a
                  href="/guide/connect-wallet"
                  className="text-purple-600 hover:underline"
                >
                  Как да свържете вашия крипто портфейл
                </a>
              </li>
              <li className="text-gray-700 text-lg">
                📘{" "}
                <a
                  href="/guide/results"
                  className="text-purple-600 hover:underline"
                >
                  Как да проверите резултатите от изборите
                </a>
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">
              Често задавани въпроси
            </h2>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold text-gray-800">
                  ❓ Как да се регистрирам в платформата?
                </h3>
                <p className="mt-2 text-gray-600">
                  Можете да се регистрирате чрез предоставяне на вашата
                  електронна поща и създаване на парола. След това следвайте
                  стъпките за верификация.
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold text-gray-800">
                  ❓ Сигурно ли е гласуването през ChainElect?
                </h3>
                <p className="mt-2 text-gray-600">
                  Да! Платформата използва блокчейн технология, която гарантира,
                  че гласовете не могат да бъдат манипулирани.
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold text-gray-800">
                  ❓ Как да проверя моя глас?
                </h3>
                <p className="mt-2 text-gray-600">
                  След като гласувате, ще получите уникален хеш, който можете да
                  използвате за проверка в системата.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Resources Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">
              Допълнителни ресурси
            </h2>
            <ul className="mt-4 space-y-4">
              <li className="text-gray-700 text-lg">
                🔗{" "}
                <a
                  href="https://ethereum.org"
                  className="text-purple-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Научете повече за блокчейн технологията
                </a>
              </li>
              <li className="text-gray-700 text-lg">
                🔗{" "}
                <a
                  href="https://metamask.io"
                  className="text-purple-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Инсталирайте MetaMask
                </a>
              </li>
              <li className="text-gray-700 text-lg">
                🔗{" "}
                <a href="/contact" className="text-purple-600 hover:underline">
                  Свържете се с нас за повече информация
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Resources;
