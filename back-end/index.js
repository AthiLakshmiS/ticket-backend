const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");
const User = require("./models/userModel");

const app = express();
app.use(cors());
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json()); 

// Connect to the database
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the Express API
// module.exports = app
// //Routers
// app.use('/api/support-agents', userRoutes);
// app.use('/api/assigned-users', userRoutes);
// app.use('/api/support-tickets', ticketRoutes);
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/support-tickets', asyncHandler(async (req, res) => {
  try {
    // const firstActiveUser = await User.findOne({ active: true });
    const firstActiveUser = await User.find({});
    
    if (!firstActiveUser) {
      return res.status(404).json({
        status: 'Failed',
        message: 'No active users found.',
      });
    }

    res.status(200).json({
      status: 'Success',
      data: {
        user: firstActiveUser,
      },
    });
  } catch (error) {
    console.error('Error fetching first active user:', error.message);
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
    });
  }
}));// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;