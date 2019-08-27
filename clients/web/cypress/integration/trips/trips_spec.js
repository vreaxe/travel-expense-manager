describe("Trips", () => {
  beforeEach(() => {
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
        "#react-select-select-currency-add-expense-input",
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
    cy.get(".rtf button.rtf--mb").trigger("mouseover");
    cy.get("button[text='Add Trip']").click();
    cy.location("pathname").should("eq", "/trips/add");

    cy.get('input[name="title"]')
      .type(this.trip.title)
      .should("have.value", this.trip.title);
    cy.get('input[name="budget"]')
      .clear()
      .type(this.trip.budget)
      .should("have.value", this.trip.budget);
    cy.chooseReactSelectOption(
      "#react-select-select-currency-add-trip-input",
      this.trip.currency,
      this.trip.currency
    );
    for (let country of this.trip.countries) {
      cy.chooseReactSelectOption(
        "#react-select-select-currency-add-expense-input",
        country,
        country
      );
    }
    cy.get("form").submit();

    cy.get("h1").should("contain", this.trip.title);
  });

  it("goes to trip details and back to the list", function() {
    cy.contains(this.trip.title)
      .first()
      .click();
    cy.get("h1").should("contain", this.trip.title);
    cy.contains("Back").click();
    cy.location("pathname").should("eq", "/trips");
  });

  it("deletes a trip", function() {
    cy.get(".trip-card")
      .its("length")
      .then(size => {
        cy.get(".trip-card")
          .first()
          .find(".trash")
          .click();

        cy.get(".trip-card").should("have.length", size - 1);
      });
  });

  afterEach(() => {
    cy.logout();
  });
});
