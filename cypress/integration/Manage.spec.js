describe('Manage', () => {
    before(function () {
        cy.visit('http://localhost:8080/login')
        cy.get('#inputEmail').type('root@meal.ie')
        cy.get('#inputPassword').type('123456')
        cy.get('.btn').click()
        cy.url().should('include', '/')
        cy.request('http://localhost:3000/dishes/')
          .its('body')
          .then( (dishes) => {
             dishes.forEach( (element) => {
                cy.request('DELETE',
                   'http://localhost:3000/dishes/' + element._id)
             });
          })
          cy.fixture('dishes')
            .then((dishes) => {
                dishes.forEach((dish) => {
                  cy.request('POST',
                     'http://localhost:3000/dishes/', dish )
                })
          })
          
     }); 
    it('allows a dish to be added', () => {
        cy.get('.btn-success').click()
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').type('fried salty chicken')
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').type('chicken')
        cy.get(':nth-child(3) > .col-sm-10 > #input-default').type(6.5)
        cy.get('#modalPrevent___BV_modal_footer_ > .btn-primary').click()
    })
    it('allows a dish to be deleted', () => {
        cy.get('.col-9').find('tr').should('have.length', 5)
        cy.get(':nth-child(4) > [aria-colindex="4"] > [width="30px;"]').click()
        cy.get('.col-9').find('tr').should('have.length', 4)
    })
    })