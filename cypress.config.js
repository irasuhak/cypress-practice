const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://www.saucedemo.com/",
    "screenshotsFolder": "cypress/screenshots",
    "videosFolder": "cypress/videos",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
