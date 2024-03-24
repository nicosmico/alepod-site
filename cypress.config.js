const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  retries: {
    runMode: 3,
    openMode: 0,
  },
});
