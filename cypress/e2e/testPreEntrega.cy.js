/// <reference types="cypress" />

import { RegisterPage } from "../support/pages/registerPage";
import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { CartPage } from "../support/pages/cartPage";

describe("Pre-entrega", () => {
  let dataLogin, dataProducts;
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  before("Archivos .json", () => {
    cy.fixture("userData").then((dato) => {
      dataLogin = dato;

      cy.fixture("productsData").then((datos) => {
        dataProducts = datos;
      });
    });
  });

  it("Verificacion y suma de precios", () => {
    let suma = dataProducts.product5.price + dataProducts.product7.price;

    cy.visit("");
    registerPage.ingresarLoginPage();

    loginPage.ingresarUsuario(dataLogin.user);
    loginPage.ingresarPassword(dataLogin.pass);
    loginPage.botonIngresar();

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
  });
});
