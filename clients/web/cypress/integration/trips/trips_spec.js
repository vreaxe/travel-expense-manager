describe("Trips", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.login();
    cy.fixture("trip").as("trip");
  });

  it("can't create a trip with a wrong budget", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.wrong_budget,
      this.trip.currency,
      this.trip.countries
    );

    cy.get("form").contains(
      "Ensure this value is greater than or equal to 0.01."
    );
  });

  it("creates a trip", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);
  });

  it("goes to trip details and back to the list", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.contains(this.trip.title)
      .first()
      .click();
    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);
    cy.get("[data-cy=back-button]").click();
    cy.location("pathname").should("eq", "/trips");
  });

  it("edits a trip", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.contains(this.trip.title)
      .first()
      .click();
    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);

    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Edit Trip']").click();
    cy.get("[data-cy=header-h1]").should(
      "contain",
      `Edit Trip: ${this.trip.title}`
    );

    cy.get('input[name="title"]')
      .clear()
      .type(this.trip.edit_title)
      .should("have.value", this.trip.edit_title);
    cy.get(".react-select__clear-indicator").click();
    cy.chooseReactSelectOption(
      "#react-select-select-countries-edit-trip-input",
      this.trip.edit_country,
      this.trip.edit_country
    );
    cy.get("form").submit();
    cy.get("[data-cy=header-h1]").should("contain", this.trip.edit_title);
  });

  it("deletes a trip", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.get("[data-cy=back-button]").click();
    cy.location("pathname").should("eq", "/trips");
    cy.get(".trip-card")
      .its("length")
      .then(size => {
        cy.get(".trip-card")
          .first()
          .find("[data-cy=trash]")
          .click();
        cy.get("[data-cy=trip-delete]").click();
        cy.get(".trip-card").should("have.length", size - 1);
      });
  });

  afterEach(() => {
    cy.logout();
  });
});
