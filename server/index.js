const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

//Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Post Routes
const postRoutes = require('./routes/post');
app.use('/api/create-post', postRoutes);
app.use('/api/find-post', postRoutes);
app.use('/api/update-post', postRoutes);
app.use('/api/delete-post', postRoutes);

//Like Routes
const likeRoutes = require('./routes/like');
app.use('/api/like-post', likeRoutes);

//Comment Routes
const commentRoutes = require('./routes/comment');
app.use('/api/comment-post', commentRoutes);
app.use('/api/get-comments', commentRoutes);
app.use('/api/update-comment', commentRoutes);
app.use('/api/delete-comment', commentRoutes);

//User Routes
const userRoutes = require('./routes/user');
app.use('/api/follow-user', userRoutes);
app.use('/api/unfollow-user', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.send(`Server running on port ${process.env.PORT}`);
});
