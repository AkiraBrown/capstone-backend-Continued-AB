const express = require("express");
const Axios = require("axios");
require("dotenv").config();
const router = express.Router();
const baseUrl = "https://serpapi.com/search.json?engine=google_shopping";
// const { mainUserSearch } = require("../queries/serp");
router.get("/", async (req, res) => {
  res.status(200).send("Ready to scrape");
});

router.post("/search", async (req, res) => {
  const { search } = req.body;
  try {
    //Move this axios call to the serp.js file for readability and ease of use
    const result = await Axios.get(
      `https://serpapi.com/search.json?engine=google_shopping&api_key=${process.env.SERP_API_KEY}&q=${search}`
    );

    console.log(result.data);
    res.status(200).json(result.data.shopping_results);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
  console.log(search);
  //
});
module.exports = router;
