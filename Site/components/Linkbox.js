import React from "react";

const Linkbox = ({ lbTitle, lbNumber, lbSvg, lbTheme }) => {
  return (
    <div className="flex items-center p-8 bg-white shadow border rounded-lg">
      <div className={`bg-${lbTheme}-500 inline-flex items-center justify-center h-16 w-16 rounded-full mr-6`}>
        <img src={`/svg/${lbSvg}.svg`} className="w-8 h-8" alt={`${lbTitle} icon`} />
      </div>
      <div>
        <span className="inline-block text-2xl font-bold">{lbNumber}</span>
        <span className="block text-gray-500 font-bold">{lbTitle}</span>
      </div>
    </div>
  );
};

export default Linkbox;
