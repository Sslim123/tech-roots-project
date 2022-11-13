import { faker } from "@faker-js/faker/locale/en_GB"

describe('add a laptop request', () => {
    it('allows a user to add a laptop request', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Register for a laptop').click()
        const firstName = faker.name.firstName();
        cy.get('input[name=firstName]').type(firstName)
        cy.get('input[name=lastName]').type(faker.name.lastName())
        cy.get('input[name=email]').type(faker.internet.email())
        cy.get('input[name=phoneNumber]').type(faker.phone.number())
        cy.get('form').submit()
        cy.visit('http://localhost:3000/list-laptop-requests')
        cy.get('table').should('include.text', firstName)
    })
})