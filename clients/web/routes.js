const routes = require("next-routes");

// name - pattern - page
module.exports = routes()
  .add("index", "")
  .add("login");
