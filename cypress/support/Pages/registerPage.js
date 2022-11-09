export class RegisterPage{
    constructor(){
    this.botonLogin = "#registertoggle";
    };

    ingresarLoginPage(){
    cy.get(this.botonLogin).dblclick()
    }
}
