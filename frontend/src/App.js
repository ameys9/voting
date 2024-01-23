import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import UserDataPage from './UserDataPage.js';
import PartyListPage from './PartyListPage.js';
import { Nothing } from './nothing.js';

const App = () => {
  

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/user-data"
          element={<UserDataPage />}
        />
        <Route
          path="/party-list"
          element={<PartyListPage  />}
        />
        <Route
          path="/alreadyVoted"
          element={<Nothing />}
        />
      </Routes>
    </Router>
  );
};

export default App;
