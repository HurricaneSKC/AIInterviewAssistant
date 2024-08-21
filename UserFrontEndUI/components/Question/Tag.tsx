"use client";
import { toggleTag } from "@/utils/toggleTag";
import React from "react";

interface TagProps {
  tag: string;
  selectedTags?: string[];
  setSelectedTags?: (tags: string[]) => void;
}

const Tag = ({ tag, selectedTags, setSelectedTags }: TagProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Stopped");
    selectedTags &&
      setSelectedTags &&
      toggleTag(tag, setSelectedTags, selectedTags);
  };

  const selected = selectedTags && selectedTags.includes(tag);

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`${
        selected ? "bg-primary text-white" : "bg-gray-300"
      } text-bold rounded-full px-2 py-1 h-fit whitespace-nowrap truncate text-xs text-center cursor-pointer`}
    >
      {tag}
    </button>
  );
};

export default Tag;
