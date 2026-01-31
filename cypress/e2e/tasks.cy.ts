describe('Tasks board', () => {
  it('creates a task via UI and sees it on board', () => {
    cy.visit('/login')
    cy.contains('Demo Admin').click()
    cy.visit('/tasks')
    cy.get('input[placeholder="New task title"]').first().type('E2E Test Task{enter}')
    cy.contains('E2E Test Task')
  })
})