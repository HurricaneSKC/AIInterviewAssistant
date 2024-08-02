import React from "react";

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <p className="bg-gray-300 text-bold rounded-full px-2 py-1 h-fit whitespace-nowrap truncate text-xs">
      {tag}
    </p>
  );
};

export default Tag;
