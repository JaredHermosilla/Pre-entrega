export class ReciptPage {
    constructor() {
    this.buttonThankYou = "//button[text()='Thank you']";
    this.selectorNames = "#name";
    this.cardNumber = "#creditCard";
    this.totalPrice = "#totalPrice";
    }

    verificarBotonThankYou() {
        return cy.xpath(this.buttonThankYou, {timeout: 10000});
    }

    verificarNombres() {
       return cy.get(this.selectorNames)
    }

    verificarProduct(product){
        return cy.xpath(`//p[text()='${product}']`,{timeout: 10000});
    }

    verificarCadNumber() {
        return cy.get(this.cardNumber);
    }

    verificarTotalAmount() {
        return cy.get(this.totalPrice)
    }


}
