Cypress.Commands.add("login", () => {
  cy.fixture("user").then(user => {
    cy.get('input[name="email"]')
      .type(user.email)
      .should("have.value", user.email);
    cy.get('input[name="password"]')
      .type(user.password)
      .should("have.value", user.password);
    cy.get("form").submit();
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("#logout").click();

  cy.location("pathname").should("eq", "/login");
});
