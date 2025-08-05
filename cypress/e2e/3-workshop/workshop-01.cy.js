
context('Actions', () => {

    it('defining a custom command', () => {
        Cypress.Commands.add('getById', (selector, ...args) => {
            return cy.get(`[id=${selector}]`, ...args)
        })

        cy.visit("https://example.cypress.io/commands/actions")

        cy.getById("focus").click()
    })

})