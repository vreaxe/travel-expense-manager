describe("Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
    cy.fixture("user").as("user");
  });

  it("Not an email", function() {
    cy.get('input[name="email"]')
      .type(this.user.wrong_email)
      .should("have.value", this.user.wrong_email);
    cy.get('input[name="password"]')
      .type(this.user.password)
      .should("have.value", this.user.password);
    cy.get("form").submit();

    cy.get("form").contains("Enter a valid email address.");
  });

  it("A password with less than 8 characters", function() {
    cy.get('input[name="email"]')
      .type(this.user.email)
      .should("have.value", this.user.email);
    cy.get('input[name="password"]')
      .type(this.user.wrong_password)
      .should("have.value", this.user.wrong_password);
    cy.get("form").submit();

    cy.get("form").contains("The password must have at least 8 characters");
  });

  it("Register success", function() {
    cy.get('input[name="email"]')
      .type(this.user.email)
      .should("have.value", this.user.email);
    cy.get('input[name="password"]')
      .type(this.user.password)
      .should("have.value", this.user.password);
    cy.get("form").submit();

    cy.location("pathname").should("eq", "/trips");
  });
});
