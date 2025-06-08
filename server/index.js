const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());


//Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.send(`Server running on port ${process.env.PORT}`);
});
