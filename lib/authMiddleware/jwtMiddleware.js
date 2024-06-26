const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  try {
    if (req.headers.authorization) {
      let notDecodedToken = req.headers.authorization;
      let slicedToken = notDecodedToken.slice(7);
      let decodedToken = jwt.verify(
        slicedToken,
        process.env.JWT_TOKEN_SECRET_KEY
      );
      res.locals.decodedData = decodedToken;
      next();
    } else {
      throw { message: "You don't have permission" };
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
}

module.exports = jwtMiddleware;
