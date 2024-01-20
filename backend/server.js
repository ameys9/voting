const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const verifyRoutes = require('./routes/verify');
const exampleMiddleware = require('./middleware'); // Import example middleware

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/votingdata', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Use the built-in JSON parsing middleware
app.use(express.json());

// Use CORS middleware (place it before defining routes)
app.use(cors());

// Use example middleware if needed
app.use(exampleMiddleware);

// Use your custom middleware
app.use('/api', verifyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
