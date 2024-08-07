import React from "react";

const DashboardCompletedTag = () => {
  return (
    <p className="mt-1 inline-flex items-center justify-center truncate rounded-full border-[0.5px] border-[#D0E7DC] bg-[#F3FAF1] px-[3px] text-[7px] font-normal hover:bg-[#edf8ea]">
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

export default DashboardCompletedTag;
