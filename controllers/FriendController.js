const express = require("express");
require("dotenv").config();
const router = express.Router();
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");
const {
  grabFriendProfile,
  addNewFriend,
  deleteFriendFriendsList,
} = require("../queries/Friends");
const { getUsersFriends } = require("../queries/users");

// Gets a logged in user's friends list for the dashboard page
router.get("/list/:id", jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const allFriends = await getUsersFriends(id);
    res.status(200).json(allFriends);
  } catch (error) {
    res.status(404).json({ message: error.message, error: error.error });
  }
});

// Gets the wishlist of the selected friend for their profile page
router.get("/friend-lookup/:friend_id", jwtMiddleware, async (req, res) => {
  const { friend_id } = req.params;
  try {
    const friendData = await grabFriendProfile(friend_id);
    if (friendData.error) {
      throw {
        message: "Error",
        error: friendData.error,
      };
    } else {
      res.status(200).json(friendData);
    }
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
});
router.post("/add-new-friend", jwtMiddleware, async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const addedFriend = await addNewFriend(user_id, friend_id);
    if (addedFriend.length === 0) {
      res.status(204).json({ error: `Please Input valid id's` });
    } else {
      res.status(200).json(addedFriend);
    }
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
});

router.delete(
  "/delete/:user_id/:friend_id",
  jwtMiddleware,
  async (req, res) => {
    const { user_id, friend_id } = req.params;
    try {
      const deletedFriend = await deleteFriendFriendsList(user_id, friend_id);
      res.status(204).json(deletedFriend);
    } catch (error) {
      res.status(500).json({ message: `Error ${error}` });
    }
  }
);
module.exports = router;
