const express = require("express");

require("dotenv").config();
const router = express.Router();

const { mainUserSearch } = require("../queries/serp");
router.get("/", async (req, res) => {
  res.status(200).send("Ready to scrape");
});

router.post("/search", async (req, res) => {
  try {
    const response = await mainUserSearch(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
