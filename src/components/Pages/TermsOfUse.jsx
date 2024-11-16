import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600">
            Условия за използване
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Прочетете внимателно тези условия преди да използвате нашата
            платформа.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 space-y-8">
          {/* General Terms Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">Общи условия</h2>
            <p className="mt-4 text-gray-700">
              С използването на платформата вие се съгласявате с тези условия и
              приемате да спазвате правилата, посочени по-долу:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Платформата е предназначена само за законно използване.</li>
              <li>
                Потребителите са отговорни за предоставянето на точна и вярна
                информация.
              </li>
              <li>
                Забранява се разпространяването на съдържание, което е
                незаконно, вредно или нарушава правата на трети лица.
              </li>
            </ul>
          </section>

          {/* User Responsibilities Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Отговорности на потребителя
            </h2>
            <p className="mt-4 text-gray-700">
              Като потребител на платформата вие се задължавате:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>
                Да не използвате платформата за измами или незаконни действия.
              </li>
              <li>
                Да пазите поверителността на вашите данни за достъп (например
                парола).
              </li>
              <li>
                Да уведомите администратора за всякакви подозрителни дейности,
                свързани с вашия профил.
              </li>
            </ul>
          </section>

          {/* Platform Usage Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Използване на платформата
            </h2>
            <p className="mt-4 text-gray-700">
              Ние си запазваме правото да прекратим достъпа ви до платформата в
              следните случаи:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Нарушение на условията за използване.</li>
              <li>Разпространение на вредно или зловредно съдържание.</li>
              <li>Използване на платформата за неоторизирани цели.</li>
            </ul>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Ограничение на отговорността
            </h2>
            <p className="mt-4 text-gray-700">
              Платформата се предоставя "както е" без никакви гаранции. Ние не
              носим отговорност за:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Прекъсвания или грешки в работата на платформата.</li>
              <li>Загуба на данни или друга информация.</li>
              <li>
                Неправилно използване на платформата от страна на потребителя.
              </li>
            </ul>
          </section>

          {/* Amendments Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Промени в условията
            </h2>
            <p className="mt-4 text-gray-700">
              Ние си запазваме правото да актуализираме тези условия по всяко
              време. Промените ще бъдат публикувани на тази страница, и вашето
              продължаващо използване на платформата ще се счита за съгласие с
              новите условия.
            </p>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Свържете се с нас
            </h2>
            <p className="mt-4 text-gray-700">
              Ако имате въпроси относно тези условия, моля свържете се с нас:
            </p>
            <p className="mt-4 text-gray-700">
              Имейл:{" "}
              <a
                href="mailto:terms@chainelect.com"
                className="text-purple-600 hover:underline"
              >
                terms@chainelect.com
              </a>
            </p>
            <p className="mt-2 text-gray-700">
              Телефон:{" "}
              <a
                href="tel:+359123456789"
                className="text-purple-600 hover:underline"
              >
                +359 123 456 789
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
