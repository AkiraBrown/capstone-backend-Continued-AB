const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

const { getEvents, deleteEvent } = require("../queries/Events");

router.get("/:id", jwtMiddleware, async (req, res) => {
  try {
    const foundEvent = await getEvents(req.params.id);
    res.status(200).json(foundEvent);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});
router.delete("/:id", jwtMiddleware, async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.id);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.error });
  }
});
module.exports = router;
