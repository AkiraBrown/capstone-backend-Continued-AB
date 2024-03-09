const express = require("express");

require("dotenv").config();
const router = express.Router();

const { mainUserSearch } = require("../queries/serp");
router.get("/", async (req, res) => {
  res.status(200).send("Ready to scrape");
});

router.get("/search", async (req, res) => {
  try {
    console.log(req.query);
    const response = await mainUserSearch(req.query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.get("/searchAlt", async (req, res) => {
  console.log(req.query);
  const { search } = req.query;
  try {
    res.status(200).json(search);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
module.exports = router;
