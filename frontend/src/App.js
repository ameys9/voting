import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import UserDataPage from './UserDataPage.js';
import PartyListPage from './PartyListPage.js';

const App = () => {
  const [voteCounter, setVoteCounter] = useState(0);

  const handleVote = () => {
    setVoteCounter(voteCounter + 1);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/user-data"
          element={<UserDataPage handleVote={handleVote} />}
        />
        <Route
          path="/party-list"
          element={<PartyListPage voteCounter={voteCounter} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
