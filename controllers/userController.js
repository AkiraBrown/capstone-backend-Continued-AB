const express = require("express");
require("dotenv").config();
const router = express.Router();
const { parsedMessage } = require("../lib/helper/helper");
const { createUser, login, getAllUsers } = require("../queries/Users");
const checkEmpty = require("../lib/checkEmpty/checkEmpty");
const validateData = require("../lib/validateData/validateData");
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

// Get all users
router.get("/", jwtMiddleware, async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers.length === 0) {
      res.json({ message: "please go create some users" });
    } else {
      res.json(allUsers);
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});

//Create a new user
router.post("/create-user", checkEmpty, validateData, async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    if (createdUser.code === "23505") {
      throw {
        message: "duplicated",
        error: parsedMessage(createdUser.detail),
        status: 409,
      };
    } else {
      res.json(createdUser);
    }
  } catch (error) {
    next(error);
  }
});

//Log in a user
router.post("/login", async (req, res) => {
  try {
    const foundUser = await login(req.body);
    if (foundUser.status === 500) {
      throw foundUser;
    } else {
      res.status(200).json({ token: foundUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});
//Routes to be created
// edit logged in user profile
// Enable a logged in user to delete their account off of our systems
module.exports = router;
