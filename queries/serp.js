// const db = require("../db/dbConfig");
const fs = require("fs");
const Axios = require("axios");
require("dotenv").config();
//const baseUrl = "https://serpapi.com/search.json?engine=google_shopping";
const mainUserSearch = async ({ search }) => {
  if (fs.existsSync(`./search_data/${search.toLowerCase()}.json`)) {
    return JSON.parse(
      fs.readFileSync(`./search_data/${search.toLowerCase()}.json`)
    );
  } else {
    try {
      const result = await Axios.get(
        `https://serpapi.com/search.json?engine=google_shopping&api_key=${
          process.env.SERP_API_KEY
        }&q=${search.toLowerCase()}`
      );
      fs.writeFileSync(
        `./search_data/${search}.json`,
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
