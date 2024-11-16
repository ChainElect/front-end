import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600">
            Свържете се с нас
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Имате въпроси или нужда от помощ? Свържете се с нас чрез формата
            по-долу.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Изпратете съобщение
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Вашето име
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Име"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Имейл адрес
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="example@example.com"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Съобщение
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Вашето съобщение"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition"
              >
                Изпратете
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Информация за контакт
            </h2>
            <p className="text-gray-700">
              Можете да се свържете с нас директно чрез следните канали:
            </p>
            <ul className="mt-4 space-y-4">
              <li>
                <span className="font-medium text-gray-700">Телефон:</span>{" "}
                <a
                  href="tel:+359123456789"
                  className="text-purple-600 hover:underline"
                >
                  +359 123 456 789
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-700">Имейл:</span>{" "}
                <a
                  href="mailto:info@chainelect.com"
                  className="text-purple-600 hover:underline"
                >
                  info@chainelect.com
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-700">Адрес:</span> ул.
                "Демокрация" №12, София, България
              </li>
            </ul>
            <h3 className="text-lg font-medium text-gray-700 mt-6">
              Социални мрежи
            </h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-gray-800"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-gray-800"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-gray-800"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
