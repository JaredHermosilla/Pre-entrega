export class CheckoutPage{
    constructor(){
    this.firstName = "#FirstName";
    this.lastName = "#lastName";
    this.cardNumber = "#cardNumber";
    this.purchaseButton = "//button[text()='Purchase']"
    };

    ingresarNombre(name){
    cy.get(this.firstName).type(name)
    }
    
    ingresarApellido(apellido){
        cy.get(this.lastName).type(apellido)
    }

    ingresarNumeroDeTarjeta(number){
        cy.get(this.cardNumber).type(number)
    }

    clickPurchaseButton(){
        cy.xpath(this.purchaseButton).click()
    }
}
