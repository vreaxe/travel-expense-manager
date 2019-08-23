Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3000/login");
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
