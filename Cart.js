document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const checkoutBtn = document.querySelector('.checkout-btn');

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.😔</p>';
      updateSummary(0);
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const price = parseFloat(item.price.replace('₹', ''));
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-options">Color: ${item.color} | Size: ${item.size}</p>
          <p class="cart-item-price">${item.price} x ${item.quantity} = ₹${(itemTotal).toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-index="${index}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
            <button class="quantity-btn plus" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    updateSummary(subtotal);

    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let quantity = parseInt(cart[index].quantity);

        if (btn.classList.contains('minus') && quantity > 1) {
          cart[index].quantity -= 1;
        } else if (btn.classList.contains('plus') && quantity < 10) {
          cart[index].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', () => {
        const index = input.dataset.index;
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 10) value = 10;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity = value;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  function updateSummary(subtotal) {
    const shipping = 0;
    const total = subtotal + shipping;
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
  }

  checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Implement checkout logic here (e.g., redirect to payment page)
  });

  // Search Bar Functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.querySelector('.search-icon');
  const placeholders = ['T-shirts', 'Polo Tshirt', 'Hoodie'];
  let currentIndex = 0;

  function cyclePlaceholders() {
    searchInput.placeholder = `Try searching "${placeholders[currentIndex]}"`;
    currentIndex = (currentIndex + 1) % placeholders.length;
  }

  cyclePlaceholders();
  setInterval(cyclePlaceholders, 1500);

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log(`Searching for: ${query}`);
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        console.log(`Searching for: ${query}`);
      }
    }
  });

  renderCart();
});