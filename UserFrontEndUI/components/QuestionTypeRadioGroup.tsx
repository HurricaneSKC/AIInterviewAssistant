import { RadioGroup } from "@headlessui/react";
import React, { Dispatch, SetStateAction } from "react";
import EasySVG from "./EasySVG";
import MediumSVG from "./MediumSVG";
import { InterviewCategory } from "@/pages/demo";

export interface Question {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

interface Props {
  selected: InterviewCategory;
  setSelected: Dispatch<SetStateAction<InterviewCategory>>;
  questions: Question[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const QuestionTypeRadioGroup = ({
  selected,
  setSelected,
  questions,
}: Props) => {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {questions.map((question) => (
          <RadioGroup.Option
            key={question.name}
            value={question}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-blue-500 ring-2 ring-blue-200" : "",
                "relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none flex justify-between"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className="font-medium text-gray-900"
                    >
                      {question.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block">{question.description}</span>
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="flex text-sm ml-4 mt-0 flex-col text-right items-center justify-center"
                >
                  <span className=" text-gray-500">
                    {question.difficulty === "Easy" ? (
                      <EasySVG />
                    ) : (
                      <MediumSVG />
                    )}
                  </span>
                  <span className="font-medium text-gray-900">
                    {question.difficulty}
                  </span>
                </RadioGroup.Description>
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-blue-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default QuestionTypeRadioGroup;
