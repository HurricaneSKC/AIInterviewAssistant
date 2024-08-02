import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import DashboardListItem from "./DashboardListItem";
import AvatarVideoImage from "./AvatarVideoImage";
import SearchIcon from "./SVGs/SearchIcon";
import Pagination from "./Pagination";

interface Interviewer {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface Props {
  selectedInterviewer: Interviewer;
}

const InterviewerPresentation = ({ selectedInterviewer }: Props) => {
  return (
    <>
      <div className="z-20 absolute h-full w-full bg-transparent cursor-default"></div>
      <div className="text-white flex flex-col items-center justify-center h-full w-full">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            key={selectedInterviewer.id}
            className="text-white text-4xl"
          >
            Meet {selectedInterviewer.name}
          </motion.h2>

          <ul className="mt-[28px] flex">
            <li className="list-none max-w-[400px]">
              Hi there! I{`'`}m {selectedInterviewer.name}, and I{`'`}m here to
              help you with your interview skills
            </li>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-[75%] h-[50%] relative"
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
      </div>
    </>
  );
};

export default InterviewerPresentation;
