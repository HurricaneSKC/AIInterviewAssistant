import React from "react";

interface Props {
  seconds: number;
}

const CountDownTimer = ({ seconds }: Props) => {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
      {new Date(seconds * 1000).toISOString().slice(14, 19)}
    </span>
  );
};

export default CountDownTimer;
