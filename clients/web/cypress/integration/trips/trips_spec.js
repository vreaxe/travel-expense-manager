describe("Trips", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.login();
    cy.fixture("trip").as("trip");
  });

  it("can't create a trip with a wrong budget", function() {
    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Add Trip']").click();
    cy.location("pathname").should("eq", "/trips/add");

    cy.get('input[name="title"]')
      .type(this.trip.title)
      .should("have.value", this.trip.title);
    cy.get('input[name="budget"]')
      .clear()
      .type(this.trip.wrong_budget)
      .should("have.value", this.trip.wrong_budget);
    cy.chooseReactSelectOption(
      "#react-select-select-currency-add-trip-input",
      this.trip.currency,
      this.trip.currency
    );
    for (let country of this.trip.countries) {
      cy.chooseReactSelectOption(
        "#react-select-select-countries-add-trip-input",
        country,
        country
      );
    }
    cy.get("form").submit();

    cy.get("form").contains(
      "Ensure this value is greater than or equal to 0.01."
    );
  });

  it("creates a trip", function() {
    cy.createTrip();
    cy.get("h1").should("contain", this.trip.title);
  });

  it("goes to trip details and back to the list", function() {
    cy.createTrip();
    cy.contains(this.trip.title)
      .first()
      .click();
    cy.get("h1").should("contain", this.trip.title);
    cy.get("[data-cy=back-button]").click();
    cy.location("pathname").should("eq", "/trips");
  });

  it("deletes a trip", function() {
    cy.createTrip();
    cy.get("[data-cy=back-button]").click();
    cy.location("pathname").should("eq", "/trips");
    cy.get(".trip-card")
      .its("length")
      .then(size => {
        cy.get(".trip-card")
          .first()
          .find(".trash")
          .click();
        cy.get("[data-cy=trip-delete]").click();
        cy.get(".trip-card").should("have.length", size - 1);
      });
  });

  afterEach(() => {
    cy.logout();
  });
});
