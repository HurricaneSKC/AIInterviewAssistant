export const Question = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex w-full justify-between align-middle flex-wrap">
      <h3>Walk me through this function</h3>
      <div className="flex flex-wrap">
        <div className="tags flex flex-wrap">
          <div className="bg-gray-300 text-bold rounded-full p-2 m-1">
            Software engineering
          </div>
          <div className="bg-gray-300 text-bold rounded-full p-2 m-1">
            Software engineering
          </div>
        </div>
        <div className="difficulty flex justify-between p-4">
          <p className="mr-2">Hard</p>
          <div className="flex">
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[1px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[1px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[1px]"></div>
            <div className="h-[20px] w-[10px] bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
