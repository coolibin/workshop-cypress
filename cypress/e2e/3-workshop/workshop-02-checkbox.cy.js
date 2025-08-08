/// <reference types="cypress" />

context('Checkbox Testing Workshop', () => {
    beforeEach(() => {
        // Visit the Cypress actions page which has various checkbox examples
        cy.visit('https://example.cypress.io/commands/actions')
    })

    describe('Basic Checkbox Operations', () => {
        beforeEach(() => {
            // Set up aliases for commonly used selectors
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').first().as('checkbox1')
            cy.get('.action-check [type="checkbox"]').not('[disabled]').first().as('checkbox2')
        })

        it('should check and verify checkbox state', () => {
            // Test checking a single checkbox
            cy.get('@checkbox1').check()
            cy.get('@checkbox1').should('be.checked')
        })

        it('should uncheck and verify checkbox state', () => {
            // First check the checkbox, then uncheck it
            cy.get('@checkbox2').check()
            cy.get('@checkbox2').should('be.checked').uncheck()
            cy.get('@checkbox2').should('not.be.checked')
        })

        it('should check multiple checkboxes by value', () => {
            // Check multiple checkboxes using their values
            cy.get('.action-multiple-checkboxes [type="checkbox"]').as('multipleCheckboxes')
            cy.get('@multipleCheckboxes').check(['checkbox1', 'checkbox2'])
            cy.get('@multipleCheckboxes').should('be.checked')
        })

        it('should uncheck multiple checkboxes by value', () => {
            // First check multiple checkboxes, then uncheck them
            cy.get('.action-check [type="checkbox"]').as('checkGroup')
            cy.get('@checkGroup').check(['checkbox1', 'checkbox3'])
            
            // Verify the specific checkboxes are checked
            cy.get('.action-check [type="checkbox"]').filter('[value="checkbox1"]').should('be.checked')
            cy.get('.action-check [type="checkbox"]').filter('[value="checkbox3"]').should('be.checked')
            
            cy.get('@checkGroup').uncheck(['checkbox1', 'checkbox3'])
            
            // Verify the specific checkboxes are unchecked
            cy.get('.action-check [type="checkbox"]').filter('[value="checkbox1"]').should('not.be.checked')
            cy.get('.action-check [type="checkbox"]').filter('[value="checkbox3"]').should('not.be.checked')
        })
    })

    describe('Checkbox State Verification', () => {
        beforeEach(() => {
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').first().as('testCheckbox')
            cy.get('.action-checkboxes').find('label').first().as('checkboxLabel')
        })

        it('should verify checkbox is initially unchecked', () => {
            // Verify that checkboxes start in unchecked state
            cy.get('@testCheckbox').should('not.be.checked')
        })

        it('should verify checkbox attributes and properties', () => {
            cy.get('@testCheckbox')
                .should('have.attr', 'type', 'checkbox')
                .and('not.be.checked')
                .check()
            
            cy.get('@testCheckbox')
                .should('be.checked')
                .and('have.prop', 'checked', true)
        })

        it('should verify checkbox label association', () => {
            // Test that clicking a label toggles the associated checkbox
            cy.get('@checkboxLabel').click()
            cy.get('@testCheckbox').should('be.checked')
        })
    })

    describe('Edge Cases and Error Handling', () => {
        beforeEach(() => {
            cy.get('.action-checkboxes [disabled]').as('disabledCheckbox')
            cy.get('.action-check [disabled]').as('disabledCheckbox2')
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').first().as('visibleCheckbox')
        })

        it('should handle disabled checkboxes with force option', () => {
            // Test checking disabled checkboxes using force
            cy.get('@disabledCheckbox').check({force: true})
            cy.get('@disabledCheckbox').should('be.checked')
        })

        it('should handle unchecking disabled checkboxes with force option', () => {
            // First check a disabled checkbox, then uncheck it with force
            cy.get('@disabledCheckbox2').check({force: true})
            cy.get('@disabledCheckbox2').should('be.checked').uncheck({force: true})
            cy.get('@disabledCheckbox2').should('not.be.checked')
        })

        it('should verify checkbox visibility before interaction', () => {
            // Ensure checkbox is visible before attempting to interact
            cy.get('@visibleCheckbox')
                .should('be.visible')
                .and('not.be.checked')
                .check()
            
            cy.get('@visibleCheckbox').should('be.checked')
        })
    })

    describe('Advanced Checkbox Testing', () => {
        beforeEach(() => {
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').first().as('advancedCheckbox')
        })

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
            cy.toggleCheckbox('@advancedCheckbox')
            cy.get('@advancedCheckbox').should('be.checked')

            cy.toggleCheckbox('@advancedCheckbox')
            cy.get('@advancedCheckbox').should('not.be.checked')
        })

        it('should test checkbox change events', () => {
            // Test that checking a checkbox triggers appropriate events
            cy.get('@advancedCheckbox').check()
            
            cy.get('@advancedCheckbox')
                .should('be.checked')
                .and('have.prop', 'checked', true)
                .and('have.attr', 'type', 'checkbox')
        })

        it('should test checkbox accessibility', () => {
            // Test keyboard navigation and accessibility
            cy.get('@advancedCheckbox').focus().type(' ')
            
            cy.get('@advancedCheckbox').should('be.checked').type(' ')
            
            cy.get('@advancedCheckbox').should('not.be.checked')
        })
    })

    describe('Checkbox Form Integration', () => {
        beforeEach(() => {
            cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').first().as('formCheckbox')
            cy.get('.action-multiple-checkboxes [type="checkbox"]').as('conditionalCheckboxes')
        })

        it('should test checkbox in form submission', () => {
            // Test that checkbox state is included in form data
            cy.get('@formCheckbox').check()
            cy.get('@formCheckbox').should('be.checked')

            // Verify the checkbox is properly checked and ready for form submission
            cy.get('@formCheckbox')
                .should('have.prop', 'checked', true)
                .and('be.visible')
        })

        it('should test conditional checkbox behavior', () => {
            // Test checkboxes that depend on other checkboxes
            cy.get('@conditionalCheckboxes').check('checkbox1')
            cy.get('@conditionalCheckboxes').should('be.checked')

            // Test that related checkboxes behave correctly
            cy.get('@conditionalCheckboxes').check('checkbox2')
            cy.get('@conditionalCheckboxes').should('be.checked')
        })
    })
})
