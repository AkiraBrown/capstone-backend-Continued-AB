const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

const {
  createWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
  getUserWishlistItems,
} = require("../queries/altWishlist");

router.get("/:id", jwtMiddleware, async (req, res) => {
  try {
    const userWishlist = await getUserWishlistItems(req.params.id);
    res.status(200).json(userWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});

router.post("/add-item", jwtMiddleware, async (req, res) => {
  try {
    const createdWishlistItem = await createWishlistItem(req.body);
    res.status(200).json(createdWishlistItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.error,
    });
  }
});

router.delete("/:id", jwtMiddleware, async (req, res) => {
  try {
    const deleteditem = await deleteWishlistItem(req.params.id);
    res.status(200).json(deleteditem);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});

router.put("/update-item", jwtMiddleware, async (req, res) => {
  const { is_bought, id } = req.body;
  try {
    const updatedItem = updateWishlistItem(id, is_bought);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});
module.exports = router;
