const routes = require("next-routes");

// name - pattern - page
module.exports = routes()
  .add("index", "")
  .add("dashboard")
  .add("trips")
  .add("addTrip", "/trips/add", "addTrip")
  .add("editTrip", "/trips/:id/edit", "editTrip")
  .add("editExpense", "/trips/:tripId/expense/:expenseId", "editExpense")
  .add("addExpense", "/trips/:id/add-expense", "addExpense")
  .add("tripCategories", "/trips/:id/categories", "tripCategories")
  .add("trip", "/trips/:id", "trip")
  .add("register")
  .add("login");
