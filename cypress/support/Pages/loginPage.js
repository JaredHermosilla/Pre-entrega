export class LoginPage{
    constructor(){
        this.ingresarNombre = '#user';
        this.ingresarPass = '#pass';
        this.botonLogin = '#submitForm'
    };

    ingresarUsuario(usuario){
       cy.get(this.ingresarNombre).type(usuario);
    };

    ingresarPassword(password){
       cy.get(this.ingresarPass).type(password);
    };

    botonIngresar(){
        cy.get(this.botonLogin).click()
    };

    retornarUsuario(usuario){
        return cy.get(`[id^='user_${usuario}')]`);
    }   
}
