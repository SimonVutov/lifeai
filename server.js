const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'https://life-ai-ten.vercel.app' })); // Allow Vercel domain

// MongoDB connection and schema/model setup (as in previous steps)
mongoose.connect('your_connection_string_here', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const signupSchema = new mongoose.Schema({
    email: { type: String, required: true }
});
const Signup = mongoose.model('Signup', signupSchema);

// Root route for testing
app.get('/', (req, res) => {
    res.send("Welcome to the LifeAI Server!");
});

// POST route to save email
app.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const newSignup = new Signup({ email });
        await newSignup.save();
        res.status(201).send({ message: 'Email saved successfully!' });
    } catch (error) {
        console.error("Error saving email:", error);
        res.status(500).send({ message: 'Failed to save email' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));