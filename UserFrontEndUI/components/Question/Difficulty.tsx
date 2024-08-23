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
  return value <= difficulty ? "bg-black" : "bg-gray-300";
};

export const Difficulty = ({ difficulty }: DifficultyProps) => {
  const difficultyValue =
    difficultyMap[difficulty as keyof typeof difficultyMap];
  return (
    <div
      className={`difficulty h-fit flex justify-between gap-1 whitespace-nowrap truncate text-xs text-center cursor-pointer`}
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
          )} rounded-sm`}
        ></div>
      </div>
    </div>
  );
};
