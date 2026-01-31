describe('Accessibility check', () => {
  it('Homepage should have no detectable accessibility violations', () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y()
  })
})