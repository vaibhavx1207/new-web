document.addEventListener('DOMContentLoaded', () => {

    /**
     * Updates the cart count badge in the navbar.
     */
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Note: Wishlist.html might have different selectors or structure
        const cartCountBadge = document.querySelector('.icon.cart-icon .count-badge');
        if (cartCountBadge) {
            cartCountBadge.textContent = cart.length;
            cartCountBadge.classList.toggle('hidden', cart.length === 0);
        }
    }

    /**
     * Updates the wishlist count badge in the navbar.
     */
    function updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        // Note: Wishlist.html might have different selectors or structure
        const wishlistCountBadge = document.querySelector('.icon.heart .count-badge');
        if (wishlistCountBadge) {
            wishlistCountBadge.textContent = wishlist.length;
            wishlistCountBadge.classList.toggle('hidden', wishlist.length === 0);
        }
    }

    /**
     * Renders the wishlist items on the page.
     */
    function renderWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistContainer = document.querySelector('.wishlist-items');
        const emptyWishlistMessage = document.querySelector('.empty-wishlist');

        if (!wishlistContainer || !emptyWishlistMessage) {
            console.error('Wishlist container or empty message element not found.');
            return;
        }

        wishlistContainer.innerHTML = ''; // Clear current items

        if (wishlist.length === 0) {
            emptyWishlistMessage.style.display = 'block';
            wishlistContainer.style.display = 'none';
        } else {
            emptyWishlistMessage.style.display = 'none';
            wishlistContainer.style.display = 'flex';

            wishlist.forEach((item, index) => {
                const wishlistItem = document.createElement('div');
                wishlistItem.classList.add('wishlist-item');
                wishlistItem.innerHTML = `
                    <div class="wishlist-image-container">
                        <a href="Product.html?id=${item.id}" class="product-link">
                            <img src="${item.image}" class="wishlist-image" alt="${item.name}">
                        </a>
                    </div>
                    <div class="wishlist-info">
                        <h3 class="wishlist-name">${item.name}</h3>
                        <div class="wishlist-price-details">
                            <span class="wishlist-current-price">${item.currentPrice}</span>
                            <span class="wishlist-original-price">${item.originalPrice}</span>
                            <span class="wishlist-discount">${item.discount}</span>
                        </div>
                    </div>
                    <div class="wishlist-actions">
                        <button class="wishlist-quick-view-btn" data-id="${item.id}">View Item</button>
                        <button class="wishlist-remove-btn" data-index="${index}" aria-label="Remove ${item.name} from wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                `;
                wishlistContainer.appendChild(wishlistItem);
            });
        }
        
        // Add event listeners after rendering
        addEventListenersToButtons();
        // Update nav counts after rendering
        updateWishlistCount();
    }

    /**
     * Attaches event listeners to the action buttons on wishlist items.
     */
    function addEventListenersToButtons() {
        // Quick view buttons
        document.querySelectorAll('.wishlist-quick-view-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.getAttribute('data-id');
                window.location.href = `Product.html?id=${productId}`;
            });
        });

        // Remove buttons
        document.querySelectorAll('.wishlist-remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                
                if (indexToRemove >= 0 && indexToRemove < wishlist.length) {
                    wishlist.splice(indexToRemove, 1); // Remove the item
                    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save the updated list
                    renderWishlist(); // Re-render the UI
                }
            });
        });
    }

    // --- INITIALIZE PAGE ---
    renderWishlist();
    updateCartCount(); // Also update cart count on page load
});
