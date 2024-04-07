const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://userDatabaseMongo:Password@projectportfolio.r1fkd1k.mongodb.net/?retryWrites=true&w=majority&appName=projectPortfolio";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
  // Specify the database and collection
  const db = client.db("sample_mflix");
//   const collection = db.collection("users");

  // Query the collection to fetch data
//   const users = await collection.find({}).toArray();
//   console.log("Users:", users);

    // Define routes for CRUD operations
    app.post('/api/users', async (req, res) => {
        const { name, email } = req.body;
        const usersCollection = client.db("sample_mflix").collection("user");
        const result = await usersCollection.insertOne({ name, email });
        res.json(result.ops[0]);
      });
  
      app.get('/api/users', async (req, res) => {
        const usersCollection = client.db("sample_mflix").collection("user");
        const users = await usersCollection.find({}).toArray();
        res.json(users);
      });
  
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
// Define routes
// Example route
app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
