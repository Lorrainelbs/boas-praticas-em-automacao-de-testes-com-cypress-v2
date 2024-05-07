describe('Unnecessary waiting bad practice', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('searches for a meal by typing and clicking the submit button', () => {
    cy.get('[data-test-id="search-field"]').type('Ramen')
    cy.get('[data-test-id="search-button"]')
      .click()
      .blur()

    cy.contains('h2', 'Ramen (sopa)', {timeout: 10000}) //desse modo o teste espera pelo tempo máximo e nao pelo tempo minimo
      .should('be.visible')
  })
})
