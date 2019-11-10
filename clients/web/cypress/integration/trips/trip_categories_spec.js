describe("Trip Categories", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.login();
    cy.fixture("trip").as("trip");
  });

  it("creates a category", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);

    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Add/Edit Categories']").click();
    cy.get("[data-cy=header-h1]").should(
      "contain",
      `Add/Edit Categories: ${this.trip.title}`
    );

    cy.get(".category-card")
      .its("length")
      .then(size => {
        cy.get("[data-cy=add-category]").click();
        cy.get(".category-card").should("have.length", size + 1);
      });

    cy.get("[data-cy=save-categories]").click();
    cy.get(".error-message").should("not.exist");
  });

  it("deletes a category", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);

    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Add/Edit Categories']").click();
    cy.get("[data-cy=header-h1]").should(
      "contain",
      `Add/Edit Categories: ${this.trip.title}`
    );

    cy.get(".category-card")
      .its("length")
      .then(size => {
        cy.get(".category-card")
          .first()
          .find("[data-cy=trash]")
          .click();
        cy.get("[data-cy=category-delete]").click();
        cy.get(".category-card").should("have.length", size - 1);
      });
  });

  afterEach(() => {
    cy.logout();
  });
});
