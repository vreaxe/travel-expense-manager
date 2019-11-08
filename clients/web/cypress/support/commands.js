Cypress.Commands.add("cleanDb", () => {
  cy.exec("docker exec tem-testing-backend python manage.py clean_db");
});

Cypress.Commands.add("login", () => {
  cy.visit("login");
  cy.fixture("user").then(user => {
    cy.get('input[name="email"]')
      .type(user.email)
      .should("have.value", user.email);
    cy.get('input[name="password"]')
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

Cypress.Commands.add("createTrip", () => {
  cy.visit("trips");
  cy.get(".rtf button.rtf--mb").trigger("mouseover");
  cy.get("button[text='Add Trip']").click();
  cy.location("pathname").should("eq", "/trips/add");

  cy.fixture("trip").then(trip => {
    cy.get('input[name="title"]')
      .type(trip.title)
      .should("have.value", trip.title);
    cy.get('input[name="budget"]')
      .clear()
      .type(trip.budget)
      .should("have.value", trip.budget);
    cy.chooseReactSelectOption(
      "#react-select-select-currency-add-trip-input",
      trip.currency,
      trip.currency
    );
    for (let country of trip.countries) {
      cy.chooseReactSelectOption(
        "#react-select-select-countries-add-trip-input",
        country,
        country
      );
    }
  });
  cy.get("form").submit();
});
