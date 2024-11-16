import React from "react";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Добре дошли в ChainElect</h1>
          <p className="mt-4 text-lg">
            Прозрачност, сигурност и доверие в изборния процес чрез блокчейн
            технология.
          </p>
          <div className="mt-8">
            <a
              href="/voting"
              className="px-6 py-3 bg-white text-purple-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition"
            >
              Гласувайте сега
            </a>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-600 text-center">
            Защо да изберете ChainElect?
          </h2>
          <p className="text-lg text-gray-700 text-center mt-4">
            Нашата платформа гарантира честен и прозрачен изборен процес, като
            използва модерна блокчейн технология.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transparency */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-600">
                Прозрачност
              </h3>
              <p className="mt-2 text-gray-700">
                Всеки глас е записан на блокчейн и е достъпен за проверка, без
                нарушаване на анонимността.
              </p>
            </div>

            {/* Security */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m1 4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-600">
                Сигурност
              </h3>
              <p className="mt-2 text-gray-700">
                Блокчейн гарантира, че гласовете не могат да бъдат манипулирани.
              </p>
            </div>

            {/* Privacy */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4a4 4 0 110 8 4 4 0 010-8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.343 14.343a8 8 0 0111.314 0M6.343 14.343A8 8 0 0112 18.657a8 8 0 015.657-4.314"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-600">
                Анонимност
              </h3>
              <p className="mt-2 text-gray-700">
                Ние защитаваме личните ви данни, докато гласувате.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-purple-600">
            Бъдете част от промяната!
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Присъединете се към нас и направете вашия глас важен.
          </p>
          <div className="mt-8">
            <a
              href="/about"
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
            >
              Научете повече
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
