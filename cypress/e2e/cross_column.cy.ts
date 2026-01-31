describe('Kanban cross-column move', () => {
  const api = Cypress.env('API_URL') || 'http://localhost:4000'

  beforeEach(() => {
    cy.loginDemo('ADMIN')
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.exist
      // clean up tasks
      cy.request({ method: 'GET', url: `${api}/api/tasks`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        const tasks = res.body || []
        tasks.forEach((t: any) => cy.request({ method: 'DELETE', url: `${api}/api/tasks/${t.id}`, headers: { Authorization: `Bearer ${token}` } }))
      })

      // create two tasks in todo
      cy.request({ method: 'POST', url: `${api}/api/tasks`, body: { title: 'Cross A', status: 'todo' }, headers: { Authorization: `Bearer ${token}` } })
      cy.request({ method: 'POST', url: `${api}/api/tasks`, body: { title: 'Cross B', status: 'todo' }, headers: { Authorization: `Bearer ${token}` } })
    })
  })

  it('moves a task from todo to in_progress and persists status and position', () => {
    cy.visit('/tasks')
    cy.get('[data-status="todo"] [data-id]').should('have.length.at.least', 2)

    cy.get('[data-status="todo"] [data-id]').then(($items) => {
      const ids = [...$items].map((el: any) => Number(el.getAttribute('data-id')))
      const first = ids[0]

      cy.intercept('PUT', '**/api/tasks/*').as('updateTask')

      // drag first into the In Progress column header area
      cy.dragFromTo(`[data-status="todo"] [data-id="${first}"]`, '[data-status="in_progress"]')

      cy.wait('@updateTask', { timeout: 5000 })

      // assert server-side status updated
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token')
        cy.request({ method: 'GET', url: `${api}/api/tasks`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          const moved = res.body.find((t: any) => t.id === first)
          expect(moved).to.exist
          expect(moved.status).to.equal('in_progress')
          expect(moved.position).to.be.a('number')
        })
      })
    })
  })
})