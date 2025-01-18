// src/components/Pages/About.jsx
import React from "react";

export const About = () => {
  return (
    <div className="bg-white min-h-screen mt-10 mb-10">
      {/* Header Section */}
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">За нас</h1>
          <p className="text-lg text-center mt-4">
            Разберете повече за ChainElect и нашата мисия.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">Нашата мисия</h2>
            <p className="mt-4 text-gray-700 text-lg">
              В ChainElect вярваме, че честните и прозрачни избори са основата
              на всяка демокрация. Нашата платформа използва блокчейн технология
              за гарантиране на сигурност, анонимност и прозрачност на изборния
              процес.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">
              Какво предлагаме?
            </h2>
            <ul className="mt-4 space-y-4 text-gray-700 text-lg">
              <li>
                ✅ <span className="font-medium">Прозрачност:</span> Всеки глас
                е записан на блокчейн и е достъпен за проверка, без да се
                нарушава анонимността.
              </li>
              <li>
                ✅ <span className="font-medium">Сигурност:</span> Гласовете не
                могат да бъдат подправени или манипулирани.
              </li>
              <li>
                ✅ <span className="font-medium">Анонимност:</span> Ние
                защитаваме личните данни на всички гласоподаватели.
              </li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600">Нашият екип</h2>
            <p className="mt-4 text-gray-700 text-lg">
              ChainElect е създаден от екип от иноватори, инженери и защитници
              на демократичните процеси. Ние сме отдадени на създаването на
              платформа, която прави гласуването по-достъпно и сигурно за
              всички.
            </p>
          </section>

          {/* Call-to-Action Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Присъединете се към нас
            </h2>
            <p className="mt-4 text-gray-700 text-lg">
              Бъдете част от промяната! Подкрепете ни в създаването на прозрачна
              и честна изборна система.
            </p>
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                Свържете се с нас
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
