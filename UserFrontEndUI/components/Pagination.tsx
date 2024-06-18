import React from "react";

const Pagination = () => {
  return (
    <div className="space-y-2 md:space-y-5 mt-auto">
      <nav
        className="flex items-center justify-between bg-white px-1 py-[2px] mb-[10px]"
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
  );
};

export default Pagination;
