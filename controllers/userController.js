const User = require("../Models/User");
const Thought = require("../Models/Thought");

async function getAllUsers(req, res) {
  const response = await User.find({}).populate({
    path: "thoughts"
  })
  console.log(response);
  res.json(response);
}
async function getUserById(req, res) {
  const response = await User.findById(req.params.id).populate({
    path: "thoughts"
  })
  console.log(response);
  res.json(response);
}
async function createUser(req, res) {
  const response = await User.create({
    username: req.body.username,
    email: req.body.email,
  });
  console.log(response);
  res.json(response);
}

async function updateUserById(req, res) {
  const userId = req.params.id;
  const updateData = req.body;
  console.log(userId, req.body);
  const response = await User.findOneAndUpdate({ _id: userId }, {$set: updateData}, {
    new: true,
    runValidators: true,
  });
  if (!response) {
    res.status(400);
    return res.json({ message: "No user found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}
async function deleteUserById(req, res) {
  const userId = req.params.id;
  const response = await User.findOneAndDelete({ _id: userId });
  if (!response) {
    res.status(400);
    return res.json({ message: "No user found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}

async function addFriend(req, res) {
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  const response = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { friends: friendId } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!response) {
    res.status(400);
    return res.json({ message: "No user found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}

async function deleteFriend(req, res) {
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  const response = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!response) {
    res.status(400);
    return res.json({ message: "No user found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend
};
