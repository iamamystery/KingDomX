describe('Kanban task reorder', () => {
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

      // create three tasks
      cy.request({ method: 'POST', url: `${api}/api/tasks`, body: { title: 'Task A', status: 'todo' }, headers: { Authorization: `Bearer ${token}` } })
      cy.request({ method: 'POST', url: `${api}/api/tasks`, body: { title: 'Task B', status: 'todo' }, headers: { Authorization: `Bearer ${token}` } })
      cy.request({ method: 'POST', url: `${api}/api/tasks`, body: { title: 'Task C', status: 'todo' }, headers: { Authorization: `Bearer ${token}` } })
    })
  })

  it('reorders tasks within a column and persists positions', () => {
    cy.visit('/tasks')
    cy.get('[data-status="todo"] [data-id]').should('have.length.at.least', 3)

    // read the initial order
    cy.get('[data-status="todo"] [data-id]').then(($items) => {
      const ids = [...$items].map((el: any) => Number(el.getAttribute('data-id')))
      expect(ids.length).to.be.at.least(3)
      const [first, , third] = ids

      // intercept reorder call
      cy.intercept('POST', '**/api/tasks/reorder').as('reorder')

      // drag first after third (simulate moving to end)
      cy.dragFromTo(`[data-status="todo"] [data-id="${first}"]`, `[data-status="todo"] [data-id="${third}"]`)

      // wait for reorder
      cy.wait('@reorder', { timeout: 5000 })

      // assert server-side order updated
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token')
        cy.request({ method: 'GET', url: `${api}/api/tasks`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          const todo = res.body.filter((t: any) => (t.status || 'todo') === 'todo').sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
          expect(todo[todo.length - 1].id).to.equal(first)
        })
      })
    })
  })
})