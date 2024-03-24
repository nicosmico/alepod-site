const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here, don't delete this
      console.log({ on, config });
    },
  },
  video: false,
  retries: {
    runMode: 3,
    openMode: 0,
  },
});
