import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import ListItem from "./DashboardNavigation/ListItem";
import DashboardNavigation from "./DashboardNavigation/DashboardNavigation";
import DashboardQuestionCard from "./DashboardQuestions/DashboardQuestionCard";
import questionsMock from "../app/data/questionData.json";
import useQuestionPlaylistStore from "@/app/data/stores/questionPlaylist";

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  tags: string[];
}

export interface Questions {
  [key: string]: Question;
}

interface Props {
  // setQuestionPlaylist: React.Dispatch<React.SetStateAction<Question[]>>;
  questionPlaylist?: Question[];
  questions: Questions;
}

const Dashboard = () => {
  const QuestionPlaylist = useQuestionPlaylistStore((state) => state.questions);
  const addQuestionToQuestionPlaylist = useQuestionPlaylistStore(
    (state) => state.addQuestion
  );

  const questionArray = Object.values(questionsMock);

  return (
    <figure
      className="absolute grid h-full w-full overflow-hidden"
      style={{
        grid: "100% / calc(10px * 28) 1fr calc(10px * 28)",
      }}
    >
      <DashboardNavigation />
      <div className="bg-white text-[#667380] p-[18px] flex flex-col">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-[#1a2b3b] text-[14px] leading-[18px] font-semibold absolute"
          >
            Questions
          </motion.span>

          <ul className="mt-[28px] flex">
            <li className="list-none max-w-[400px]">
              Search through all of the questions in the question bank. If you
              don{`'`}t see one you{`'`}re looking for, you can always add it in
              your the {`"`}My Questions{`"`} section.
            </li>
          </ul>
        </div>

        <ul className="mt-[12px] flex items-center space-x-[2px]">
          <svg
            className="w-4 h-4 text-[#1a2b3b]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
            ></path>
          </svg>

          <p>Search</p>
        </ul>
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-3 grid gap-2"
        >
          {questionArray.map((question) => (
            <DashboardQuestionCard
              key={question.id}
              category={question.category}
              question={question.question}
              tags={question.tags}
              onClick={() => addQuestionToQuestionPlaylist(question)}
            />
          ))}
        </motion.ul>

        <div className="space-y-2 md:space-y-5 mt-auto">
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-1 py-[2px] mb-[10px]"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className=" text-[#1a2b3b]">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">9</span> of{" "}
                <span className="font-medium">500</span> results
              </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              <button className="relative inline-flex cursor-auto items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded border border-gray-300 bg-white px-[4px] py-[2px]  font-medium text-[#1a2b3b] hover:bg-gray-50">
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div
        className="bg-white flex flex-col text-[#1a2b3b] p-[18px] rounded-lg relative"
        style={{ boxShadow: "inset -1px 0 0 #fff" }}
      >
        <h2 className="text-[12px] font-extrabold text-[#1E293B]">Playlist</h2>
        <ul className="mb-auto list-none">
          {QuestionPlaylist.map((question) => (
            <li
              key={question.id}
              className="list-none flex items-center"
              onClick={() => console.log("Clicked on question")}
            >
              <p className="text-[12px] font-extrabold text-[#1E293B]">
                {question.question}
              </p>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col mb-[10px]">
          <hr className="border-[#e8e8ed] w-full" />
          <li className="mt-4 list-none flex items-center rounded-[9px] text-gray-900 py-[2px]">
            <Link href="/session" className="ml-[3px] mr-[6px]">
              Start Session
            </Link>
          </li>
        </ul>
      </div>
    </figure>
  );
};

export default Dashboard;
