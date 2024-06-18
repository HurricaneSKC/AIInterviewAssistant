import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import DashboardListItem from "./DashboardListItem";
import AvatarVideoImage from "./AvatarVideoImage";
import SearchIcon from "./SearchIcon";
import Pagination from "./Pagination";

interface Question {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

interface Interviewer {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface QuestionType {
  behaviour: string;
  programming: string;
  product: string;
  other: string;
}

interface Props {
  step: number;
  selected: Question;
  selectedInterviewer: Interviewer;
  questionTypes?: QuestionType;
}

const AltDashboard = ({
  step,
  selected,
  selectedInterviewer,
  questionTypes,
}: Props) => {
  return (
    <>
      <div className="bg-white text-[#667380] p-[18px] flex flex-col">
        {step === 1 ? (
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
            >
              {selected.name} Questions
            </motion.span>

            <ul className="mt-[28px] flex">
              <li className="list-none max-w-[400px]">
                Search through all of the questions in the question bank. If you
                don{`'`}t see one you{`'`}re looking for, you can always add it
                in your the {`"`}My Questions{`"`} section.
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
            >
              Meet {selectedInterviewer.name}
            </motion.span>

            <ul className="mt-[28px] flex">
              {selected.name === "Behavioral" ? (
                <li className="list-none max-w-[400px]">
                  Start off by walking me through your resume.
                </li>
              ) : (
                <li className="list-none max-w-[400px]">
                  Hi there! I{`'`}m {selectedInterviewer.name}, and I{`'`}m here
                  to help you with your interview skills
                </li>
              )}
            </ul>
          </div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-[12px] flex bg-gray-100 h-[80%] rounded-lg relative ring-1 ring-gray-900/5 shadow-md"
          >
            {selectedInterviewer.name === "Lucy" ? (
              <AvatarVideoImage
                src="/placeholders/Lucy.webp"
                alt="Lucy's Interviewer Profile"
              />
            ) : selectedInterviewer.name === "Sarah" ? (
              <AvatarVideoImage
                src="/placeholders/Sarah.webp"
                alt="Sarah's Interviewer Profile"
              />
            ) : selectedInterviewer.name === "Richard" ? (
              <AvatarVideoImage
                src="/placeholders/Richard.webp"
                alt="Richard's Interviewer Profile"
              />
            ) : (
              <div className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded"></div>
            )}
            {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-red-400 ring-4 ring-white rounded-full"></div> */}
          </motion.div>
        )}
        {step === 1 && (
          <ul className="mt-[12px] flex items-center space-x-[2px]">
            <SearchIcon />
            <p>Search</p>
          </ul>
        )}
        {step === 1 &&
          (selected.name === "Behavioral" ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="mt-3 grid grid-cols-1 xl:grid-cols-1 gap-2"
            >
              <DashboardListItem
                questionHeading={"Why this company?"}
                questionDescription={"Why do you want to work for EPAM?"}
                interviewTag={"Product Management"}
              />
              <DashboardListItem
                questionHeading={"What are you most proud of?"}
                questionDescription={
                  "Tell me about the thing you are most proud of. Why is it so important to you?"
                }
                interviewTag={"General"}
              />
              <DashboardListItem
                questionHeading={"Tell me about yourself"}
                questionDescription={
                  "Walk me through your resume, projects, and anything you feel is relevant to your story."
                }
                interviewTag={"Product Management"}
              />
              <DashboardListItem
                questionHeading={"What are your strengths?"}
                questionDescription={
                  "Tell me about your strengths and why you would make a strong candidate."
                }
                interviewTag={"Software Engineering"}
              />
              <DashboardListItem
                questionHeading={"What are your weaknesses?"}
                questionDescription={
                  "Tell me about your weaknesses, and how that has impacted your previous work."
                }
                interviewTag={"Product Management"}
              />
            </motion.ul>
          ) : (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              key={selected.id}
              className="mt-3 grid grid-cols-1 xl:grid-cols-1 gap-2"
            >
              <DashboardListItem
                questionHeading={"Walk me through this function"}
                questionDescription={
                  "Explain in as much detail as you can what this function does, including its time and space..."
                }
                interviewTag={"Software Engineering"}
              />
              <DashboardListItem
                questionHeading={"Epam product expansion"}
                questionDescription={
                  "Epam is looking to expand its product line and wants your take on how..."
                }
                interviewTag={"Product Management"}
              />
              <DashboardListItem
                questionHeading={"How would you rebuild your latest project?"}
                questionDescription={
                  "Given what you know about your latest project, how would you architect it from the ground up?"
                }
                interviewTag={"Systems Design"}
              />
              <DashboardListItem
                questionHeading={"Weighing an Airplane"}
                questionDescription={
                  "How would you weigh a plane without a scale?"
                }
                interviewTag={"Brainteaser"}
              />
            </motion.ul>
          ))}
        {step === 1 && <Pagination />}
      </div>
    </>
  );
};

export default AltDashboard;
