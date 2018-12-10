describe('Login', () => {
  before('successfully loads', () => {
        cy.visit('/login')
      })
      it('login in fail', () => {
        cy.get('#inputEmail').type('test@wit.ie');
        cy.get('#inputPassword').type('12345');
        cy.get('.btn').click();
        cy.wait(1000)
        cy.get('.alert').should('contain', 'Wrong Password or Email')
      })
      it('allows a valid user to sign in', () => {
        cy.visit('/login')
        cy.get('#inputEmail').type('test@meal.ie');
        cy.get('#inputPassword').type('123456');
        cy.get('.btn').click();
        cy.wait(1000)
        cy.url().should('include', '/')
      });
      it('allows a valid user to log out', () => {
        cy.get('.ml-auto > .btn').click()
        cy.url().should('include', '/login')
      })

});
