// api/signup.js
import dbConnect from '../lib/dbConnect';
import Signup from '../models/Signup';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://lifeai-tau.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle preflight request
        res.status(200).end();
        return;
    }

    // Connect to the database
    await dbConnect();

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
            console.error('Error saving email:', error);
            res.status(500).json({ message: 'Failed to save email' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}