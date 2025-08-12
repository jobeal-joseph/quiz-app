const mongoose = require('mongoose');
const Question = require('./models/Question');
const allquestions = require('./questions.json'); // Assuming this path is correct
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing questions to avoid duplicates
    await Question.deleteMany({});
    console.log('Old questions deleted.');

    // Insert the new questions
    await Question.insertMany(allquestions);
    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDatabase();