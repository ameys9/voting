// NumericKeyboard Component
import React from 'react';

const NumericKeyboard = ({ setInputValue }) => {
  const handleKeyPress = (key) => {
    setInputValue((prevValue) => (prevValue || '') + key);
  };

  const handleBackspace = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  return (
    <div className="grid grid-cols-3 gap-16" style={{ width: '16rem' }}> {/* Updated width and increased gap */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          key={number}
          onClick={() => handleKeyPress(number.toString())}
          className="bg-gray-200 text-gray-800 p-8 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray"  
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleBackspace}
        className="bg-red-500 text-white p-8 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"  
      >
        ←
      </button>
    </div>
  );
};

export default NumericKeyboard;
