// server/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },  // An array of strings
  correct: { type: String, required: true }, 
},
{
  collection: 'Question'
});

module.exports = mongoose.model('Question', questionSchema);