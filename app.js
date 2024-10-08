// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// CONTROLLERS

const UsersController = require("./controllers/UsersController");
const FriendController = require("./controllers/FriendController");

const serpController = require("./controllers/serpController");
const WishlistController = require("./controllers/WishlistController");
const NotificationController = require("./controllers/NotificationController");
const EventsController = require("./controllers/EventsController");
const GoogleController = require("./controllers/Google.Controller");
// CONFIG
const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests
}

app.use(express.json()); // Parse incoming JSON
app.use(cors("*")); // Enable Cross Origin Resource Sharing
/* TODO : Change CORS to only accept request from giftune frontend when deployed and localhost when in local environment */
// ROUTES

app.use("/user", UsersController);
app.use("/serp", serpController);
app.use("/friend", FriendController);
app.use("/wishlist", WishlistController);
app.use("/notifications", NotificationController);
app.use("/events", EventsController);
app.use("/google", GoogleController);

app.use("/", (req, res) => {
  console.log("Welcome to Giftune!");
  res.send("Welcome to Giftune!");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
