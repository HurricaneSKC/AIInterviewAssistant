import React from "react";

const Chevron = () => {
  return (
    <div className="ml-auto text-[#121217] transform">
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="w-3 h-3 stroke-current fill-transparent rotate-180 transform"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15.25 10.75L12 14.25L8.75 10.75"
        ></path>
      </svg>
    </div>
  );
};

export default Chevron;
