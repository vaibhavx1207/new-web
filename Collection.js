document.addEventListener('DOMContentLoaded', () => {
    // Initialize wishlist and cart from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to save wishlist to localStorage
    function saveWishlist() {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error saving wishlist to localStorage:', error);
        }
    }

    // Function to save cart to localStorage
    function saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    // Function to update wishlist count badge
    function updateWishlistCount() {
        const wishlistCountElement = document.querySelector('.wishlist-count');
        if (wishlistCountElement) {
            wishlistCountElement.textContent = wishlist.length;
            wishlistCountElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    // Function to update cart count badge
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            cartCountElement.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    }

    // Cache DOM elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-icon');
    const footerSection = document.querySelector('.footer-section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const sections = document.querySelectorAll('.category');

    // Initialize badge counts
    updateWishlistCount();
    updateCartCount();

    // Search Bar Placeholder Cycling
    const placeholders = ['T-Shirts', 'Polo Shirts', 'Hoodies'];
    let currentIndex = 0;

    function cyclePlaceholders() {
        if (searchInput) {
            searchInput.placeholder = `Search for "${placeholders[currentIndex]}"`;
            currentIndex = (currentIndex + 1) % placeholders.length;
        }
    }

    if (searchInput) {
        cyclePlaceholders();
        setInterval(cyclePlaceholders, 2000);
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                console.log(`Searching for: ${query}`);
                // Implement search logic here
            }
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`Searching for: ${query}`);
                    // Implement search logic here
                }
            }
        });
    }

    // Hamburger Menu Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown for mobile
    document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = link.nextElementSibling;
                if (dropdownMenu.style.display === 'block') {
                    dropdownMenu.style.display = 'none';
                } else {
                    dropdownMenu.style.display = 'block';
                }
            }
        });
    });

    // Category Buttons Functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;

            // Update button states
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/hide sections
            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = 'block';
                    section.scrollIntoView({ behavior: 'smooth' });
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Intersection Observer for Footer Fade-In Animation
    if (footerSection) {
        const footerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footerSection.classList.add('visible');
                        footerObserver.unobserve(footerSection);
                    }
                });
            },
            { threshold: 0.1 }
        );
        footerObserver.observe(footerSection);
    }

    // Product Data with dynamic tag field
    const products = {
        tshirt: [
            { id: 't1', name: 'Classic "Old School" T-Shirt with Indian Flag Sleeve', price: '₹600', originalPrice: '₹1,200', discount: '50% OFF', rating: '4.6', images: ['Sale/1(1).png', 'Sale/1(2).png', 'Sale/1(3).png', 'Sale/1(11).png', 'Sale/1(12).png', 'Sale/1(13).png', 'Sale/1(4).png', 'Sale/1(14).png'], tag: 'SALE', isNew: false, isTrending: true },
            { id: 't2', name: 'Bold "Bad Boys" Graphic T-Shirt with Crown & Smiley', price: '₹699', originalPrice: '₹1,200', discount: '50% OFF', rating: '4.5', images: ['Sale/2(1).png', 'Sale/2(2).png', 'Sale/2(3).png', 'Sale/2(11).png', 'Sale/2(12).png', 'Sale/2(13).png', 'Sale/2(4).png', 'Sale/2(14).png'], tag: 'NEW', isNew: true, isTrending: false },
            { id: 't3', name: "Men's Inspirational Perseverance Quote T-Shirt", price: '₹550', originalPrice: '₹1,100', discount: '50% OFF', rating: '4.9', images: ['index/5(1).png', 'index/5(2).png', 'index/5(3).png'], tag: 'TRENDING', isNew: false, isTrending: true },
            { id: 't4', name: '"You Are Enough" Motivational T-Shirt - Inspirational Graphic Tee', price: '₹750', originalPrice: '₹1,250', discount: '40% OFF',  rating: '4.8', images: ['trend/2(1).png', 'trend/2(2).png', 'trend/2(3).png', 'trend/2(4).png'], tag: 'TRENDING', isNew: true, isTrending: true },
            { id: 't5', name: 'Streetwear "Hustle" T-Shirt - Men Graphic Tee', price: '₹750', originalPrice: '₹1,250', discount: '40% OFF', rating: '4.7', images: ['trend/3(1).png', 'trend/3(2).png', 'trend/3(3).png', 'trend/3(4).png', 'trend/3(5).png', 'trend/3(6).png', 'trend/3(7).png', 'trend/3(8).png'], tag: 'TRENDING', isNew: false, isTrending: false },
            { id: 't6', name: '"Never Stop Trying" Spiral Graphic T-Shirt - Inspirational Tee', price: '₹750', originalPrice: '₹1,250', discount: '40% OFF', rating: '4.9', images: ['trend/4(1).png', 'trend/4(2).png', 'trend/4(3).png', 'trend/4(4).png', 'trend/4(5).png', 'trend/4(6).png'], tag: 'TRENDING', isNew: false, isTrending: false },
            { id: 't7', name: '"HUSTLE" Pixel Art Graphic Tee - Unisex Motivation T-Shirt', price: '₹750', originalPrice: '₹1,250', discount: '40% OFF', rating: '4.9', images: ['new/1(1).png', 'new/1(2).png', 'new/1(3).png', 'new/1(4).png', 'new/1(5).png', 'new/1(6).png'], tag: 'NEW', isNew: false, isTrending: false },
            
        ],
        hoodie: [
            { id: 'h1', name: '"BE YOURSELF" Inspirational Hoodie for Men & Women - Black & White', price: '₹1,500', originalPrice: '₹2,500', discount: '40% OFF',rating: '4.8', images: ['Sale/4(1).png', 'Sale/4(2).png', 'Sale/4(3).png', 'Sale/4(4).png'], tag: 'SALE', isNew: true, isTrending: false },
            { id: 'h2', name: '"Positive Energy" Unisex Hoodie - Inspirational Graphic Pullover', price: '₹1,500', originalPrice: '₹2,500', discount: '40% OFF',rating: '4.6', images: ['Sale/3(1).png', 'Sale/3(2).png', 'Sale/3(3).png', 'Sale/3(4).png'], tag: 'SALE', isNew: false, isTrending: true },
            { id: 'h3', name: 'Crown & "Glory" Graphic Hoodie for Men & Women - Black & White', price: '₹1,750', originalPrice: '₹2,500', discount: '30% OFF', rating: '4.6', images: ['trend/1(1).png', 'trend/1(2).png', 'trend/1(3).png', 'trend/1(4).png'], tag: 'TRENDING', isNew: false, isTrending: false },
            { id: 'h4', name: '"Sunset Is Beautiful" Mountain & Sun Hoodie - Nature Inspired Pullover', price: '₹1,750', originalPrice: '₹2,500', discount: '30% OFF', rating: '4.8', images: ['trend/5(1).png', 'trend/5(2).png', 'trend/5(3).png', 'trend/5(4).png'], tag: 'TRENDING', isNew: false, isTrending: false },
            { id: 'h5', name: 'Borealis Classic 1960 Car Hoodie - Vintage Auto Graphic Pullover', price: '₹1,750', originalPrice: '₹2,500', discount: '30% OFF', rating: '4.8', images: ['new/2(1).png', 'new/2(2).png', 'new/2(3).png', 'new/2(4).png'], tag: 'NEW', isNew: false, isTrending: false },
            
        ],
        polo: [
            { id: 'p1', name: 'Timeless Classic Pique Polo Shirt', price: '₹799', originalPrice: '₹799', rating: '4.5', images: ['https://placehold.co/400x400/646464/FFFFFF?text=Polo+1', 'https://placehold.co/400x400/585858/FFFFFF?text=Polo+2'], tag: 'NEW', isNew: true, isTrending: false },
            { id: 'p2', name: 'Trendy Striped Polo Shirt', price: '₹849', originalPrice: '₹1,849', discount: '54% OFF', rating: '4.6', images: ['https://placehold.co/400x400/585858/FFFFFF?text=Striped+Polo+1', 'https://placehold.co/400x400/4D4D4D/FFFFFF?text=Striped+Polo+2'], tag: 'TRENDING', isNew: false, isTrending: true }
        ]
    };

    // Function to create product card HTML
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        // Sanitize product name to prevent XSS
        const safeName = product.name.replace(/</g, "<").replace(/>/g, ">");

        // Determine tag HTML based on the dynamic tag field
        let tagHtml = '';
        if (product.tag === 'SALE') {
            tagHtml = '<div class="product-tag sale">SALE</div>';
        } else if (product.tag === 'NEW') {
            tagHtml = '<div class="product-tag new">NEW</div>';
        } else if (product.tag === 'TRENDING') {
            tagHtml = '<div class="product-tag trending">TRENDING</div>';
        }

        // Adjust price display based on whether there's a discount
        const priceHtml = product.discount
            ? `${product.price} <span style="color: #888; text-decoration: line-through;">${product.originalPrice}</span> <span style="color: #ff4d4d;">${product.discount}</span>`
            : `${product.price}`;

        card.innerHTML = `
            <div class="image-container">
                ${tagHtml}
                <img src="${product.images[0]}" alt="${safeName}" data-images="${product.images.join(',')}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/EFEFEF/AAAAAA?text=Image+Not+Found';">
                <div class="slideshow"></div>
            </div>
            <p>${safeName}</p>
            <p class="price">${priceHtml}</p>
            <p class="rating">⭐ ${product.rating}</p>
            <button class="quick-view-btn">Quick View 👀</button>
            <button class="heart-icon-small" aria-label="Add to Wishlist">
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
        `;
        return card;
    }

    // Populate product containers
    const tshirtContainer = document.getElementById('tshirt-products');
    const hoodieContainer = document.getElementById('hoodie-products');
    const poloContainer = document.getElementById('polo-products');

    if (tshirtContainer) products.tshirt.forEach(product => tshirtContainer.appendChild(createProductCard(product)));
    if (hoodieContainer) products.hoodie.forEach(product => hoodieContainer.appendChild(createProductCard(product)));
    if (poloContainer) products.polo.forEach(product => poloContainer.appendChild(createProductCard(product)));

    // Slideshow Functionality on hover
    document.querySelectorAll('.product-card').forEach(card => {
        const mainImage = card.querySelector('.image-container img');
        const images = mainImage.dataset.images.split(',');
        let slideInterval;
        let currentSlide = 0;

        // Preload images for smoother slideshow
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        card.addEventListener('mouseenter', () => {
            if (images.length > 1) {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % images.length;
                    mainImage.src = images[currentSlide];
                }, 1200); // Change image every 1.2 seconds
            }
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            mainImage.src = images[0]; // Reset to the first image
        });
    });

    // Event Delegation for Wishlist and Quick View
    document.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        if (!productCard) return;

        const productId = productCard.dataset.productId;

        let productData = null;
        // Find the full product data object
        for (const category in products) {
            const found = products[category].find(p => p.id === productId);
            if (found) {
                productData = found;
                break;
            }
        }
        if (!productData) return;

        // Handle wishlist button click
        if (e.target.closest('.heart-icon-small')) {
            const heartIcon = e.target.closest('.heart-icon-small');
            const existingIndex = wishlist.findIndex(item => item.id === productId);

            if (existingIndex === -1) {
                wishlist.push(productData);
                heartIcon.classList.add('active');
            } else {
                wishlist.splice(existingIndex, 1);
                heartIcon.classList.remove('active');
            }
            saveWishlist();
            updateWishlistCount();
        }

        // Handle quick view or image click for redirection
        if (e.target.matches('.quick-view-btn') || e.target.parentElement.matches('.image-container')) {
            window.location.href = `CollectionProducts.html?id=${productId}`;
        }
    });

    // Update heart icon states based on wishlist on initial load
    function updateHeartIcons() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            if (wishlist.some(item => item.id === productId)) {
                card.querySelector('.heart-icon-small').classList.add('active');
            }
        });
    }

    updateHeartIcons();
});