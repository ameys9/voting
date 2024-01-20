// frontend/src/views/UserDataPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserDataPage = ({ handleVote }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const voterIdFromState = location.state && location.state.voterId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/verify?voterId=${voterIdFromState}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [voterIdFromState]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">User Data Page</h1>

      {loading && <p className="text-gray-600">Loading user data...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <p className="mb-2">Name: {userData.name}</p>
          <p className="mb-2">Voter ID: {userData.voterId}</p>
          <p className="mb-2">Phone Number: {userData.phoneNumber}</p>
          <p className="mb-2">Address: {userData.address}</p>
          <p className="mb-2">Date of Birth: {userData.dob}</p>

          <button
            onClick={handleVote}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDataPage;
