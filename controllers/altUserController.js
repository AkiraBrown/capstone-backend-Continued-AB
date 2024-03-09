const express = require("express");
require("dotenv").config();
const router = express.Router();
const { parsedMessage } = require("../lib/helper/helper");
const { createUser, login } = require("../queries/altUsers");
const checkEmpty = require("../lib/checkEmpty/checkEmpty");
const validateData = require("../lib/validateData/validateData");
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

router.get("/", jwtMiddleware, async (req, res, next) => {});
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

router.get("/login", async (req, res) => {
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

module.exports = router;
