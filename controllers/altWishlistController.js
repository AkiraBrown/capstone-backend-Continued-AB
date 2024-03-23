const express = require("express");
const router = express.Router();
const {
  createWishlistItem,
  deleteWishlistItem,
} = require("../queries/altWishlist");

module.exports = router;
