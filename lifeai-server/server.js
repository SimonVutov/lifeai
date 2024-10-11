const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://simonvutov1:<db_password>@cluster0.4dqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.post('/submit-email', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("lifeai_db");
    const collection = database.collection("emails");
    
    const result = await collection.insertOne({ email: req.body.email });
    
    if (result.acknowledged) {
      res.json({ message: 'Email saved successfully' });
    } else {
      res.status(500).json({ error: 'Failed to save email' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
