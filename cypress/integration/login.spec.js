describe('Login', () => {
    it('successfully loads', () => {
        cy.visit('/login')
      })
      it('allows a valid user to sign in', () => {
        // Fill out web form
        cy.get('#inputEmail').type('123456@wit.ie');
        cy.get('#inputPassword').type('123456');
        cy.get('.btn').click();
        cy.url().should('include', '/')
      });

});
