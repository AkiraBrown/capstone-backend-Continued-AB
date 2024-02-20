const {
  isAlphanumeric,
  isEmail,
  isStrongPassword,
  isAlpha,
} = require("validator");

function validateData(req, res, next) {
  const { user_name, first_name, last_name, email, password } = req.body;
  let errObj = {};

  if (!isAlphanumeric(user_name))
    errObj.user_name = "user_name cannot have special characters";

  if (!isAlpha(first_name))
    errObj.first_name = "first_name can only be alphabet";
  if (!isAlpha(last_name)) errObj.last_name = "last_name can only be alphabet";
  if (!isEmail(email)) errObj.email = "email can only have alphabet";

  //pending validation
  if (!isStrongPassword(password)) {
    errObj.password =
      "Password must contains 1 lowercase, 1 uppcase, 1 number, 1 special character, and at least 8 characters long";
  }
  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      message: "error",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = validateData;
