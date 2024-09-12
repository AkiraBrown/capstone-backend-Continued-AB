const express = require("express");
require("dotenv").config();
const router = express.Router();

const { OAuth2Client } = require("google-auth-library");

const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8080"
    : "https://giftune-ab.netlify.app";
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl
);

router.get("/login", async (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });
    res.redirect(authUrl);
  } catch (error) {
    console.error("Error generating authentication", error);
    res
      .status(500)
      .json({ message: "Failed to generate auth url", error: error });
  }
});
router.get("/login/callback", async (req, res) => {
  const { code } = req.query;
  try {
    let tokens = await oauth2Client.getToken(code);
    if (tokens.error) {
      console.error("Error getting access token:", tokens);
      return res.status(500).json({ message: "Failed to get auth token" });
    }
    const { access_token } = tokens;
    let googleUser = await oauth2Client.verifyIdToken({
      idToken: access_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    if (googleUser.error) {
      console.error("Error Verifying ID token:", googleUser);
      res.status(500).json({ message: "Failed to verify auth" });
    }
    console.log(googleUser.payload);
    const { email, name } = googleUser.payload;
    res.status(200).json({ name, email });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login", error: error });
  }
});

module.exports = router;
