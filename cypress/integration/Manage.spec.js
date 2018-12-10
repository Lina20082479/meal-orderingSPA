describe('Manage', () => {
    before(function () {
        cy.request('https://meal-ordering-wit.herokuapp.com/dishes/')
          .its('body')
          .then( (dishes) => {
             dishes.forEach( (element) => {
                cy.request('DELETE',
                   'https://meal-ordering-wit.herokuapp.com/dishes/' + element._id)
             });
          })
          cy.fixture('dishes')
            .then((dishes) => {
                dishes.forEach((dish) => {
                  cy.request('POST',
                     'https://meal-ordering-wit.herokuapp.com/dishes/', dish )
                })
          })
    }); 
    beforeEach(function () {
        cy.visit('/login')
        cy.get('#inputEmail').type('root@meal.ie')
        cy.get('#inputPassword').type('123456')
        cy.get('.btn').click()
        cy.wait(1000)
        cy.url().should('include', '/')
          })
    describe('The administrator changes the menu', () => {
    it('allows dished to be added', () => {
        cy.wait(5000)
        cy.get('.btn-success').click()
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').type('fried salty chichen')
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').type('chicken')
        cy.get(':nth-child(3) > .col-sm-10 > #input-default').clear().type(7.5)
        cy.get('#modalPrevent___BV_modal_footer_ > .btn-primary').click()
        cy.wait(1000)
        cy.get('.col-9').find('tr').should('have.length', 5)
    })
    it('allows a dish to be deleted', () => {
        cy.wait(5000)
        cy.get(':nth-child(3) > [aria-colindex="4"] > [width="30px;"]').click()
        cy.wait(1000)
        cy.get('.col-9').find('tr').should('have.length', 4)
    })
    it('allows a dish to be edited', () => {
        cy.wait(1000)
        cy.get(':nth-child(1) > [aria-colindex="4"] > [src="/static/img/edit.d89ca6d.png"]').click()
        cy.wait(1000)
        cy.get('#__BVID__6___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').clear().type('spring roll X')
        cy.get('#__BVID__6___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').clear().type(5)
        cy.get('#__BVID__6___BV_modal_footer_ > .btn-primary').contains('OK').click()
        cy.wait(1000)
    })
 })
 describe('The administrator view the customer orders', () => {
    it('allows the administrator to view the customer orders', () => {
    cy.get('.nav-link > a').click()
    cy.wait(1000)
    cy.url().should('include', '/customer-orders')
    
    })
 })
 after(function () {
    cy.get('.btn').click()
    cy.url().should('include', '/login')
  })
    })