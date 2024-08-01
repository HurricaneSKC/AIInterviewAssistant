import { motion } from "framer-motion";
import React from "react";
import RightArrowButton from "./CTAs/RightArrowButton";
import SelectedInterviewerRadioGroup, {
  Interviewer,
} from "./SelectedInterviewerRadioGroup";
import WhiteButton from "./CTAs/WhiteButton";
import StepParagraph from "./textTags/StepParagraph";
import useInterviewerStore from "@/app/data/stores/interviewers";
import H2 from "./textTags/H2";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedInterviewer: Interviewer;
  setSelectedInterviewer: React.Dispatch<React.SetStateAction<Interviewer>>;
}

const InterviewerSelector = ({
  setStep,
  selectedInterviewer,
  setSelectedInterviewer,
}: Props) => {
  const interviewers = useInterviewerStore((state) => state.interviewers);

  console.log(interviewers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-2"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <H2 text="Select an interviewer" />
      <StepParagraph
        paragraphText="Choose whoever makes you feel comfortable. You can always 
        try again with another one."
      />
      <div>
        <SelectedInterviewerRadioGroup
          selectedInterviewer={selectedInterviewer}
          setSelectedInterviewer={setSelectedInterviewer}
          interviewers={interviewers}
        />
      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          {/* <WhiteButton onClick={() => setStep(1)} buttonText="Previous step" /> */}
        </div>
        <div>
          <RightArrowButton onClick={() => setStep(2)} buttonText="Continue" />
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewerSelector;
