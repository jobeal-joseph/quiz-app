// server/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// --- 1. REGISTRATION ENDPOINT ---
// URL: POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.' });
  }
});


// --- 2. LOGIN ENDPOINT ---
// URL: POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    // If credentials are correct, login is successful
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});


module.exports = router;