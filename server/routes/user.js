const express = require('express');
const { followUser, unfollowUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.put('/:id', followUser);
router.patch('/:id', unfollowUser);

router.get('/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;