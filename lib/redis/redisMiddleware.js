const { createClient } = require("redis");
const client = createClient();
const DEFAULT_EXPIRATION = 3600;
function redisShoppingCache(req, res, next) {
  try {
    const { search } = req["query"].toLowerCase().replace(/\s/g, "_");
    client.setEx(search, DEFAULT_EXPIRATION);

    next();
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}
function redisUsersCache(req, res, next) {
  try {
    next();
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}

module.exports = { redisShoppingCache, redisUsersCache };
