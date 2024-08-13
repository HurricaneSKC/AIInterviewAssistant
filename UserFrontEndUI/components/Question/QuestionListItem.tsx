"use client";
import { Question } from "@/interfaces/Question";
import Tag from "./Tag";

interface Props {
  question: Question;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export const QuestionListItem = ({
  question,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const { question: questionText, tags } = question;
  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="question bg-gray-100 rounded flex flex-col justify-between p-4">
      <p>{questionText}</p>
      <div className="tags flex flex-wrap gap-2 items-center mt-4">
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            selected={selectedTags && selectedTags.includes(tag)}
            toggleTag={() => toggleTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};
