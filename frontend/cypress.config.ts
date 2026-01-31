module.exports = {
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    retries: {
      runMode: 2,
      openMode: 0
    },
    defaultCommandTimeout: 8000
  }
}
