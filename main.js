import { addToCart, displayCartTotal, renderCartItems } from "./js/cart.js";
import { fetchProducts, renderProducts } from "./js/products.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
    displayCartTotal();
  } else {
    const products = await fetchProducts();
    renderProducts(products, (event) => addToCart(event, products));
  }
});