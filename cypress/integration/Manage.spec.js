describe('Manage', () => {
    before(function () {
        cy.visit('/login')
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
     describe('The administrator changes the menu', () => {
    it('allows a dish to be added', () => {
        cy.get('.btn-success').click()
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').type('fried salty chicken')
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').type('chicken')
        cy.get(':nth-child(3) > .col-sm-10 > #input-default').clear().type(6.5)
        cy.get('#modalPrevent___BV_modal_footer_ > .btn-primary').click()
    })
    it('allows a dish to be deleted', () => {
     //   cy.get('.col-9').find('tr').should('have.length', 5)
        cy.get(':nth-child(2) > [aria-colindex="4"] > [width="30px;"]').click()
     //   cy.get('.col-9').find('tr').should('have.length', 4)
    })
    it('allows a dish to be edited', () => {
        cy.get(':nth-child(1) > [aria-colindex="4"] > [src="/static/img/edit.d89ca6d.png"]').click()
        cy.get('#__BVID__6___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').clear().type('spring roll X')
        cy.get('#__BVID__6___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').clear().type(5)
        cy.get('#__BVID__6___BV_modal_footer_ > .btn-primary').contains('OK').click()
    })
 })
 describe('The administrator view the customer orders', () => {
    it('allows the user to view their order', () => {
    cy.get('body').click()
    
    })
 })
    })