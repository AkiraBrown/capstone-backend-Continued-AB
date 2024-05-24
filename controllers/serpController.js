const express = require("express");
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

require("dotenv").config();
const router = express.Router();

const { mainUserSearch } = require("../queries/serp");
router.get("/", async (req, res) => {
  res.status(200).send("Ready to scrape");
});

router.get("/search", jwtMiddleware, async (req, res) => {
  try {
    const response = await mainUserSearch(req.query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
