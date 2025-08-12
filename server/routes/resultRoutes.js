// server/routes/resultRoutes.js
const express = require('express');
const Result = require('../models/Result');
const router = express.Router();

// POST /api/results - Save a new quiz result
router.post('/', async (req, res) => {
  try {
    const { userId, name, rollno, score, total } = req.body;

    // Check if a result for this user already exists
    const existingResult = await Result.findOne({ userId });
    if (existingResult) {
      return res.status(400).json({ message: 'Quiz has already been attempted.' });
    }

    const newResult = new Result({ userId, name, rollno, score, total });
    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully!', result: newResult });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving result.' });
  }
});

// GET /api/results/:userId - Check if a user has a result
router.get('/:userId', async (req, res) => {
  try {
    const result = await Result.findOne({ userId: req.params.userId });
    if (result) {
      res.status(200).json({ hasAttempted: true, result });
    } else {
      res.status(200).json({ hasAttempted: false, result: null });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error checking result.' });
  }
});

module.exports = router;