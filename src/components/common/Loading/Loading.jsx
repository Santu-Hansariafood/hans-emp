import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
