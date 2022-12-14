/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { CartPage } from "../support/pages/cartPage";
import { CheckoutPage } from "../support/Pages/checkoutPage";
import { ReciptPage } from "../support/Pages/reciptPage";

describe("Pre-entrega", () => {
  let datosCheckout, dataProducts;

  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const reciptPage = new ReciptPage();


  before("Archivos .json", () => {
  
    cy.fixture("productsData").then((datos) => {
        dataProducts = datos;
      });

    cy.fixture("checkoutData").then((data) =>{
      datosCheckout = data;
    });

    cy.request({
        url: "https://pushing-it.onrender.com/api/register",
        method: "POST",
        body: {
          username: "user",
          password: "pass",
          gender: "Male",
          day: "11",
          month: "August",
          year: "1992"
        }   
  
      }).then((respuesta) => {
          expect(respuesta.status).equal(200);
      });

    cy.request({
        method: "POST",
        url: "https://pushing-it.onrender.com/api/login",
        body: {
            username: "user",
            password: "pass"
        }
    }).then((respuesta) =>{
        window.localStorage.setItem('token', respuesta.body.token)
        window.localStorage.setItem('user', respuesta.body.user.username)
    })

    cy.visit("");
    
  });

  it("Agregar y comprar productos", () => {
    let suma = dataProducts.product5.price + dataProducts.product7.price;

    homePage.ingresarProductsPage();

    productsPage.seleccionarProducto(dataProducts.product5.name);
    productsPage.agregarProductoAlCart();
    productsPage.seleccionarProducto(dataProducts.product7.name);
    productsPage.agregarProductoAlCart();
    productsPage.irAlCarrito();

    cartPage.verificarProducto(dataProducts.product5.name).should("have.text", dataProducts.product5.name);
    cartPage.verificarPrecio(dataProducts.product5.name,dataProducts.product5.price).should("have.text", `$${dataProducts.product5.price}`);

    cartPage.verificarProducto(dataProducts.product7.name).should("have.text", dataProducts.product7.name);
    cartPage.verificarPrecio(dataProducts.product7.name,dataProducts.product7.price).should("have.text", `$${dataProducts.product7.price}`);

    cartPage.buttonImporteTotal();

    cartPage.verificarImporte().should("have.text", suma);

    cartPage.irAlCheckout();

    checkoutPage.ingresarNombre(datosCheckout.fristName);
    checkoutPage.ingresarApellido(datosCheckout.lastName);
    checkoutPage.ingresarNumeroDeTarjeta(datosCheckout.numberCard);
    checkoutPage.clickPurchaseButton();

    
    reciptPage.verificarBotonThankYou().should("have.text", "Thank you");
    reciptPage.verificarNombres(datosCheckout.fristName, datosCheckout.lastName);
    reciptPage.verificarProduct(dataProducts.product5.name).should("have.text", dataProducts.product5.name);
    reciptPage.verificarProduct(dataProducts.product7.name).should("have.text", dataProducts.product7.name);
    reciptPage.verificarCadNumber().should("have.text", datosCheckout.numberCard);
    reciptPage.verificarTotalAmount(suma);

  });

  after("logout", () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/deleteuser/user",
      method: "DELETE"
    }).then(respuesta => {
      expect(respuesta.status).equal(200)
      })
  })
})
