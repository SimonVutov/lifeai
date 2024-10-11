const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://simonvutov1:wuLnRzct3W0m2OU1@cluster0.4dqmx.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster0');

const EmailSignup = mongoose.model('EmailSignup', new mongoose.Schema({ email: String }));

app.post('/api/submit-email', async (req, res) => {
    const { email } = req.body;
    try {
        const newSignup = new EmailSignup({ email });
        await newSignup.save();
        res.json({ message: 'Email signed up successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/submit-email', (req, res) => {
    res.send('This endpoint is for submitting emails via POST requests.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
