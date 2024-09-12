const express = require("express");
const Axios = require("axios");
require("dotenv").config();
const router = express.Router();

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  try {
    const response = await Axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
    );
    console.log(response);
  } catch (error) {
    return error;
  }
}

router.get("/", async (req, res) => {
  const code = req.query.code;
});
