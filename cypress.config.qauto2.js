const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    video: true,
    chromeWebSecurity: false,
    env: {
      EMAIL: "irynasuhak+2@gmail.com",
      PASSWORD: "Password1!@"
    },
    reporter: "mochawesome", 
    reporterOptions: {
      reportDir: "cypress/results", 
      overwrite: false, 
      html: true, 
      json: false, 
    },
  },
});