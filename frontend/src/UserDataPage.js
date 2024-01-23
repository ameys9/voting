// frontend/src/views/UserDataPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';

const UserDataPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const voterIdFromState = location.state && location.state.voterId;
  const handleclick = function(){
    navigate('/party-list', { state: { voterId: voterIdFromState } })
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/userData?voterId=${voterIdFromState}`, {
          method: 'GET', // Change method to GET since you are fetching data
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
   console.log(voterIdFromState);
   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">User Data Page</h1>

      {loading && (
        <div className="text-xl animate-bounce mb-4">Loading user data...</div>
      )}

      {error && (
        <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      {userData && (
        <div className="bg-white p-8 rounded-md 3 shadow-md w-96 text-black">
          <h1 className="text-2xl rounded-3 font-bold mb-4">User Details</h1>
          <p className="mb-2">Name: {userData.name}</p>
          <p className="mb-2">Voter ID: {userData.voterId}</p>
          <p className="mb-2">Phone Number: {userData.phoneNumber}</p>
          <p className="mb-2">Address: {userData.address}</p>
          <p className="mb-2">Date of Birth: {userData.dob}</p>
          {userData.hasVoted && (
          <p className="mb-2">Voted :</p>)}

          <button
            onClick={handleclick}

            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDataPage;
