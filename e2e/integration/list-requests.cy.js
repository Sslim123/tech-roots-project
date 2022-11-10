describe('check the lists of requests and donators are there and not empty', () => {
  it('shows a laptop list table with one or more entries', () => {
    cy.visit('http://localhost:3000/list-requests')
    cy.contains('Laptop List Table').click()
    cy.get('table > tbody > tr').should('have.length.greaterThan', 0)
  })
  it('shows a donator list table with one or more entries', () => {
    cy.visit('http://localhost:3000/list-requests')
    cy.contains('Donator List Table').click()
    cy.get('table > tbody > tr').should('have.length.greaterThan', 0)
  })
})
