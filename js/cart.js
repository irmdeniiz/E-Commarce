import {
    calculateCartTotal,
    getCartFromLocalStorage,
    saveToLocalStorage,
    updateCartIcon,
  } from "./utils.js";
  
  let cart = getCartFromLocalStorage();
  export function addToCart(event, products) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID);
    if (product) {
      const exitingItem = cart.find((item) => item.id === productID);
      if (exitingItem) {
        exitingItem.quantity++;
      } else {
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        };
        cart.push(cartItem); 
        event.target.textContent = "Added"; 
        updateCartIcon(cart);
        saveToLocalStorage(cart);
        renderCartItems();
        displayCartTotal();
      }
    }
  }
 
  function removeFromCart(event) {
 
    const productID = parseInt(event.target.dataset.id);
   
    cart = cart.filter((item) => item.id !== productID);
    saveToLocalStorage(cart);
    renderCartItems();
    displayCartTotal();
    updateCartIcon(cart);
  }
  
  function changeQuantity(event) {
    const quantity = parseInt(event.target.value);
    const productID = parseInt(event.target.dataset.id);
  
    if (quantity > 0) {
      const cartItem = cart.find((item) => item.id === productID);
      if (cartItem) {
        cartItem.quantity = quantity;
        saveToLocalStorage(cart);
        displayCartTotal();
        updateCartIcon(cart);
      }
    }
  }
  
  export function renderCartItems() {
    const cartItemsElement = document.getElementById("cartItems");
    cartItemsElement.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
          <img
            src="${item.image}"
            alt=""
          />
          <div class="cart-item-info">
            <h2 class="cart-item-title">${item.title}</h2>
            <input
              type="number"
              min="1"
              value="${item.quantity}"
              class="cart-item-quantity"
              data-id="${item.id}"
            />
          </div>
          <h2>$${item.price}</h2>
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
    
    `
      )
      .join("");
  
    const removeButtons = document.getElementsByClassName("remove-from-cart");
    for (let i = 0; i < removeButtons.length; i++) {
      const removeButton = removeButtons[i];
      removeButton.addEventListener("click", removeFromCart);
    }
  
    const quantityInputs = document.getElementsByClassName("cart-item-quantity");
    console.log(quantityInputs);
    for (let i = 1; i < quantityInputs.length; i++) {
      const quantityInput = quantityInputs[i];
      console.log(quantityInput);
  
      quantityInput.addEventListener("change", changeQuantity);
    }
  
    updateCartIcon(cart);
  }
  
  export function displayCartTotal() {
    const cartTotalElement = document.getElementById("cartTotal");
    const total = calculateCartTotal(cart);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  }