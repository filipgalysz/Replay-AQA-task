// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginWithApi", (username, password) => {
  cy.session([username, password], () => {
    cy
      .request({
        method: "POST",
        url: "https://demo.1crmcloud.com/json.php?action=login",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          username,
          password,
        },
      })
      .then((response) => {
        // Check if the response status is 200 (OK)
        expect(response.status).to.equal(200);
        // Check if the response body contains the expected result
        expect(response.body.result).to.equal("ok");
        // Check if the session ID is present in the response body
        expect(response.body.json_session_id).to.be.a("string");
        // Check if the set-cookie header is present in the response
        expect(response.headers["set-cookie"]).to.be.an("array");
      }),
      {
        cacheAcrossSpecs: true,
      };
  });
});