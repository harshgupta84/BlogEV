import React from "react";

const Spinner = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">{title}</p>
    </div>
  );
};

export default Spinner;
