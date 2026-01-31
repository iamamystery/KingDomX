describe('Login flow', () => {
  it('uses demo admin to login and view dashboard', () => {
    cy.visit('/login')
    cy.contains('Demo Admin').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back')
  })
})