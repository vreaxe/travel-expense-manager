describe("Expenses", () => {
  beforeEach(() => {
    cy.cleanDb();
    cy.login();
    cy.fixture("trip").as("trip");
    cy.fixture("expense").as("expense");
  });

  it("can't create a expense with a wrong amount", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.createExpense(
      this.trip.title,
      this.expense.title,
      this.expense.category,
      this.expense.wrong_amount,
      this.expense.currency
    );

    cy.get("form").contains(
      "Ensure this value is greater than or equal to 0.01."
    );
  });

  it("creates a expense", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.createExpense(
      this.trip.title,
      this.expense.title,
      this.expense.category,
      this.expense.amount,
      this.expense.currency
    );

    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);
    cy.location("pathname").should("eq", "/trips/1");

    cy.get(".expense-card")
      .first()
      .find("[data-cy=expense-title]")
      .should("contain", this.expense.title);
    cy.get(".expense-card")
      .first()
      .find("[data-cy=expense-category]")
      .should("contain", this.expense.category);
    cy.get(".expense-card")
      .first()
      .find("[data-cy=expense-amount]")
      .should("contain", this.expense.amount);
  });

  it("edits a expense", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.createExpense(
      this.trip.title,
      this.expense.title,
      this.expense.category,
      this.expense.amount,
      this.expense.currency
    );

    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);
    cy.location("pathname").should("eq", "/trips/1");

    cy.get(".expense-card")
      .first()
      .find("[data-cy=pencil]")
      .click();
    cy.get("[data-cy=header-h1]").should(
      "contain",
      `Edit Expense: ${this.expense.title}`
    );
    cy.location("pathname").should("eq", "/trips/1/expense/1");

    cy.get("input[name=title]")
      .clear()
      .type(this.expense.edit_title)
      .should("have.value", this.expense.edit_title);
    cy.chooseReactSelectOption(
      "#react-select-select-category-edit-expense-input",
      this.expense.edit_category,
      this.expense.edit_category
    );
    cy.get("input[name=amount]")
      .clear()
      .type(this.expense.edit_amount)
      .should("have.value", this.expense.edit_amount);
    cy.get("form").submit();
  });

  it("deletes a expense", function() {
    cy.createTrip(
      this.trip.title,
      this.trip.budget,
      this.trip.currency,
      this.trip.countries
    );
    cy.createExpense(
      this.trip.title,
      this.expense.title,
      this.expense.category,
      this.expense.amount,
      this.expense.currency
    );

    cy.get("[data-cy=header-h1]").should("contain", this.trip.title);
    cy.location("pathname").should("eq", "/trips/1");

    cy.get(".expense-card")
      .its("length")
      .then(size => {
        cy.get(".expense-card")
          .first()
          .find("[data-cy=trash]")
          .click();
        cy.get("[data-cy=expense-delete]").click();
        cy.get(".expense-card").should("have.length", size - 1);
      });
  });

  afterEach(() => {
    cy.logout();
  });
});
