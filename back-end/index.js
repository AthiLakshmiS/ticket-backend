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
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// app.get('/', (req, res) => {
//   res.send('Hey this is my API running 🥳')
// })

// app.get('/about', (req, res) => {
//   res.send('This is my about route..... ')
// })

// Export the Express API
// module.exports = app
// //Routers
app.use('/api/support-agents', userRoutes);
app.use('/api/assigned-users', userRoutes);
app.use('/api/support-tickets', ticketRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;