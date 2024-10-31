// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://simonvutov1:LQYZO01LVjJHcxF9@cluster0.yq8fx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const signupSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

const Signup = mongoose.model('Signup', signupSchema);

// POST route to save email
app.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const newSignup = new Signup({ email });
        await newSignup.save();
        res.status(201).send({ message: 'Email saved successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to save email' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));