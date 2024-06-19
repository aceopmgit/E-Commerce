const cartItemsElement = document.getElementById('cartItems');
const cartTotalElemt = document.getElementById('cartTotal');
let cart = [];

function showCartItems() {
    // console.log('hello')
    cartItemsElement.innerHTML = cart
        .map((item) => `
      <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
                      <div class="cart-item-info">
                          <h2 class="cart-item-title">${item.title}</h2>
                          <input type="number" name="" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-item-quantity">
                      </div>
                  </div>
                  <h2 class="cart-item-price">$${item.price}</h2>
                  <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
    
    `)
        .join("")
}