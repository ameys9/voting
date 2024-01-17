const express = require('express');
const mongoose = require('mongoose');
// Remove the following line
// const bodyParser = require('body-parser');
const verifyRoutes = require('./routes/verify');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://ameysurve456:nigga123@cluster0.5ojpm5g.mongodb.net/VIDEOTUBE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Replace the following line
// app.use(bodyParser.json());
// with
app.use(express.json());

app.use('/api', verifyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
