import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600">
            Политика за поверителност
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Ние се ангажираме с вашата поверителност. Моля, прочетете тази
            политика, за да разберете как използваме вашите данни.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 space-y-8">
          {/* Data Collection Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Събиране на данни
            </h2>
            <p className="mt-4 text-gray-700">
              Ние събираме следната информация за потребителите:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Лична информация, като име, имейл и телефонен номер.</li>
              <li>
                Данни за устройството, като IP адрес, тип на браузъра и
                операционна система.
              </li>
              <li>
                История на действията в платформата, включително гласувания.
              </li>
            </ul>
          </section>

          {/* Data Usage Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Използване на данни
            </h2>
            <p className="mt-4 text-gray-700">
              Вашите данни се използват за следните цели:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>
                За осигуряване на сигурност и идентификация при гласуване.
              </li>
              <li>За подобряване на функционалността на платформата.</li>
              <li>За връзка с вас при възникване на проблеми или въпроси.</li>
            </ul>
          </section>

          {/* Data Protection Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Защита на данни
            </h2>
            <p className="mt-4 text-gray-700">
              Ние използваме най-новите технологии за защита на вашата лична
              информация, включително:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Криптиране на данните по време на пренос.</li>
              <li>Контрол на достъпа и двуфакторна идентификация.</li>
              <li>Постоянен мониторинг за откриване на уязвимости.</li>
            </ul>
          </section>

          {/* User Rights Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">Вашите права</h2>
            <p className="mt-4 text-gray-700">
              Като потребител на платформата, имате следните права:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Право на достъп до вашите данни.</li>
              <li>Право на корекция на грешна информация.</li>
              <li>Право да изискате изтриване на вашите данни.</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600">
              Свържете се с нас
            </h2>
            <p className="mt-4 text-gray-700">
              Ако имате въпроси относно нашата политика за поверителност, моля
              свържете се с нас:
            </p>
            <p className="mt-4 text-gray-700">
              Имейл:{" "}
              <a
                href="mailto:privacy@chainelect.com"
                className="text-purple-600 hover:underline"
              >
                privacy@chainelect.com
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

export default PrivacyPolicy;
