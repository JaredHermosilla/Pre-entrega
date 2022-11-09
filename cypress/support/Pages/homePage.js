export class HomePage {
    constructor(){
    this.buttonProductsPage = '#onlineshoplink'
    };
    
    ingresarProductsPage(){
        cy.get(this.buttonProductsPage).click()
    }
}
