import React, { useState } from "react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "Как да се регистрирам в платформата?",
      answer:
        "Можете да се регистрирате, като създадете профил с вашия имейл и парола. След това следвайте стъпките за верификация.",
    },
    {
      question: "Какво е блокчейн и защо се използва за гласуване?",
      answer:
        "Блокчейн е децентрализирана технология, която гарантира, че вашите гласове са сигурни и не могат да бъдат манипулирани.",
    },
    {
      question: "Мога ли да проверя дали моят глас е отчетен правилно?",
      answer:
        "Да, след като гласувате, ще получите уникален хеш-код, с който можете да проверите записа на вашия глас в системата.",
    },
    {
      question: "Колко време ще отнеме гласуването?",
      answer:
        "Процесът на гласуване е бърз и отнема само няколко минути. Уверете се, че сте подготвени с валидна идентификация.",
    },
    {
      question: "Какви са изискванията за гласуване?",
      answer:
        "Трябва да имате навършени 18 години и да разполагате с валиден документ за идентификация.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-purple-600 text-center">
          Често задавани въпроси
        </h1>
        <p className="text-lg text-gray-700 text-center mt-4">
          Намерете отговори на най-често задаваните въпроси относно ChainElect.
        </p>

        <div className="mt-12 space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-purple-600">
                  {q.question}
                </h3>
                <span
                  className={`transform transition-transform ${
                    openQuestion === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </div>
              {openQuestion === index && (
                <p
                  className="mt-4 text-gray-700 break-words"
                  style={{
                    maxWidth: "600px", // Limits the width of the answer content
                    wordWrap: "break-word", // Ensures long words break within the container
                    overflowWrap: "break-word", // Similar to wordWrap, ensures proper wrapping
                  }}
                >
                  {q.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
