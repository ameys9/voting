const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  voterId: String,
  phoneNumber: String,
  age: Number,
  residence: String,
  dob: String,
  photo: String,
  hasVoted: Boolean,
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
