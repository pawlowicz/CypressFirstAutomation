class CartViewPage {

    getAllItemsDetails() {
        return cy.get('h4 > p');
    }
    
    getAllValues() {
        return cy.get('p.text-md');
    }

    getTotalValue() {
        return cy.get('dd.text-lg');
    }

    getCartButton() {
        return cy.get("a.xs\:flex");
    }
    
}

export default new CartViewPage();