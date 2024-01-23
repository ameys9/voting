import React from 'react';

export const Nothing = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-indigo-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Already Voted</h1>
        <p className="text-gray-700">You have already voted.</p>
        {/* Add any additional content or styling as needed */}
      </div>
    </div>
  );
};

