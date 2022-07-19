class ItemViewPage {

    getItemType() {
        return cy.get('.w-full.text-base');
    }
    getSubmitButton() {
        return cy.get("button[type='Submit']");
    }
    
}

export default new ItemViewPage();