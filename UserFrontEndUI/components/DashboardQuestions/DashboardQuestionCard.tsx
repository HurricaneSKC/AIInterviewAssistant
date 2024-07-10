import React from "react";
import DashboardCompletedTag from "./DashboardCompletedTag";
import { Question } from "../Dashboard";

interface Props {
  category: string;
  question: string;
  tags: string[];
  onClick: () => void;
}

const DashboardQuestionCard = ({
  category,
  question,
  tags,
  onClick,
}: Props) => {
  return (
    <li
      onClick={onClick}
      className="list-none relative flex items-stretch text-left"
    >
      <div className="group relative w-full">
        <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="flex items-center text-left text-[#1a2b3b]">
              <p>{question}</p>
            </div>
            <p className="text-wrap grow font-normal text-[7px]">{category}</p>
            <div className="flex flex-row space-x-1">
              {tags.map((tag) => (
                <p
                  className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50"
                  key={tag}
                >
                  {tag}
                </p>
              ))}
            </div>
            <DashboardCompletedTag />
          </div>
        </div>
      </div>
    </li>
  );
};

export default DashboardQuestionCard;
