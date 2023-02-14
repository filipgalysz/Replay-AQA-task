describe("Test cases", () => {
  Cypress.Cookies.debug(true);
 
let firstName = Math.random().toString(36).substr(2, 10)
let lastName = Math.random().toString(36).substr(2, 10)
  it("Scenario 1 – Create contact", () => {
    cy.loginWithApi("admin", "admin");
 
    cy.visit(Cypress.env("url"));
    // Navigate to Sales & Marketing -> Contacts
    cy.get("#grouptab-1").click();

    // Create new contact
    cy.get(":nth-child(2) > .sidebar-item-link-basic").click();
    cy.get("#DetailFormfirst_name-input").type(firstName, { force: true });
    cy.get("#DetailFormlast_name-input").type(lastName, { force: true });
    cy.get('input[name="business_role"]').invoke("val", "CFO").should("have.value", "CFO");
    cy.get('input[name="categories"]').invoke("val", "Customers^,^Suppliers").should("have.value", "Customers^,^Suppliers");

    cy.get("#DetailForm_save2").click();

    cy.get(".cell-business_role .form-value").should("have.text", "CFO");
    cy.get('#_form_header').should("contain", firstName).should("contain", lastName);
    cy.get('.summary-meta > .summary-list > :nth-child(1)').should("contain", 'Customers, Suppliers');
  });

  it("Scenario 2 – Run report", () => {
    cy.loginWithApi("admin", "admin");
    cy.visit(Cypress.env("url"));
  });

});
