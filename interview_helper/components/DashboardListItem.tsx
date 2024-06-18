import React from "react";

interface Props {
  questionHeading: string;
  questionDescription: string;
  interviewTag: string;
}

interface TagProps {
  interviewTag: string;
}

const CompletedTag = () => {
  return (
    <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
      <span className="mr-1 flex items-center text-emerald-600">
        <svg
          className="h-2 w-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
            fill="#459A5F"
            stroke="#459A5F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
            stroke="#F4FAF4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>
      Completed
    </p>
  );
};

const Tag = ({ interviewTag }: TagProps) => {
  return (
    <p className="inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-gray-300 px-[3px] text-[7px] font-normal hover:bg-gray-50">
      {interviewTag}
    </p>
  );
};

const DashboardListItem = ({
  questionHeading,
  questionDescription,
  interviewTag,
}: Props) => {
  return (
    <li className="list-none relative flex items-stretch text-left">
      <div className="group relative w-full">
        <div className="relative mb-2 flex h-full max-h-[200px] w-full cursor-pointer items-start justify-between rounded-lg p-2 font-medium transition duration-100">
          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-zinc-900/[7.5%] group-hover:ring-zinc-900/10"></div>
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="flex items-center text-left text-[#1a2b3b]">
              <p>{questionHeading}</p>
            </div>
            <p className="text-wrap grow font-normal text-[7px]">
              {questionDescription}
            </p>
            <div className="flex flex-row space-x-1">
              <Tag interviewTag={interviewTag} />
              <CompletedTag />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default DashboardListItem;
