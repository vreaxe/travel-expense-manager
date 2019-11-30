describe("Register", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.visit("register");
    cy.fixture("user").as("user");
  });

  it("can't register a user with a wrong email", function() {
    cy.get('input[name="email"]')
      .type(this.user.wrong_email)
      .should("have.value", this.user.wrong_email);
    cy.get('input[name="password"]')
      .type(this.user.register_password)
      .should("have.value", this.user.register_password);
    cy.get("form").submit();

    cy.get("form").contains("Enter a valid email address.");
  });

  it("can't register a user with a password with less than 8 characters", function() {
    cy.get('input[name="email"]')
      .type(this.user.register_email)
      .should("have.value", this.user.register_email);
    cy.get('input[name="password"]')
      .type(this.user.wrong_password)
      .should("have.value", this.user.wrong_password);
    cy.get("form").submit();

    cy.get("form").contains("The password must have at least 8 characters");
  });

  it("can register a user", function() {
    cy.get('input[name="email"]')
      .type(this.user.register_email)
      .should("have.value", this.user.register_email);
    cy.get('input[name="password"]')
      .type(this.user.register_password)
      .should("have.value", this.user.register_password);
    cy.get("form").submit();

    cy.location("pathname").should("eq", "/trips");
  });
});
