const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    url: "https://demo.1crmcloud.com/index.php",
    username: "admin",
    password: "admin",
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: false,
    json: true,
  },
});
