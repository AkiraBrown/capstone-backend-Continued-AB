const express = require("express");
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

require("dotenv").config();
const router = express.Router();

//----------Redis Setup----------------//
const { createClient } = require("redis");
const client = createClient();
const DEFAULT_EXPIRATION = 3600;
//------------------------------------//

const { mainUserSearch } = require("../queries/serp");
router.get("/", async (req, res) => {
  res.status(200).send("Ready to scrape");
});

router.get("/search", jwtMiddleware, async (req, res) => {
  const { search } = req.query;
  const formatSearch = search.toLowerCase().replace(/\s/g, "_");
  try {
    // await client.connect();
    // client.get(formatSearch, async (err, data) => {
    //   if (err) console.error(err);
    //   if (data != null) {
    //     res.status(200).json(JSON.parse(data));
    //   } else {
    //     const response = await mainUserSearch(formatSearch);
    //     client.setEx(
    //       formatSearch,
    //       DEFAULT_EXPIRATION,
    //       JSON.stringify(response)
    //     );
    //     res.status(200).json(response);
    //   }
    // });
    const response = await mainUserSearch(formatSearch);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
