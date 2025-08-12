// server/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  name: {
    type: String,
    default: '',
  },
  rollno: {
    type: String,
    default: '',
  },
  detailsSubmitted: {
    type: Boolean,
    default: false,
  },
},
{
  collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);