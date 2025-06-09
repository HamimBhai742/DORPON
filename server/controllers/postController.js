const Post = require('../models/Post');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
  const { userId, content } = req.body;
  try {
    const newPost = new Post({ userId, content });
    await newPost.save();
    res.status(201).json({ newPost, message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { content, image } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.content = content || post.content;
    post.image = image || post.image;

    const updated = await post.save();
    res.status(200).json({ message: 'Post updated', post: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeOrUnlikePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  console.log(postId, userId);
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: alreadyLiked ? 'Unliked' : 'Liked',
      likes: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const commentOnPost = async (req, res) => {
  const postId = req.params.id;
  const { userId, text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ user: userId, text });
    await post.save();

    res.status(201).json({ message: 'Comment added', comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate(
      'comments.user',
      'username'
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  const postId = req.params.id;
  const { commentId, text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.text = text;
    await post.save();

    res.status(200).json({ message: 'Comment updated', comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.query;
  const postId = req.params.id;
  console.log(postId, commentId);
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    post.comments.pull({ _id: commentId });
    await post.save();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likeOrUnlikePost,
  commentOnPost,
  getPostComments,
  updateComment,
  deleteComment,
};
