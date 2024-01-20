const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json()); 

// Connect to the database
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://athilakshmi:8Ia2Tk4wZLqPSvgI@cluster0.bcy8b9g.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Routers
app.use('/api/support-agents', userRoutes);
app.use('/api/assigned-users', userRoutes);
app.use('/api/support-tickets', ticketRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});