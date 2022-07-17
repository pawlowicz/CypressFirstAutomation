describe('Saleor Test Suite', () => {
    
    beforeEach(() => {
        cy.log('I run before every test in every spec file')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it ('Add items to the cart and check total value', () => {
        var sum = 0

        //Add first Item
        cy.visit("https://demo.saleor.io/default-channel/en-US/products/abba-abba-aniversario-los-10-anos-de-abba/")
        cy.wait(600)
        cy.get('.w-full.text-base').select('abba-aniversario-los-10-anos-de-abba-vinyl-289424') //.should('have.value', 'abba-aniversario-los-10-anos-de-abba-vinyl-289424'); 
        cy.wait(600)
        cy.get("button[type='Submit']").click()

        //Add second Item
        cy.visit("https://demo.saleor.io/default-channel/en-US/products/ariana-grande-ariana-grande-god-is-a-woman/")
        cy.wait(600)
        cy.get('.w-full.text-base').select('ariana-grande-god-is-a-woman-cd-1394637')
        cy.wait(600)
        cy.get("button[type='Submit']").click()

        //Go to cart and check total value
        cy.visit("https://demo.saleor.io/default-channel/en-US/cart/")
        
        cy.get('p.text-md').each(($el, index, $list) => {
            const amount=$el.text()
            var res = amount.slice(1)
            sum = Number(sum) + Number(res)
        }).then(function() {
            cy.log(sum)
        })

        cy.get('dd.text-lg').then(function(element) {
            const amount=element.text()
            var total = amount.slice(1)
            expect(Number(total)).to.equal(sum)
        })
    })
})