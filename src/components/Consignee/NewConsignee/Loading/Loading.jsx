import React from "react";

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold">Submitting Please Wait...</h2>
    </div>
  </div>
);

export default Loading;
