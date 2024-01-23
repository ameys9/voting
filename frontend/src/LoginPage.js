import React, { useState } from 'react';
import NumericKeyboard from './NumericKeyboard';
import { Link , useNavigate} from 'react-router-dom';


const LoginPage = () => {
  // const [voterId, setVoterId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [voterData, setVoterData] = useState(null);
  const [voterId, setVoterId] = useState(null);
  const [error, setError] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (voterId.trim() === '' || phoneNumber.trim() === '') {
        alert('Please provide both Voter ID and Phone Number');
        return;
      }
  
      const response = await fetch('http://localhost:3000/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voterId: voterId,
          phoneNumber: phoneNumber,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.success) {
        if (result.voter.hasVoted) {
          // Voter has already voted, navigate to /alreadyVoted page
          navigate('/alreadyVoted');
        } else {
          // Voter has not voted, proceed to user data page
          setVerificationSuccess(true);
          setVoterData(result.voter);
          setVoterId(voterId);
  
          // Pass voterId as state when navigating to user data page
          navigate('/user-data', { state: { voterId: voterId } });
        }
      } else {
        alert("VOTER DATA NOT AVAILABLE");
      }
    } catch (error) {
      console.error('Error during verification frontend:', error);
      setError(error.message || 'An error occurred during verification. Please try again.');
    }
  };
  
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleKeyPress = (e) => {
    // Prevent form submission when typing numbers
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerify();
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen p-8"
      style={{
        backgroundImage: "url('./downloadvoting.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
        {/* User Input */}
        <div className="flex flex-col mr-4 p-8 bg-white rounded-lg shadow-lg text-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Login Page</h1>
          <div className="flex flex-col">
            <label htmlFor="voterId" className="text-gray-700 mb-1">
              Voter ID:
            </label>
            <input
              id="voterId"
              type="text"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              onFocus={() => handleInputFocus('voterId')}
              onKeyPress={handleKeyPress}
              className="border p-2 rounded focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="phoneNumber" className="text-gray-700 mb-1">
              Phone Number:
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onFocus={() => handleInputFocus('phoneNumber')}
              onKeyPress={handleKeyPress}
              className="border p-2 rounded focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="button"
            onClick={handleVerify}
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-4"
          >
            Verify
          </button>
        </div>

        {/* Spacing between components */}
        <div className="w-40" />

        {/* Numeric Keyboard */}
        <div className="flex flex-col ml-4">
          <NumericKeyboard setInputValue={focusedInput === 'voterId' ? setVoterId : setPhoneNumber} />
        </div>
      </div>
    
  );
};


export default LoginPage;