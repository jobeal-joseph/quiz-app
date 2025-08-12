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
    res.status(200).json({ message: 'Login successful!',
      user:{
        id: user._id,
        email: user.email,
        name: user.name,
        rollno: user.rollno,
        detailsSubmitted: user.detailsSubmitted,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// URL: POST /api/auth/update-details
router.post('/update-details', async (req, res) => {
  try {
    const { userId, name, rollno } = req.body;

    if (!name || !rollno) {
      return res.status(400).json({ message: 'Name and Roll No. are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        name, 
        rollno,
        detailsSubmitted: true // Mark details as submitted
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Send back the updated user object
    res.status(200).json({
      message: 'Details updated successfully!',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        rollno: updatedUser.rollno,
        detailsSubmitted: updatedUser.detailsSubmitted,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error updating details.' });
  }
});


module.exports = router;