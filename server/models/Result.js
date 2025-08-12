// server/models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  // ... your existing fields (userId, name, etc.)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  rollno: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'Result' // ✅ Add this to match your DB collection name
});

module.exports = mongoose.model('Result', resultSchema);