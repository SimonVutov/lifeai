const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define Email Schema
const EmailSchema = new mongoose.Schema({
    email: String
});

const Email = mongoose.model('Email', EmailSchema);

// API route to handle email submissions
app.post('/submit-email', async (req, res) => {
    try {
        const newEmail = new Email({ email: req.body.email });
        await newEmail.save();
        res.json({ message: 'Email saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
