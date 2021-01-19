describe('My First Test', () => {
    it('Opens first page', () => {
        cy.visit('http://localhost:3000/registerClient')
    })
})
describe('Type test', () => {
    it('Clicks the link "button"', () => {
        cy.visit('http://localhost:3000/registerClient')
        cy.get('.btn').click()
    })
})
describe('Type test', () => {
    it('Clicks the link "button"', () => {
        cy.visit('http://localhost:3000/registerClient')
        cy.get('#lastName')
        cy.get('#licensePlate')
        cy.get('#phoneNumber')
        cy.get('#email')
        cy.get('.btn').click()
    })
})
describe('test login button', () => {
    it('Visits the client page via "client" link on navbar', () => {
        cy.visit('http://localhost:3000/clients')
   
        cy.get('#clients').click()
   
        cy.url().should('include', '/clients')
    })
  })
  describe('test login button', () => {
    it('test "upload image" link on navbar', () => {
        cy.visit('http://localhost:3000/uploadImage')
   
        cy.get('#uploadImage').click()
   
        cy.url().should('include', '/uploadImage')
    })
  })
  describe('test login button', () => {
    it('Visits the client page via "client" link on navbar', () => {
        cy.visit('http://localhost:3000/clients')
   
        cy.get('#clients').click()
   
        cy.url().should('include', '/clients')
    })
  })

  describe('test login button', () => {
    it('Visits the client page via "client" link on navbar', () => {
        cy.visit('http://localhost:3000/uploadImage')
   
        cy.get('#selectFile').click()
   
        cy.url().should('include', '/uploadImage')
    })
  })

  describe('Upload image', () => {
    it('Visits the client page via "client" link on navbar', () => {
        cy.visit('http://localhost:3000/uploadImage')
   
        cy.get('#upload').click()
   
        cy.url().should('include', '/uploadImage')
    })
  })
  


