// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// CONTROLLERS
// const userWishlistController = require("./controllers/userWishlistController");
// const usersController = require("./controllers/userController");
// const dashboardController = require("./controllers/dashboardController");
// const notificationController = require("./controllers/notificationController");
const serpController = require("./controllers/serpController");
const altUserController = require("./controllers/altUserController");
const altWishlistController = require("./controllers/altWishlistController");
const altFriendController = require("./controllers/altFriendController");
// CONFIG
const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests
}

app.use(express.json()); // Parse incoming JSON
app.use(cors("*")); // Enable Cross Origin Resource Sharing

// ROUTES
// app.use("/userwishlist", userWishlistController);
// app.use("/users", usersController);
// app.use("/dashboard", dashboardController);
// app.use("/notification", notificationController);
app.use("/serp", serpController);
app.use("/alt", altUserController);
app.use("/friend", altFriendController);
app.use("/wishlist", altWishlistController);
app.use("/", (req, res) => {
  console.log("Welcome to Giftune!");
  res.send("Welcome to Giftune!");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
