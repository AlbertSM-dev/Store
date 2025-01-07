// script.js

// script.js

window.cart = JSON.parse(localStorage.getItem('cart')) || [];

window.addToCart = function(id) {
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
    localStorage.setItem('cart', JSON.stringify(cart));
};

window.removeFromCart = function(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
    updateCartCounter();
    localStorage.setItem('cart', JSON.stringify(cart));
};

window.updateCart = function() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
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
};

window.updateTotal = function() {
    const total = cart.reduce((sum, item) => sum + item.quantity * 10, 0); // Assuming each item costs $10
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = total;
    }
};

window.updateCartCounter = function() {
    const cartCounter = document.getElementById('cart-counter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartCounter();
});
