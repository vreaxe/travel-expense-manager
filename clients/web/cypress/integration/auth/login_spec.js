context("Login", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.visit("login");
    cy.fixture("user").as("user");
  });

  it("can't login with a wrong password", function() {
    cy.get('input[name="email"]')
      .type(this.user.email)
      .should("have.value", this.user.email);
    cy.get('input[name="password"]')
      .type(this.user.wrong_password)
      .should("have.value", this.user.wrong_password);
    cy.get("form").submit();

    cy.get("form").contains("Please, enter valid credentials");
  });

  it("can login and logout", function() {
    cy.login();
    cy.logout();
  });
});
