// import mongoose from 'mongoose';

// const myDetailsSchema = new mongoose.Schema({
//   Description: String,
//   Designation: [String],
//   Name: String,
//   technicalSkills: [String],
//   image: String
// });

// export default mongoose.model('MyDetails', myDetailsSchema)


const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: true,
  },
  Designation: {
    type: [String],
  },
  Name: {
    type: String,
  },
  technicalSkills: {
    type: [String],
  },
  image: {
    type: String,
  },
  // Add more fields here as needed
});

module.exports = mongoose.model('MyDetails', ExampleSchema);
