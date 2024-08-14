"use client";
import { QuestionGrid } from "@/components/QuestionFinder/QuestionGrid";
import MockQuestionData from "@/app/data/questionData.json";
import React, { useState } from "react";

import { Question } from "@/interfaces/Question";
import { Filters } from "./Filters";

interface Props {
  showFilters?: boolean;
}

const getUniqueTags = (questions: Question[]): string[] => {
  const tagsSet = new Set(questions.flatMap((question) => question.tags || []));
  return Array.from(tagsSet);
};

export const QuestionFinder = ({ showFilters }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const questions = Object.values(MockQuestionData);
  const tags = getUniqueTags(questions);
  const filteredQuestions = questions.filter(
    (question) =>
      selectedTags.every((tag) => question.tags.includes(tag)) &&
      question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showFilters && (
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
      )}

      <QuestionGrid
        questions={filteredQuestions}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </>
  );
};
