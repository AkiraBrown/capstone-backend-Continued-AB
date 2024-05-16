// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// CONTROLLERS

// const UserController = require("./controllers/UserController");
const FriendController = require("./controllers/FriendController");

const serpController = require("./controllers/serpController");
const WishlistController = require("./controllers/WishlistController");
const NotificationController = require("./controllers/NotificationController");
const EventsController = require("./controllers/EventsController");
// CONFIG
const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests
}

app.use(express.json()); // Parse incoming JSON
app.use(cors("*")); // Enable Cross Origin Resource Sharing

// ROUTES

// app.use("/user", UserController);
app.use("/serp", serpController);
app.use("/friend", FriendController);
app.use("/wishlist", WishlistController);
app.use("/notifications", NotificationController);
app.use("/events", EventsController);

app.use("/", (req, res) => {
  console.log("Welcome to Giftune!");
  res.send("Welcome to Giftune!");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
