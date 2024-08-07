import React from "react";

interface Props {
  selectedItem?: boolean;
  listItemText: string;
}

const ListItem = ({ selectedItem, listItemText }: Props) => {
  return (
    <>
      {!selectedItem ? (
        <li className="list-none flex items-center rounded-[3px] relative bg-white text-gray-600 w-full m-0 cursor-pointer hover:bg-[#F7F7F8] focus:outline-none py-[4px]">
          <div className="bg-[#e8e8ed] pointer-events-none absolute left-[7px] z-10 top-1/2 h-[3px] w-[3px] rounded-full transform -translate-y-1/2"></div>
          <div className="text-gray-600 truncate pr-4 pl-[18px]">
            {listItemText}
          </div>
        </li>
      ) : (
        <li className="list-none flex items-center rounded-[3px] relative bg-gray-100 text-gray-600 w-full m-0 cursor-pointer hover:bg-[#F7F7F8] focus:outline-none py-[4px]">
          <div className="bg-blue-600 pointer-events-none absolute left-[7px] z-10 top-1/2 h-[3px] w-[3px] rounded-full transform -translate-y-1/2"></div>
          <div className="text-blue-600 truncate pr-4 pl-[18px]">
            {listItemText}
          </div>
        </li>
      )}
    </>
  );
};

export default ListItem;
