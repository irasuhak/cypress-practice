const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    video: true,
    chromeWebSecurity: false,
    env: {
      EMAIL: "irynasuhak+1@gmail.com",
      PASSWORD: "Password1!@",
      ALT_BASE_URL: "https://guest:welcome2qauto@qauto2.forstudy.space",
    },
  },
});
