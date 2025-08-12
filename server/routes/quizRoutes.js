// server/routes/quizRoutes.js
const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// GET /api/questions?limit=20
// Fetches a specified number of random questions
router.get('/questions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20; // Default to 20 questions
    // Use aggregation to get random documents efficiently
    const questions = await Question.aggregate([{ $sample: { size: limit } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

module.exports = router;