"use client";
import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import QuestionSelector from "@/components/QuestionSelector";
import { motion } from "framer-motion";
import { useState } from "react";

const InterviewCreatorPage = () => {
  const [questionSelector, toggleQuestionSelector] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
    >
      <h1 className="text-6xl mb-12">My Interviews</h1>
      <h2 className="text-4xl mb-12">Let&apos;s start practicing</h2>
      <InterviewCreator toggleQuestionSelector={toggleQuestionSelector} />
      {questionSelector && (
        <QuestionSelector toggleQuestionSelector={toggleQuestionSelector} />
      )}
    </motion.div>
  );
};

export default InterviewCreatorPage;
