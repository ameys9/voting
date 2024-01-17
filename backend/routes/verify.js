const Voter = require('../models/voter');
const initializeDatabase = async () => {
  try {
    const voter = await Voter.findOne({ voterId: 'aaa', phoneNumber: '3433' });

    if (!voter) {
      const newVoter = new Voter({
        voterId: 'aaa',
        phoneNumber: '3433',
        age: 25,
        residence: 'Some Residence',
        dob: new Date('1997-01-01'),
        photo: 'path/to/photo.jpg',
        hasVoted: false,
      });

      await newVoter.save();
      console.log('Initialized database with a new voter:', newVoter);
    } else {
      console.log('Voter already exists in the database:', voter);
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

exports.verifyVoter = async (req, res) => {
  const { voterId, phoneNumber } = req.body;

  try {
    // Attempt to find the voter in the database
    const voter = await Voter.findOne({ voterId, phoneNumber });

    if (voter) {
      // Voter found, send success response
      res.json({ success: true, voter });
    } else {
      // Voter not found, manually insert a new voter into the database
      const newVoter = new Voter({
        voterId: 'aaa',
        phoneNumber: '3433',
        age: 25,
        residence: 'Some Residence',
        dob: new Date('1997-01-01'),
        photo: 'path/to/photo.jpg',
        hasVoted: false,
      });

      // Save the new voter to the database
      await newVoter.save();

      // Send success response
      res.json({ success: true, voter: newVoter });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
