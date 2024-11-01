// api/signup.js

require('dotenv').config();
const mongoose = require('mongoose');
const Signup = require('../models/Signup'); // Adjust path if needed for model import
const cors = require('cors');

// Initialize Mongoose connection
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// CORS Middleware
const corsMiddleware = cors({ origin: 'https://lifeai-tau.vercel.app/' });

// Signup handler function
export default async function handler(req, res) {
    // Apply CORS for each request
    await corsMiddleware(req, res);

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    // Process signup
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
        const newSignup = new Signup({ email });
        await newSignup.save();
        res.status(201).json({ message: 'Email saved successfully!' });
    } catch (error) {
        console.error("Error saving email:", error);
        res.status(500).json({ message: 'Failed to save email' });
    }
}