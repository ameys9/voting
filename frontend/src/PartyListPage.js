// PartyPage.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';

const PartyPage = () => {
  const [partyData, setPartyData] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voted, setVoted] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();
  const voterIdFromState = location.state && location.state.voterId;

  useEffect(() => {
    
    

    const fetchPartyData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/partyData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPartyData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching party data:', error);
        setError('Error fetching party data. Please try again.');
        setLoading(false);
      }
    };

    fetchPartyData();
  }, [voterIdFromState]);

  const handlePartySelection = (partyName) => {
    setSelectedParty(partyName);
  };

  const handleVote = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ partyName: selectedParty, voterId: voterIdFromState }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setVoted(true); // Set voted state to true after successful vote
    } catch (error) {
      console.error('Error voting:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && !voted && (
        <div>
          <h1 className="text-4xl font-bold mb-4">Vote for a Party</h1>
          <div className="grid grid-cols-2 gap-4">
            {partyData.map((party) => (
              <button
                key={party._id}
                className={`p-4 rounded-md border ${
                  selectedParty === party.partyName ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handlePartySelection(party.partyName)}
              >
                {party.partyName}
              </button>
            ))}
          </div>
          {selectedParty && (
            <button
              className="mt-4 p-4 bg-green-500 text-white rounded-md"
              onClick={handleVote}
            >
              Vote for {selectedParty}
            </button>
          )}
        </div>
      )}
      {voted && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Thanks for Voting!</h2>
        </div>
      )}
    </div>
  );
};

export default PartyPage;
