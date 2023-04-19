const mongoose = require('mongoose');

const SocailLinks = new mongoose.Schema({
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  // Add more fields here as needed
});

module.exports = mongoose.model('socailLinks', SocailLinks);

