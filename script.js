let cart = [];

function addToCart(id) {
  const product = document.querySelector(`.product[data-id="${id}"]`);
  if (!product) {
    console.error(`Product with data-id ${id} not found`);
    return;
  }
  const productName = product.querySelector('span').textContent;
  const cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ id, name: productName, quantity: 1 });
  }

  updateCart();
  updateCartCounter();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
  updateCartCounter();
}

function updateCart() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';

  cart.forEach((item) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
                  <span>${item.name} (x${item.quantity})</span>
                  <button onclick="removeFromCart(${item.id})">Remove</button>
              `;
    cartElement.appendChild(cartItemElement);
  });

  updateTotal();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.quantity * 10, 0); // Assuming each item costs $10
  document.getElementById('total').textContent = total;
}

function updateCartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = totalItems;
}
