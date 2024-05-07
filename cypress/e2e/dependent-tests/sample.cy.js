describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click() 
    
    cy.contains('h1', 'Your Notes').should('be.visible')
  })

  it('CRUDs a note', () => {
    //creates a note
    cy.contains('Create a new note').click()
    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //asserts the note was created -> confirmar que a nota foi criada
    cy.get('.list-group')
      .contains('My note')
      .click()

    //updates the note
    cy.get('#content').type(' updated')
    cy.contains('Save').click() 

    //asserts the note was updated
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')

    //delete the note
    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()

    //asserts the list has at least one item before asserting the note deletion 
    // this way, we make sure the list of notes has already rendered 
    cy.get('.list-group a')
      .its('length')
      .should('be.at.least', 1)

    //asserts the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')

  })
})