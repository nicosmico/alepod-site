const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log({ on, config });
    },
  },
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
