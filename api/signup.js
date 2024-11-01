require('dotenv').config();
const mongoose = require('mongoose');
const Signup = require('../models/Signup'); // Adjust based on model location
const cors = require('cors');

// MongoDB Connection
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// CORS Middleware
const corsMiddleware = cors({ origin: 'https://lifeai-tau.vercel.app/' });

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'POST') {
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
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}