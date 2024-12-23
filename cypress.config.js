const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2quato@qauto.forstudy.space/",
    video: true,
    chromeWebSecurity: false,
  },
});
