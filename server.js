require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'https://lifeai-tau.vercel.app/' })); // Replace with your Vercel URL

// Serve static files from the public folder
app.use(express.static('public'));

// MongoDB connection
console.log("MongoDB URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define Schema and Model
const signupSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

// Check if the connection is established before creating the model
const Signup = mongoose.model('Signup', signupSchema);

// Root route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// POST route to save email
app.post('/api/signup', async (req, res) => {
    try {
        console.log("Received email1:", req.body);
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).send({ message: 'Invalid email address' });
        }
        console.log("Received email2:", req.body);
        const newSignup = new Signup({ email });
        console.log("Received email3:", req.body);
        await newSignup.save();
        console.log("Received email4:", req.body);
        res.status(201).send({ message: 'Email saved successfully!' });
    } catch (error) {
        console.error("Error saving email:", error);
        res.status(500).send({ message: 'Failed to save email' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));