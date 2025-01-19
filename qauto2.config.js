const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2quauto@qauto2.forstudy.space",
    video: true,
    chromeWebSecurity: false,
    env: {
      EMAIL: "rynasuhak+2@gmail.com",
      PASSWORD: "Password1!@"
    },
  },
});
