// PartyListPage.js

import React from 'react';

const PartyListPage = ({ voteCounter }) => {
  return (
    <div>
      <h1>Party List Page</h1>
      {/* Display list of political parties with voting buttons */}
      <p>Vote Counter: {voteCounter}</p>
    </div>
  );
};

export default PartyListPage;
