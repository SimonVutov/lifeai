const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON body

// MongoDB connection string (Replace with your actual MongoDB URL)
mongoose.connect('mongodb+srv://simonvutov1:wuLnRzct3W0m2OU1@cluster0.4dqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for storing email subscriptions
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

// Create a model for email subscriptions
const Email = mongoose.model('Email', emailSchema);

// API route to handle email sign-ups
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Save the email to the database
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(200).json({ message: 'Email saved successfully!' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ message: 'Failed to save email' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});