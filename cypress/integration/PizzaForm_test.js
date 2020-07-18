describe("Testing our Pizza Form", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3002/pizza");
  });
  it("Adding Text to Text Box", () => {
    cy.get("#name").type("Kyle Nelson");
  });
  it("Checks for Toppings", () => {
    cy.get("#pepperoni").check().should("be.checked");
    cy.get("#jalapenos").check().should("be.checked");
    cy.get("#mushrooms").check().should("be.checked");
    cy.get("#olives").check().should("be.checked");
  });
  it("Checks for Form Submission", () => {
    cy.get(".pizza-form").submit();
  });
});
