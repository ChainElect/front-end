import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { Paragraph, Title } from "@theme/src/foundation/typography";
import { useFAQData } from "./useFAQData";
import { FAQItem } from "./useFAQData";

export const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const { primary, text, background } = useThemeColors();
  const { faqTitle, faqSubtitle, questions } = useFAQData();

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: background }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <Title variant="gradient" as="h1" className="mt-4">
          {faqTitle}
        </Title>
        <Paragraph weight="semibold" className="mt-4">
          {faqSubtitle}
        </Paragraph>

        <div className="mt-12 space-y-6">
          {questions.map((q: FAQItem, index: number) => (
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
                <Title
                  as="h3"
                  size="xl"
                  variant={openQuestion === index ? "gradient" : "solid"}
                >
                  {q.question}
                </Title>
                {openQuestion === index ? (
                  <FaChevronUp style={{ color: primary }} />
                ) : (
                  <FaChevronDown style={{ color: primary }} />
                )}
              </div>
              {openQuestion === index && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-opacity-80 text-left"
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
