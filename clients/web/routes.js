const routes = require("next-routes");

// name - pattern - page
module.exports = routes()
  .add("index", "")
  .add("dashboard")
  .add("trips")
  .add("addTrip", "/trips/add", "addTrip")
  .add("addExpense", "/trips/:id/add-expense", "addExpense")
  .add("trip", "/trips/:id", "trip")
  .add("register")
  .add("login");
