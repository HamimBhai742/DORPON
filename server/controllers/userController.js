const User = require('../models/Users');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, bio, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email, bio, avatar } },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const followUser = async (req, res) => {
  const userId = req.params.id; // person to follow
  const { currentUserId } = req.body; // who is following

  if (userId === currentUserId)
    return res.status(400).json({ error: "You can't follow yourself" });

  try {
    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(userId);

      await userToFollow.save();
      await currentUser.save();

      res.status(200).json({ message: 'Followed successfully' });
    } else {
      res.status(400).json({ error: 'Already following' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unfollowUser = async (req, res) => {
  const userId = req.params.id;
  const { currentUserId } = req.body;

  if (userId === currentUserId)
    return res.status(400).json({ error: "You can't unfollow yourself" });

  try {
    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    userToUnfollow.followers.pull(currentUserId);
    currentUser.following.pull(userId);

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { followUser, unfollowUser ,getUser, updateUser, deleteUser};
