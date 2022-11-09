export class ProductsPage{
    constructor(){
     this.agregarProducto="#closeModal";
     this.irAlCart="//button[@id='goShoppingCart']"
    };
       seleccionarProducto(producto){
           cy.get(`button[value='${producto}']`).click();
       }
       agregarProductoAlCart(){
        cy.get(this.agregarProducto).click();
       }
       irAlCarrito(){
        cy.xpath(this.irAlCart).click();
       }
}
