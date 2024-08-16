interface DifficultyProps {
  difficulty: string;
}

const difficultyMap = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
  Expert: 4,
};

const getColor = (value: number, difficulty: number) => {
  return value <= difficulty ? "bg-black" : "bg-white";
};

export const Difficulty = ({ difficulty }: DifficultyProps) => {
  const difficultyValue = difficultyMap[difficulty];
  return (
    <div
      className={`difficulty h-fit flex justify-center gap-1 bg-gray-300 px-2 py-1 min-w-[120px] rounded-full whitespace-nowrap truncate text-xs text-center cursor-pointer`}
    >
      <p className="mr-2">{difficulty}</p>
      <div className="flex">
        <div
          className={`h-full w-[10px] ${getColor(
            1,
            difficultyValue
          )} rounded-sm mr-[2px]`}
        ></div>
        <div
          className={`h-full w-[10px] ${getColor(
            2,
            difficultyValue
          )} rounded-sm mr-[2px]`}
        ></div>
        <div
          className={`h-full w-[10px] ${getColor(
            3,
            difficultyValue
          )} rounded-sm mr-[2px]`}
        ></div>
        <div
          className={`h-full w-[10px] ${getColor(
            4,
            difficultyValue
          )} border-black rounded-sm`}
        ></div>
      </div>
    </div>
  );
};
