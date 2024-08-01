import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import DashboardListItem from "./DashboardListItem";
import AvatarVideoImage from "./AvatarVideoImage";
import SearchIcon from "./SVGs/SearchIcon";
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
  selectedInterviewer: Interviewer;
}

const AltDashboard = ({ step, selectedInterviewer }: Props) => {
  return (
    <>
      <div className="bg-white text-[#667380] p-[18px] flex flex-col">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            key={selectedInterviewer.id}
            className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
          >
            Meet {selectedInterviewer.name}
          </motion.span>

          <ul className="mt-[28px] flex">
            <li className="list-none max-w-[400px]">
              Hi there! I{`'`}m {selectedInterviewer.name}, and I{`'`}m here to
              help you with your interview skills
            </li>
          </ul>
        </div>
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
          </motion.div>
        )}
        {step === 1 && (
          <ul className="mt-[12px] flex items-center space-x-[2px]">
            <SearchIcon />
            <p>Search</p>
          </ul>
        )}
        {step === 1 && <Pagination />}
      </div>
    </>
  );
};

export default AltDashboard;
