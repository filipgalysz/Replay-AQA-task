describe("Test cases", () => {
  Cypress.Cookies.debug(true);

  const firstName = Math.random().toString(36).substr(2, 10);
  const lastName = Math.random().toString(36).substr(2, 10);
  it("Scenario 1 – Create contact", () => {
    cy.loginWithApi("admin", "admin");
    cy.visit(Cypress.env("url"));
    cy.get("#grouptab-1").click();
    cy.get(":nth-child(2) > .sidebar-item-link-basic").click();
    cy.get("#DetailFormfirst_name-input").type(firstName, { force: true });
    cy.get("#DetailFormlast_name-input").type(lastName, { force: true });
    cy.get('input[name="business_role"]').invoke("val", "CFO").should("have.value", "CFO");
    cy.get('input[name="categories"]').invoke("val", "Customers^,^Suppliers").should("have.value", "Customers^,^Suppliers");
    cy.get("#DetailForm_save2").click();
    cy.get(".cell-business_role .form-value").should("have.text", "CFO");
    cy.get("#_form_header").should("contain", firstName).should("contain", lastName);
    cy.get(".summary-meta > .summary-list > :nth-child(1)").should("contain", "Customers, Suppliers");
  });

  it("Scenario 2 – Run report", () => {
    cy.loginWithApi("admin", "admin");
    cy.visit(Cypress.env("url"));
    cy.get("#grouptab-5").click( { force: true });
    cy.get("#filter_text").clear({ force: true }).type("Project Profitability", { force: true }).type("{enter}");
    cy.get("tbody>tr").eq(0).find("td").eq(2).click();
    cy.get(".card-footer > .row > .align-left > :nth-child(1) > :nth-child(1)").should("contain", "Run");
    cy.get(".cell-project_phase > .form-entry").should("contain", "Starting Soon");
    cy.get(".card-footer > .row > .align-left > :nth-child(1) > :nth-child(1)").click({ force: true });
    cy.get(".panel-subheader > .row > .listview-status").should("contain", "Selected: 0 of");
    cy.get("tbody>tr").should("contain", "360 Vacations");
    cy.get("tbody").find("tr").its("length").should("be.gte", 4);
  });

  it("Scenario 3 – Remove events from activity log", () => {
    let removeData = [];
    cy.viewport(1550, 1750);
    cy.loginWithApi("admin", "admin");
    cy.visit(Cypress.env("url"));
    cy.get("#grouptab-5").trigger("mouseover");
    cy.get(".menu-tab-sub-list").contains("Activity Log").click({ force: true });
    cy.get(".listColLabel").contains("Recent");
    cy.wait(200)
      .get("tbody tr input")
      .each(($row, index) => {
        if (index < 3) {
          removeData.push($row[0].value);
          cy.wait(200).wrap($row).invoke("show").click().wait(200);
        }
      });
    cy.get(".panel-subheader > .row > .listview-actions > .inline-elt button").click();
    cy.get(".menu-option").first().click();
    cy.on("window:confirm", () => true);
    cy.url({ timeout: 15000 }).should("include", "module=ActivityLog&action=index&layout=Browse&list_limit=20&list_offset=0");
    cy.get("tbody tr input").each(($row, index) => {
      if (index < 3) {
        cy.wrap(removeData).should("not.include", $row[0].value);
      }
    });
  });
});
