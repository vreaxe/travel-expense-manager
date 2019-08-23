context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.fixture("user").as("user");
  });

  it("Wrong password", function() {
    cy.get('input[name="email"]')
      .type(this.user.email)
      .should("have.value", this.user.email);
    cy.get('input[name="password"]')
      .type(this.user.wrong_password)
      .should("have.value", this.user.wrong_password);
    cy.get("form").submit();

    cy.get("form").contains("Please, enter valid credentials");
  });

  it("Login success", function() {
    cy.login();
    cy.logout();
  });
});
