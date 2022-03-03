describe('Login',function() {
  it('succeeds with correct credentials', function() {
    cy.login({ username: 'admin', password: 'password' })
  })
})

describe('Engravings', function() {
  beforeEach(function() {
    cy.login({ username: 'admin', password: 'password' })
  })
  it('engravings page can be navigated to', function() {
    cy.get('#nav-engraving').click()
    cy.contains('Ability Stones Faceting Practice')
  })
})