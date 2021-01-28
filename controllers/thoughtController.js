const Thought = require("../Models/Thought");
const User = require("../Models/User");

async function getAllThoughts(req, res) {
  const response = await Thought.find({});
  console.log(response);
  res.json(response);
}

async function getThoughtById(req, res) {
  const response = await Thought.findById(req.params.id);
  if (!response) {
    res.status(400);
    return res.json({ message: "No thought found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}

function createThought(req, res) {
  const response = Thought.create({
    username: req.body.username,
    thoughtText: req.body.thoughtText,
  }).then(function (dbThought) {
    User.findOneAndUpdate(
      {
        _id: req.body.userId,
      },
      {
        $push: { thoughts: dbThought._id },
      },
      {
        new: true,
        runValidators: true,
      }
    ).then(function (dbUser) {
      if (!dbUser) {
        res.status(400);
        return res.json({ message: "No user found with specified id." });
      } else {
        console.log(dbUser);
        return res.json(dbUser);
      }
    });
  });
}
async function updateThought(req, res) {
  const thoughtId = req.params.thoughtId;
  const response = await Thought.findOneAndUpdate(
    {
      _id: thoughtId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!response) {
    res.status(400);
    return res.json({ message: "No thought found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}
async function deleteThought(req, res) {
  const thoughtId = req.params.thoughtId;
  const userId = req.params.userId;
  const response = await Thought.findOneAndDelete({ _id: thoughtId });
  if (!response) {
    res.status(400);
    return res.json({ message: "No thought found with specified id." });
  } else {
    const userResponse = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          thoughts: thoughtId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!userResponse) {
      res.status(400);
      return res.jon({ message: "No user found with this id" });
    }
  }
}
async function createReaction(req, res) {
  console.log('YES');
  const thoughtId = req.params.thoughtId;
  console.log(req.body);
  const response = await Thought.findOneAndUpdate(
    {
      _id: thoughtId,
    },
    {
      $push: {
        reactions: req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!response) {
    res.status(400);
    return res.json({ message: "No thought found with specified id." });
  } else {
    console.log(response);
    return res.json(response);
  }
}

async function deleteReaction(req, res) {
  const thoughtId = req.params.thoughtId;
  const reactionId = req.params.reactionId;
  const response = await Thought.findOneAndUpdate({ _id: thoughtId }, 
    {
      $pull: {
        reactions: {
          reactionId: reactionId
        }
      }
    }, 
    {
      new: true,
      runValidators: true,
    }
    );
    if (!response) {
      res.status(400);
      return res.jon({ message: "No reaction found with this id" });
    }
  }
module.exports = {
  createThought,
  getThoughtById,
  getAllThoughts,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
};
