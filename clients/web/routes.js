const routes = require("next-routes");

// name - pattern - page
module.exports = routes()
  .add("index", "")
  .add("dashboard")
  .add("trips")
  .add("trip", "/trips/:id", "trip")
  .add("login");
