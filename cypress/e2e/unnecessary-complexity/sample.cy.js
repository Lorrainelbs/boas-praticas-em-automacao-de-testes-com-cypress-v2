describe('Unnecessary complexity bad practice', () => {
  beforeEach(() => {
    cy.visit('https://bit.ly/2XSuwCW')
    cy.randomlyTogglePurchaseAgreement() //este comando está marcando aleatoriamente o 'agree'
  })

  Cypress._.times(5, () => {
    it('checks the checkbox only if not checked', () => {
      cy.get('#agree')
        .check()
        .should('be.checked')
    })
  })
})