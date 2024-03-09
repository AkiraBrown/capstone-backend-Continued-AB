const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/dbConfig");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const createUser = async (data) => {
  try {
    const {
      user_picture,
      user_name,
      first_name,
      last_name,
      dob,
      email,
      password,
    } = data;

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.one(
      `INSERT INTO users (user_picture, user_name, first_name, last_name, dob, email, password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [
        user_picture,
        user_name,
        first_name,
        last_name,
        dob,
        email,
        hashedPassword,
      ]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const login = async (data) => {
  try {
    const { email, password } = data;
    const foundUser = await db.any(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    if (foundUser.length === 0) {
      throw {
        message: "error",
        error: "User does not exist please go sign up",
      };
    } else {
      let user = foundUser[0];
      let comparedPassword = await bcrypt.compare(password, user.password);
      if (!comparedPassword) {
        throw {
          message: "error",
          error: "Please check your email and password",
          status: 500,
        };
      } else {
        let jwtToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            username: user.user_name,
          },
          process.env.JWT_TOKEN_SECRET_KEY,
          { expiresIn: "7d" }
        );

        return jwtToken;
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  login,
};
