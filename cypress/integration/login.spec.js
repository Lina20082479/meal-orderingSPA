describe('Login', () => {
  before('successfully loads', () => {
        cy.visit('/login')
      })
      it('login in fail', () => {
        cy.get('#inputEmail').type('123456@wit.ie');
        cy.get('#inputPassword').type('12345');
        cy.get('.btn').click();
        cy.wait(1000)
        cy.get('.alert').should('contain', 'Wrong Password or Email')
      })
      it('allows a valid user to sign in', () => {
        cy.visit('/login')
        cy.get('#inputEmail').type('123456@wit.ie');
        cy.get('#inputPassword').type('123456');
        cy.get('.btn').click();
        cy.wait(1000)
        cy.url().should('include', '/')
      });

});
