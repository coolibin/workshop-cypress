/// <reference types="cypress" />

context('Checkbox Testing Workshop', () => {
    beforeEach(() => {
        // Visit the Cypress actions page which has various checkbox examples
        cy.visit('https://example.cypress.io/commands/actions')
    })

    describe('Basic Checkbox Operations', () => {
        it('should check and verify checkbox state', () => {
            // Test checking a single checkbox
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .check()
                .should('be.checked')
        })

        it('should uncheck and verify checkbox state', () => {
            // First check the checkbox, then uncheck it
            cy.get('.action-check [type="checkbox"]')
                .not('[disabled]')
                .first()
                .check()
                .should('be.checked')
                .uncheck()
                .should('not.be.checked')
        })

        it('should check multiple checkboxes by value', () => {
            // Check multiple checkboxes using their values
            cy.get('.action-multiple-checkboxes [type="checkbox"]')
                .check(['checkbox1', 'checkbox2'])
                .should('be.checked')
        })

        it('should uncheck multiple checkboxes by value', () => {
            // First check multiple checkboxes, then uncheck them
            cy.get('.action-check [type="checkbox"]')
                .check(['checkbox1', 'checkbox3'])
                .should('be.checked')
                .uncheck(['checkbox1', 'checkbox3'])
                .should('not.be.checked')
        })
    })

    describe('Checkbox State Verification', () => {
        it('should verify checkbox is initially unchecked', () => {
            // Verify that checkboxes start in unchecked state
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .should('not.be.checked')
        })

        it('should verify checkbox attributes and properties', () => {
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .should('have.attr', 'type', 'checkbox')
                .and('not.be.checked')
                .check()
                .should('be.checked')
                .and('have.prop', 'checked', true)
        })

        it('should verify checkbox label association', () => {
            // Test that clicking a label toggles the associated checkbox
            cy.get('.action-checkboxes')
                .find('label')
                .first()
                .click()

            cy.get('.action-checkboxes [type="checkbox"]')
                .first()
                .should('be.checked')
        })
    })

    describe('Edge Cases and Error Handling', () => {
        it('should handle disabled checkboxes with force option', () => {
            // Test checking disabled checkboxes using force
            cy.get('.action-checkboxes [disabled]')
                .check({force: true})
                .should('be.checked')
        })

        it('should handle unchecking disabled checkboxes with force option', () => {
            // First check a disabled checkbox, then uncheck it with force
            cy.get('.action-check [disabled]')
                .check({force: true})
                .should('be.checked')
                .uncheck({force: true})
                .should('not.be.checked')
        })

        it('should verify checkbox visibility before interaction', () => {
            // Ensure checkbox is visible before attempting to interact
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .should('be.visible')
                .and('not.be.checked')
                .check()
                .should('be.checked')
        })
    })

    describe('Advanced Checkbox Testing', () => {
        it('should test checkbox with custom commands', () => {
            // Define a custom command for checkbox testing
            Cypress.Commands.add('toggleCheckbox', (selector) => {
                cy.get(selector).then(($checkbox) => {
                    if ($checkbox.is(':checked')) {
                        cy.get(selector).uncheck()
                    } else {
                        cy.get(selector).check()
                    }
                })
            })

            // Use the custom command
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .as('testCheckbox')

            cy.toggleCheckbox('@testCheckbox')
            cy.get('@testCheckbox').should('be.checked')

            cy.toggleCheckbox('@testCheckbox')
            cy.get('@testCheckbox').should('not.be.checked')
        })

        it('should test checkbox change events', () => {
            // Test that checking a checkbox triggers appropriate events
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .check()
                .should('be.checked')
                .and('have.prop', 'checked', true)
                .and('have.attr', 'type', 'checkbox')
        })

        it('should test checkbox accessibility', () => {
            // Test keyboard navigation and accessibility
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .focus()
                .type(' ')
                .should('be.checked')
                .type(' ')
                .should('not.be.checked')
        })
    })

    describe('Checkbox Form Integration', () => {
        it('should test checkbox in form submission', () => {
            // Test that checkbox state is included in form data
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .check()
                .should('be.checked')

            // Verify the checkbox is properly checked and ready for form submission
            cy.get('.action-checkboxes [type="checkbox"]')
                .not('[disabled]')
                .first()
                .should('have.prop', 'checked', true)
                .and('be.visible')
        })

        it('should test conditional checkbox behavior', () => {
            // Test checkboxes that depend on other checkboxes
            cy.get('.action-multiple-checkboxes [type="checkbox"]')
                .check('checkbox1')
                .should('be.checked')

            // Test that related checkboxes behave correctly
            cy.get('.action-multiple-checkboxes [type="checkbox"]')
                .check('checkbox2')
                .should('be.checked')
        })
    })
})
