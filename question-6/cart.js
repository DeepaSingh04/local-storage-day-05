const cartList = document.getElementById('cart-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
  cartList.innerHTML = '';
  if (cart.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty!</p>';
    return;
  }
  
  cart.forEach((user, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <button class="delete" onclick="removeFromCart(${index})">Delete</button>
    `;
    cartList.appendChild(card);
  });
}

// Function to remove user from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

renderCart();
