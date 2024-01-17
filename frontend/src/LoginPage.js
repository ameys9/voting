import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [voterId, setVoterId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [voterData, setVoterData] = useState(null);
  const [error, setError] = useState(null);

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
          voterId,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed. Please try again.');
      }

      const result = await response.json();

      if (result.success) {
        setVerificationSuccess(true);
        setVoterData(result.voter);
        
      } else {
        
        throw new Error('Verification failed. Please check your Voter ID and Phone Number.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setError(error.message || 'An error occurred during verification. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Voter ID:
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleVerify}>
          Verify
        </button>
      </form>


      {verificationSuccess && (
        <p>
          {/* Render Link only after successful verification */}
          <Link to="/user-data">Proceed to User Data Page</Link>
        </p>
      )}
    </div>
  );
};

export default LoginPage;
