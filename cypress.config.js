const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,


  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "http://localhost:8000",

  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
