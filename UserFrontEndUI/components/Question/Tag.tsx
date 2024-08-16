"use client";
import React from "react";

interface TagProps {
  tag: string;
  selected?: boolean;
  toggleTag?: () => void;
}

const Tag = ({ tag, selected, toggleTag }: TagProps) => {
  return (
    <p
      onClick={toggleTag}
      className={`${
        selected ? "bg-primary text-white" : "bg-gray-300"
      } text-bold rounded-full px-2 py-1 h-fit whitespace-nowrap truncate text-xs text-center cursor-pointer`}
    >
      {tag}
    </p>
  );
};

export default Tag;
