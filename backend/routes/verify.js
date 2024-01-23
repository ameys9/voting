const Voter = require('../models/voter');
const router = require("express").Router();

// Define the route handling logic for the "/verify" endpoint
router.post('/api//verify', async (req, res) => {
  const { voterId, phoneNumber } = req.body;

  try {
    // Attempt to find the voter in the database
    const voter = await Voter.findOne({ voterId, phoneNumber });

    if (voter) {
      // Voter found, send success response
      res.json({ success: true, voter });
    } else {
      // Voter not found, send failure response
      res.json({ success: false, voter: null });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
