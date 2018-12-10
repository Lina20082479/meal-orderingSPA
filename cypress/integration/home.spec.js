describe('Home Page', () => {
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
        })
    beforeEach(function () {
        cy.visit('/login')
        cy.get('#inputEmail').type('test@meal.ie')
        cy.get('#inputPassword').type('123456')
        cy.get('.btn').click()
        cy.wait(1000)
        cy.url().should('include', '/')
    })
describe('The user make an order', () => {
    it('allows a dish to be added to the order', () => {
        cy.get(':nth-child(1) > [aria-colindex="4"] > [src="data:image/png;base64,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"] ').click()
        cy.get(':nth-child(2) > [aria-colindex="4"] > [src="data:image/png;base64,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"]').click()

        cy.get('tbody > :nth-child(1) > [aria-colindex="5"]').should('contain', '1')
        cy.get(':nth-child(2) > [aria-colindex="5"]').should('contain', '1')
        cy.get('.total-price').should('contain', '7.5')
    })
    it('allows a dish to be deleted from the order', () => {
        cy.get(':nth-child(1) > [aria-colindex="4"] > [src="data:image/png;base64,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"] ').click()
        cy.get(':nth-child(2) > [aria-colindex="4"] > [src="data:image/png;base64,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"]').click()
        cy.get(':nth-child(1) > [aria-colindex="4"] > [width="30px;"]').click()
        cy.get('tbody > :nth-child(1) > [aria-colindex="5"]').should('contain', '0')
        cy.get('.total-price').should('contain', '3')
    })
    it('allows the order to be submited', () => {
        cy.get(':nth-child(1) > [aria-colindex="4"] > [src="data:image/png;base64,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"] ').click()
        cy.wait(1000)
        cy.get(':nth-child(2) > [aria-colindex="4"] > [src="data:image/png;base64,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"]').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > [aria-colindex="4"] > [width="30px;"]').click()
        cy.wait(1000)
        cy.get(':nth-child(2) > [aria-colindex="5"]').should('contain', '1')
        cy.get('.total-price').should('contain', '3')
        cy.get('.col-9 > .btn-success').click()
        cy.wait(1000)
        cy.get('.swal2-confirm').contains('Cool').click()
        cy.get('.total-price').should('contain', '0')
    })
})
    describe('The user view their order', () => {
        it('allows the user to view their order', () => {
        cy.get('.nav-link > a').click()
        cy.wait(5000)
        cy.url().should('include', '/my-orders')
        // cy.get('tbody > tr > [aria-colindex="1"]').should('contain', '1')
        // cy.get('tbody > tr > [aria-colindex="2"]').should('contain', '3')
        // cy.get('.list-group-item').should('contain', 'mushroom soup')
        })
    })
    after(function () {
          cy.get('.btn').click()
          cy.url().should('include', '/login')
        })
         
});