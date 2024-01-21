const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});

app.get('/', (req, res) => {
  console.log('API is working fine..')
  res.send('API Endpoint for Ticket Backend')
})

// Routers
app.use('/api/support-tickets', ticketRoutes);
app.use('/api/support-agents', userRoutes);
app.use('/api/assigned-users', userRoutes);

module.exports = app;