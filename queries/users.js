const db = require("../db/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUsersById = async (id) => {
  try {
    const user = await db.any(`SELECT * FROM users WHERE id=$1`, id);
    return user;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const userInfo = await db.one("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return userInfo;
  } catch (error) {
    return error;
  }
};

const createUser = async ({
  user_picture,
  user_name,
  first_name,
  last_name,
  dob,
  email,
}) => {
  try {
    const newUser = await db.any(
      "INSERT INTO users(user_picture,user_name,first_name,last_name,dob,email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [user_picture, user_name, first_name, last_name, dob, email]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const createNewUser = async ({
  user_picture,
  user_name,
  first_name,
  last_name,
  dob,
  email,
  password,
}) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.one(
      "INSERT INTO users(user_picture,user_name,first_name,last_name,dob,email,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
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
const newLoginSession = async ({ email, password }) => {
  try {
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
      const user = foundUser[0];
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
            user_name: user.user_name,
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

const editUserProfile = async () => {
  try {
    const user = await db.one(
      "INSERT INTO users(user_picture,user_name,first_name,last_name,dob,email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [user_picture, user_name, first_name, last_name, dob, email]
    );
    return user;
  } catch (e) {
    return e;
  }
};

const updateUserProfile = async (id, userProfile) => {
  let { user_picture, user_name, first_name, last_name, email, dob } =
    userProfile;
  try {
    const updatedUserProfile = await db.one(
      `UPDATE users SET user_picture = $1, user_name = $2, first_name = $3, last_name = $4, email = $5, dob = $6 WHERE id = $7 RETURNING *`,
      [user_picture, user_name, first_name, last_name, email, dob, id]
    );
    return updatedUserProfile;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUsersById,
  editUserProfile,
  getUserByEmail,
  createUser,
  updateUserProfile,
  createNewUser,
  newLoginSession,
};
