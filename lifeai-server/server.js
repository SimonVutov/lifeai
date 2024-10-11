const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package
const app = express();

// Middleware
app.use(bodyParser.json());

// Use the CORS middleware and allow specific origins
app.use(cors({
    origin: 'https://simonvutov.github.io',  // Allow requests from your GitHub Pages site
}));

// Connect to MongoDB Atlas
mongoose.connect('cloiud.mongodb: mongodb+srv://simonvutov1:wuLnRzct3W0m2OU1@cluster0.4dqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define Email Schema
const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Email = mongoose.model('Email', emailSchema);

// API route to handle email submissions
app.post('/submit-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(200).json({ message: 'Email saved successfully' });
    } catch (err) {
        if (err.code === 11000) { // Duplicate email error
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to save email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});