export const Question = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex w-full justify-between items-center flex-wrap">
      <h3 className="md:mb-0 mb-4">Walk me through this function</h3>
      <div className="flex flex-wrap">
        <div className="tags grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
          <p className="bg-gray-300 text-bold rounded-full px-4 py-2 h-fit text-sm">
            Software engineering
          </p>
          <p className="bg-gray-300 text-bold rounded-full px-4 py-2 h-fit text-sm">
            Software engineering
          </p>
        </div>
        <div className="difficulty flex py-4">
          <p className="mr-2 text-sm">Hard</p>
          <div className="flex">
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-black rounded-sm mr-[2px]"></div>
            <div className="h-[20px] w-[10px] bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
