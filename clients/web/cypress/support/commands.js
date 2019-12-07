Cypress.Commands.add("cleanDb", () => {
  cy.exec("docker exec tem-testing-backend python manage.py clean_db");
});

Cypress.Commands.add("login", () => {
  cy.visit("login");
  cy.fixture("user").then(user => {
    cy.get("input[name=email]")
      .type(user.email)
      .should("have.value", user.email);
    cy.get("input[name=password]")
      .type(user.password)
      .should("have.value", user.password);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "/trips");
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("#logout").click();
  cy.location("pathname").should("eq", "/login");
});

Cypress.Commands.add("chooseReactSelectOption", (selector, text, option) => {
  cy.get(`${selector}`)
    .click({ force: true })
    .type(text, { force: true })
    .get(".react-select__menu")
    .contains(option)
    .click();
});

Cypress.Commands.add("createTrip", (title, budget, currency, countries) => {
  cy.visit("trips");
  cy.wait(500);
  cy.get(".rtf button.rtf--mb").trigger("mouseover");
  cy.get("button[text='Add Trip']").click();
  cy.location("pathname").should("eq", "/trips/add");
  cy.get("[data-cy=header-h1]").should("contain", "Add Trip");

  cy.get("input[name=title]")
    .type(title)
    .should("have.value", title);
  cy.get("input[name=budget]")
    .clear()
    .type(budget)
    .should("have.value", budget);
  cy.chooseReactSelectOption(
    "#react-select-select-currency-add-trip-input",
    currency,
    currency
  );
  for (let country of countries) {
    cy.chooseReactSelectOption(
      "#react-select-select-countries-add-trip-input",
      country,
      country
    );
  }
  cy.get("form").submit();
});

Cypress.Commands.add(
  "createExpense",
  (trip, title, category, amount, currency) => {
    cy.visit("trips");
    cy.get(".trip-card")
      .first()
      .click();
    cy.wait(500);
    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Add Expense']").click();
    cy.get("[data-cy=header-h1]").should("contain", `Add Expense to ${trip}`);

    cy.get("input[name=title]")
      .type(title)
      .should("have.value", title);
    cy.chooseReactSelectOption(
      "#react-select-select-category-add-expense-input",
      category,
      category
    );
    cy.get("input[name=amount]")
      .clear()
      .type(amount)
      .should("have.value", amount);
    cy.chooseReactSelectOption(
      "#react-select-select-currency-add-expense-input",
      currency,
      currency
    );
    cy.get("form").submit();
  }
);
