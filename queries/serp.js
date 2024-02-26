const fs = require("fs");
const Axios = require("axios");
require("dotenv").config();
const mainUserSearch = async ({ search }) => {
  const formatSearch = search.toLowerCase().replace(/\s/g, "_");
  if (fs.existsSync(`./search_data/${formatSearch}.json`)) {
    return JSON.parse(fs.readFileSync(`./search_data/${formatSearch}.json`));
  } else {
    try {
      const result = await Axios.get(
        `https://serpapi.com/search.json?engine=google_shopping&api_key=${process.env.SERP_API_KEY}&q=${formatSearch}`
      );
      fs.writeFileSync(
        `./search_data/${formatSearch}.json`,
        JSON.stringify(result.data.shopping_results)
      );
      return result.data.shopping_results;
    } catch (error) {
      return error;
    }
  }
};

module.exports = {
  mainUserSearch,
};
