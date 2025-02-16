import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";

export const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null); // ✅ Remove <number>

  const { primary, secondary, text, background } = useThemeColors(); // ✅ Use Web3 theme colors

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: background }}
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl font-extrabold text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${primary}, ${secondary})`,
          }}
        >
          Често задавани въпроси
        </h1>
        <p
          className="text-lg text-center opacity-90 mt-4"
          style={{ color: text }}
        >
          Намерете отговори на най-често задаваните въпроси относно ChainElect.
        </p>

        <div className="mt-12 space-y-6">
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-lg border border-transparent bg-opacity-10 p-5 shadow-md cursor-pointer hover:border-primary/40 transition-all"
              style={{
                backgroundColor: `rgba(255, 255, 255, 0.05)`,
                borderColor: openQuestion === index ? primary : "transparent",
              }}
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: openQuestion === index ? secondary : text,
                  }}
                >
                  {q.question}
                </h3>
                {openQuestion === index ? (
                  <FaChevronUp className="text-secondary" />
                ) : (
                  <FaChevronDown className="text-primary" />
                )}
              </div>
              {openQuestion === index && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-opacity-80"
                  style={{ color: text }}
                >
                  {q.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
