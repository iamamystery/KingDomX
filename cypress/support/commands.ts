Cypress.Commands.add('loginDemo', (role = 'ADMIN') => {
  cy.request(`${Cypress.env('API_URL') || 'http://localhost:4000'}/api/auth/demo?role=${role}`)
    .then((res) => {
      window.localStorage.setItem('token', res.body.token)
    })
})

Cypress.Commands.add('dragFromTo', (source, target, options = {}) => {
  const attempts = options.attempts || 3
  const steps = options.steps || 6
  const waitBetween = options.waitBetween || 100

  function stepMove(startX: number, startY: number, endX: number, endY: number, step: number, totalSteps: number) {
    const x = Math.round(startX + ((endX - startX) * (step / totalSteps)))
    const y = Math.round(startY + ((endY - startY) * (step / totalSteps)))
    cy.document().trigger('pointermove', { clientX: x, clientY: y, force: true })
  }

  cy.get(source).scrollIntoView().then($source => {
    const sourceRect = $source[0].getBoundingClientRect()
    cy.get(target).scrollIntoView().then($target => {
      const targetRect = $target[0].getBoundingClientRect()
      const startX = Math.round(sourceRect.left + sourceRect.width / 2)
      const startY = Math.round(sourceRect.top + sourceRect.height / 2)
      const endX = Math.round(targetRect.left + targetRect.width / 2)
      const endY = Math.round(targetRect.top + targetRect.height / 2)

      // attempt a few times to make CI more robust
      let attempt = 0
      const doAttempt = () => {
        attempt++
        // pointerdown at start
        cy.get(source).trigger('pointerdown', { button: 0, clientX: startX, clientY: startY, force: true })

        // series of small pointermoves to emulate a smooth drag
        for (let s = 1; s <= steps; s++) {
          // eslint-disable-next-line no-loop-func
          cy.wait(waitBetween)
          // use the document as target for pointermove to simulate continued movement
          cy.document().trigger('pointermove', { clientX: Math.round(startX + ((endX - startX) * (s / steps))), clientY: Math.round(startY + ((endY - startY) * (s / steps))), force: true })
        }

        // final pointerup at end
        cy.get(target).trigger('pointermove', { clientX: endX, clientY: endY, force: true }).trigger('pointerup', { force: true })

        // small pause to allow DOM updates / server calls
        cy.wait(500)

        if (attempt < attempts) {
          // try once more if flaky
          doAttempt()
        }
      }

      doAttempt()
    })
  })
})
