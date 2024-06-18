import { RadioGroup } from "@headlessui/react";
import React from "react";
import USFlagSVG from "./USFlagSVG";

export interface Interviewer {
  id: string;
  name: string;
  description: string;
  level: string;
}

interface Props {
  selectedInterviewer: Interviewer;
  setSelectedInterviewer: React.Dispatch<React.SetStateAction<Interviewer>>;
  interviewers: Interviewer[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SelectedInterviewerRadioGroup = ({
  selectedInterviewer,
  setSelectedInterviewer,
  interviewers,
}: Props) => {
  return (
    <RadioGroup value={selectedInterviewer} onChange={setSelectedInterviewer}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {interviewers.map((interviewer) => (
          <RadioGroup.Option
            key={interviewer.name}
            value={interviewer}
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
                      {interviewer.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block">{interviewer.description}</span>
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="flex text-sm ml-4 mt-0 flex-col text-right items-center justify-center"
                >
                  <span className=" text-gray-500">
                    <USFlagSVG />
                  </span>
                  <span className="font-medium text-gray-900">EN</span>
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

export default SelectedInterviewerRadioGroup;
