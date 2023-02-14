const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    url: "https://demo.1crmcloud.com/index.php",
    username: "admin",
    password: "admin",
  },
});
