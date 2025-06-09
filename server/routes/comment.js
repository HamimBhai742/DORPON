const express = require('express');
const { commentOnPost, getPostComments, updateComment, deleteComment } = require('../controllers/postController');
const router = express.Router();

router.post('/:id', commentOnPost);
router.get('/:id', getPostComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;