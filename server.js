// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
