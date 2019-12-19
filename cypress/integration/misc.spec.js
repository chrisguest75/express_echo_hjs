describe('Test the echo page', function() {
  it('Visit the echo page', function() {
    cy.visit('http://0.0.0.0:3000/')
  
    cy.contains('Echo')
  })
})