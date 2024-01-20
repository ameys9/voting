import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';


const LoginPage = () => {
  // const [voterId, setVoterId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [voterData, setVoterData] = useState(null);
  const [voterId, setVoterId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleVerify = async () => {
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
        setVerificationSuccess(true);
        setVoterData(result.voter);
        setVoterId(voterId);

      // Pass voterId as state when navigating to user data page
      navigate('/user-data', { state: { voterId: voterId } });
     

      } else {
        alert("VOTER DATA NOT AVAILABLE");
      }
    } catch (error) {
      console.error('Error during verification frontend:', error);
      setError(error.message || 'An error occurred during verification. Please try again.');
    }
  };
  

  return (
    <div class="flex justify-center items-center h-screen">
  <div class="bg-gray-100 p-8 rounded shadow-md w-96">
    <h1 class="text-2xl font-bold mb-6">Login Page</h1>
    <form class="space-y-4">
      <div class="flex flex-col">
        <label for="voterId" class="mb-1">Voter ID:</label>
        <input
          id="voterId"
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          class="border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col">
        <label for="phoneNumber" class="mb-1">Phone Number:</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          class="border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={handleVerify}
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Verify
      </button>
    </form>
  </div>
</div>

      
  );
};

export default LoginPage;
