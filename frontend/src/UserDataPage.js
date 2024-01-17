// UserDataPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const UserDataPage = ({ handleVote }) => {
  return (
    <div>
      <h1>User Data Page</h1>
      {/* Display user data here */}
      <Link to="/party-list">Next Page</Link>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default UserDataPage;
