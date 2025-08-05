context('Actions', () => {

    it('defining a custom command', () => {
        Cypress.Commands.add('getById', (selector, ...args) => {
            return cy.get(`#${selector}`, ...args)
        })

        cy.origin('https://example.cypress.io', () => {
            cy.visit("https://example.cypress.io/commands/actions")
            cy.contains('a', '.focus()').click()
        })

        cy.origin('https://docs.cypress.io', () => {
            cy.url().should('include', '/focus');
            cy.get('h1')
                .should('exist')  // Verify element exists
                .and('be.visible') // Verify it's visible
                .and('have.text', 'focus'); // Verify exact text

        })
    })

})