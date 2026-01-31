describe('Smoke tests', () => {
  const api = Cypress.env('API_URL') || 'http://localhost:4000'

  beforeEach(() => {
    cy.loginDemo('ADMIN')
  })

  it('loads homepage and tasks page and checks API ping', () => {
    cy.visit('/')
    cy.get('nav').should('exist')

    // quick sanity check on tasks page
    cy.visit('/tasks')
    cy.get('[data-status="todo"]').should('exist')

    // ping the backend
    cy.request(`${api}/api/ping`).its('status').should('equal', 200)
  })
})