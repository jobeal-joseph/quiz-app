// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the body of requests

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Schema and Model (Example) ---
// A schema defines the structure of your documents
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const authRoutes = require('./routes/authRoutes'); // Import the new routes

const quizRoutes = require('./routes/quizRoutes'); // Import the quiz routes
app.use('/api', quizRoutes); // Use the routes


// ... after app.use(express.json());
app.use('/api/auth', authRoutes); // Use the routes with a base path


// A model is a wrapper on the schema that provides an interface to the database
const Item = mongoose.model('Item', itemSchema);

// --- API Routes ---
// A simple route to get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// A simple route to create an item (for testing)
app.post('/api/items', async (req, res) => {
    const newItem = new Item({
        name: req.body.name || 'Sample Item'
    });
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item' });
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});