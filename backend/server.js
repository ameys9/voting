const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const verifyRoutes = require('./routes/verify');
const exampleMiddleware = require('./middleware'); // Import example middleware
const Voter = require('./models/voter');
const Party = require('./models/party');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/votingdata', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Use the built-in JSON parsing middleware
app.use(express.json());

// Use CORS middleware (place it before defining routes)
app.use(cors());

// Use example middleware if needed
app.use(exampleMiddleware);

// Use your custom middleware
app.post('/api/verify', async (req, res) => {
  const { voterId, phoneNumber } = req.body;

  try {
    const voter = await Voter.findOne({ voterId, phoneNumber });

    if (voter) {
      res.json({ success: true, voter });
    } else {
      res.json({ success: false, voter: null });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/userData', async (req, res) => {
  const voterId = req.query.voterId;
  try {
    const user = await Voter.findOne({ voterId });
    console.log('User found:', user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


app.get('/api/partyData', async (req, res) => {
  try {
    const partyData = await Party.find();
    // console.log('User found:', partyData);
    res.json(partyData);
  } catch (error) {
    console.error('Error fetching party data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/vote', async (req, res) => {
  try {
    const { partyName } = req.body;

    // Find the party by name and update the vote count
    const updatedParty = await Party.findOneAndUpdate(
      { partyName },
      { $inc: { voteCount: 1 } }, // Increment voteCount by 1
      { new: true } // Return the updated document
    );

    if (!updatedParty) {
      return res.status(404).json({ error: 'Party not found' });
    }

    // Fetch updated party data and send it as the response
    const updatedPartyData = await Party.find();
    res.json(updatedPartyData);
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
