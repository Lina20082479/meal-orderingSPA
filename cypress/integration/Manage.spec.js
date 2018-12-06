describe('Manage', () => {
    before(function () {
        cy.visit('/login')
        cy.get('#inputEmail').type('root@meal.ie')
        cy.get('#inputPassword').type('123456')
        cy.get('.btn').click()
        cy.url().should('include', '/')
        
    })
    it('allows a dish to be added', () => {
        cy.get('.btn-success').click()
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(1) > .col-sm-10 > #input-default').type('fried salty chicken')
        cy.get('#modalPrevent___BV_modal_body_ > :nth-child(2) > .col-sm-10 > #input-default').type('chicken')
        cy.get(':nth-child(3) > .col-sm-10 > #input-default').type(6.5)
        cy.get('#modalPrevent___BV_modal_footer_ > .btn-primary').click()
    })
    })