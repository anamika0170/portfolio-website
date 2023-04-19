const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Define the Contact model using the schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model so that it can be used in other parts of the application
module.exports = Contact;

  

