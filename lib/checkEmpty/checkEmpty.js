function checkEmpty(req, res, next) {
  const { user_name, first_name, last_name, dob, email, password } = req.body;
  let errObj = {};
  if (!user_name) errObj.user_name = "user_name cannot be empty";
  if (!first_name) errObj.first_name = "first_name cannot be empty";
  if (!last_name) errObj.last_name = "last_name cannot be empty";
  if (!dob) errObj.dob = "dob cannot be empty";
  if (!email) errObj.email = "email cannot be empty";
  if (!password) errObj.password = "password cannot be empty";

  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      message: "error",
      error: errObj,
    });
  } else {
    next();
  }
}
module.exports = checkEmpty;
