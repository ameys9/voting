

const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  partyName: String,
  voteCount: Number,
}, { collection: 'party' });

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
