"use client";

import { InterviewCreator } from "@/components/InterviewCreator/InterviewCreator";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Question } from "@/components/Question/Question";

const DashboardPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionPlaylist, setEditingQuestionPlaylist] = useState(false);
  return (
    <>
      <h1 className="text-4xl mb-12">Let&apos;s start practicing</h1>
      <InterviewCreator
        setEditingQuestionPlaylist={setEditingQuestionPlaylist}
      />
      {editingQuestionPlaylist && (
        <>
          <div
            onClick={() => setEditingQuestionPlaylist(false)}
            className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)]"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex p-8 flex-col overflow-y-auto fixed top-0 right-0 bottom-0 lg:w-[40vw] w-full bg-white"
            >
              <div className="flex justify-between">
                <h3>Add a question</h3>
                <a>View question bank</a>
              </div>
              <div className="flex-grow w-full grid grid-cols-1 gap-2">
                <Question background="gray" />
                <Question background="gray" />
                <Question background="gray" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
