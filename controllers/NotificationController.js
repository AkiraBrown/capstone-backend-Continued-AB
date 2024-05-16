const express = require("express");
const router = express.Router();
// const expressWs = require("express-ws")(express());
const {
  getNotification,
  addNotification,
  getAllNotifications,
  deleteNotification,
  updateNotifications,
} = require("../queries/Notification");
const jwtMiddleware = require("../lib/authMiddleware/jwtMiddleware");

// Major task for this controller...
//TODO
/// Implement express-ws to constantly feed back the user's notifications

router.get("/", jwtMiddleware, async (req, res) => {
  try {
    const allNotif = await getAllNotifications();
    res.status(200).json(allNotif);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
// This grabs all notifications relating to a specific user
router.get("/:id", jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const foundNoti = await getNotification(id);
    if (foundNoti.length === 0) {
      res.status(204).json({ message: "No Notifications" });
    } else {
      res.status(200).json(foundNoti);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Creates a new Notification
router.post("/new-notification", jwtMiddleware, async (req, res) => {
  try {
    const addedNoti = await addNotification(req.body);
    res.status(200).json(addedNoti);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//This deletes a notification
router.delete("/:id", jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotification = await deleteNotification(id);
    if (deletedNotification.length === 0) {
      res.status(404).json({ message: "Notification not found" });
    } else {
      res.status(200).json(deletedNotification);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//This Updates a notification based on whether they've read it or not
router.put("/update-notification", jwtMiddleware, async (req, res) => {
  try {
    const updatedNoti = await updateNotifications(req.body);
    res.status(200).json(updatedNoti);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// // Ground work for websockets
// router.ws("/echo", async (ws, req) => {
//   ws.on("message", (msg) => {
//     console.log(msg);
//   });
//   console.log("Socket");
// });
module.exports = router;
