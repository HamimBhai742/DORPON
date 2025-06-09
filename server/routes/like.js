const express = require('express');
const { likeOrUnlikePost } = require('../controllers/postController');
const router = express.Router();

router.put('/:id', likeOrUnlikePost);
module.exports = router;