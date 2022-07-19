import ItemViewPage from "../pages/ItemViewPage.js"
import CartViewPage from "../pages/CartViewPage.js"

describe('Check total price', () => {
    
    beforeEach(() => {
        cy.log('I run before every test in every spec file')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it ('Add items to the cart and check total value', () => {
        const itemViewPage = ItemViewPage;
        const cartViewPage = CartViewPage;
        var sum = 0

        //Add first Item
        cy.visit("https://demo.saleor.io/default-channel/en-US/products/abba-abba-aniversario-los-10-anos-de-abba/")
        cy.wait(600)
        itemViewPage.getItemType().select('abba-aniversario-los-10-anos-de-abba-vinyl-289424') //.should('have.value', 'abba-aniversario-los-10-anos-de-abba-vinyl-289424'); 
        itemViewPage.getSubmitButton().click()
        cy.wait(600)

        //Add second Item
        cy.visit("https://demo.saleor.io/default-channel/en-US/products/ariana-grande-ariana-grande-god-is-a-woman/")
        itemViewPage.getItemType().select('ariana-grande-god-is-a-woman-cd-1394637')
        itemViewPage.getSubmitButton().click()

        //Go to cart and check total value
        cy.visit("https://demo.saleor.io/default-channel/en-US/cart/") //cartViewPage.getCartButton().click()
        
        cartViewPage.getAllItemsDetails().then(items => {
            expect(items[0]).to.contain.text('abba-aniversario-los-10-anos-de-abba-vinyl-289424')
            expect(items[1]).to.contain.text('ariana-grande-god-is-a-woman-cd-1394637')
        })

        cartViewPage.getAllValues().each(($el, index, $list) => {
            const amount=$el.text()
            var res = amount.slice(1)
            sum = Number(sum) + Number(res)
        }).then(function() {
            cy.log(sum)
        })

        cartViewPage.getTotalValue().then(function(element) {
            const amount=element.text()
            var total = amount.slice(1)
            expect(Number(total)).to.equal(sum)
        })
    })
})