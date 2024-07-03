import { motion } from "framer-motion";
import React from "react";
import QuestionTypeRadioGroup, { Question } from "./QuestionTypeRadioGroup";
import RightArrowButton from "./CTAs/RightArrowButton";
import LinkButton from "./CTAs/LinkButton";
import StepHeading from "./textTags/StepHeading";
import StepParagraph from "./textTags/StepParagraph";
import { DataStructure, InterviewCategory } from "@/pages/demo";

interface SelectedQuestionProps {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selected: InterviewCategory;
  setSelected: React.Dispatch<React.SetStateAction<InterviewCategory>>;
  questions: DataStructure;
}

const QuestionCategorySelector = ({
  setStep,
  selected,
  setSelected,
  questions,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-1"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <StepHeading headingText="Select a question type" />
      <StepParagraph paragraphText="Choose a type to get started." />
      <div>
        <QuestionTypeRadioGroup
          selected={selected}
          setSelected={setSelected}
          questions={Object.values(questions)}
        />
      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <LinkButton pageLink="/" buttonText="Back to home" />
        </div>
        <div>
          <RightArrowButton onClick={() => setStep(2)} buttonText="Continue" />
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCategorySelector;
