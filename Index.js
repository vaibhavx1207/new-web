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
        if (wishlistCountElement) {
            wishlistCountElement.textContent = wishlist.length;
            wishlistCountElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    // Function to update cart count badge
    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            cartCountElement.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    }

    // Cache DOM elements to reduce queries
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-icon');
    const navbarHeartIcon = document.querySelector('.icon.heart');
    const wishlistCountElement = document.querySelector('.wishlist-count');
    const cartCountElement = document.querySelector('.cart-count');
    const countdownElement = document.getElementById('countdown');
    const slides = document.querySelectorAll('.banner-slide');
    const productItems = document.querySelectorAll('.product-item');
    const newArrivalProducts = document.querySelectorAll('.new-arrival-product');
    const collectionProducts = document.querySelectorAll('.collection-product');
    const footerSection = document.querySelector('.footer-section');

    // Initialize badge counts
    updateWishlistCount();
    updateCartCount();

    // Search Bar Functionality
    const placeholders = ['T-shirts', 'Polo Tshirt', 'Hoodie'];
    let currentIndex = 0;

    function cyclePlaceholders() {
        if (searchInput) {
            searchInput.placeholder = `Try searching "${placeholders[currentIndex]}"`;
            currentIndex = (currentIndex + 1) % placeholders.length;
        }
    }

    if (searchInput) {
        cyclePlaceholders();
        setInterval(cyclePlaceholders, 1500);
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput?.value.trim();
            if (query) {
                console.log(`Searching for: ${query}`);
                // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`Searching for: ${query}`);
                }
            }
        });
    }

    // Dropdown Toggle for Mobile (using event delegation)
    document.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.dropdown');
        if (dropdown && window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        } else if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Quick View Button Functionality (using event delegation)
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.quick-view-btn');
        if (button) {
            const productId = button.getAttribute('data-id');
            if (productId) {
                window.location.href = `Product.html?id=${productId}`;
            }
        }
    });

    // Icon Animation Functionality (excluding heart icon)
    document.addEventListener('click', (e) => {
        const icon = e.target.closest('.icon:not(.heart)');
        if (icon) {
            if (!icon.href || (!icon.href.includes('Cart.html') && !icon.href.includes('Account.html'))) {
                e.preventDefault();
            }
            icon.classList.remove('animate');
            void icon.offsetWidth;
            icon.classList.add('animate');
            if (icon.href && icon.href.includes('Account.html')) {
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = icon.href;
                }, 500);
            }
        }
    });

    // Heart Icon Wishlist and Add to Cart Functionality (using event delegation)
    document.addEventListener('click', (e) => {
        const icon = e.target.closest('.heart-icon-small');
        const cartButton = e.target.closest('.add-to-cart-btn');

        if (icon) {
            e.preventDefault();
            const productItem = icon.closest('.product-item');
            if (!productItem) return;

            const quickViewBtn = productItem.querySelector('.quick-view-btn');
            if (!quickViewBtn) return;

            const productId = quickViewBtn.getAttribute('data-id');
            const productName = productItem.querySelector('.product-name')?.textContent;
            const productImage = productItem.querySelector('.product-image')?.src;
            const currentPrice = productItem.querySelector('.current-price')?.textContent;
            const originalPrice = productItem.querySelector('.original-price')?.textContent;
            const discount = productItem.querySelector('.discount-percentage')?.textContent;

            if (!productId || !productName || !productImage || !currentPrice || !originalPrice || !discount) return;

            const product = {
                id: productId,
                name: productName,
                image: productImage,
                currentPrice: currentPrice,
                originalPrice: originalPrice,
                discount: discount
            };

            const existingIndex = wishlist.findIndex(item => item.id === productId);
            if (existingIndex === -1) {
                wishlist.push(product);
                icon.classList.add('active');
                icon.querySelector('svg').style.fill = '#ff4d4d';
            } else {
                wishlist.splice(existingIndex, 1);
                icon.classList.remove('active');
                icon.querySelector('svg').style.fill = 'none';
            }

            saveWishlist();
            updateWishlistCount();
            updateHeartIcons();
        }

        if (cartButton) {
            e.preventDefault();
            const productItem = cartButton.closest('.product-item');
            if (!productItem) return;

            const quickViewBtn = productItem.querySelector('.quick-view-btn');
            if (!quickViewBtn) return;

            const productId = quickViewBtn.getAttribute('data-id');
            const productName = productItem.querySelector('.product-name')?.textContent;
            const productImage = productItem.querySelector('.product-image')?.src;
            const currentPrice = productItem.querySelector('.current-price')?.textContent;
            const originalPrice = productItem.querySelector('.original-price')?.textContent;
            const discount = productItem.querySelector('.discount-percentage')?.textContent;

            if (!productId || !productName || !productImage || !currentPrice || !originalPrice || !discount) return;

            const product = {
                id: productId,
                name: productName,
                image: productImage,
                currentPrice: currentPrice,
                originalPrice: originalPrice,
                discount: discount
            };

            const existingIndex = cart.findIndex(item => item.id === productId);
            if (existingIndex === -1) {
                cart.push(product);
                cartButton.classList.add('animate');
                setTimeout(() => cartButton.classList.remove('animate'), 300);
            } else {
                cart.splice(existingIndex, 1);
            }

            saveCart();
            updateCartCount();
        }
    });

    // Update heart icon states based on wishlist
    function updateHeartIcons() {
        document.querySelectorAll('.heart-icon-small').forEach(icon => {
            const productItem = icon.closest('.product-item');
            if (!productItem) return;

            const quickViewBtn = productItem.querySelector('.quick-view-btn');
            if (!quickViewBtn) return;

            const productId = quickViewBtn.getAttribute('data-id');
            if (wishlist.some(item => item.id === productId)) {
                icon.classList.add('active');
                icon.querySelector('svg').style.fill = '#ff4d4d';
            } else {
                icon.classList.remove('active');
                icon.querySelector('svg').style.fill = 'none';
            }
        });
    }

    updateHeartIcons();

    // Navbar Heart Icon Navigation
    if (navbarHeartIcon) {
        navbarHeartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Wishlist.html';
        });
    }

    // Banner Slideshow Functionality
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000);
    }

    // Product Image Carousel for All Products
    productItems.forEach(item => {
        const productImage = item.querySelector('.product-image');
        if (!productImage || !productImage.dataset.images) return;

        const images = productImage.dataset.images.split(',').filter(img => img.trim());
        if (images.length === 0) return;

        let currentProductImageIndex = 0;
        let hoverInterval;

        const leftArrow = item.querySelector('.product-image-nav.left');
        const rightArrow = item.querySelector('.product-image-nav.right');

        function changeProductImage(direction) {
            if (direction === 'next') {
                currentProductImageIndex = (currentProductImageIndex + 1) % images.length;
            } else if (direction === 'prev') {
                currentProductImageIndex = (currentProductImageIndex - 1 + images.length) % images.length;
            }
            productImage.src = images[currentProductImageIndex] || 'fallback-image.jpg'; // Fallback image
        }

        item.addEventListener('mouseenter', () => {
            if (images.length > 1) {
                hoverInterval = setInterval(() => {
                    changeProductImage('next');
                }, 1000);
            }
        });

        item.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            productImage.src = images[0] || 'fallback-image.jpg';
            currentProductImageIndex = 0;
        });

        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(hoverInterval);
                changeProductImage('prev');
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(hoverInterval);
                changeProductImage('next');
            });
        }

        const colorOptionsSpan = item.querySelector('.color-options span');
        if (colorOptionsSpan) {
            colorOptionsSpan.textContent = '';
        }
    });

    // Countdown Timer Functionality for Sale is LIVE
    if (countdownElement) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);

        function updateCountdown() {
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                countdownElement.innerHTML = 'Sale Ended!';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Throttle function to limit observer callbacks
    function throttle(fn, wait) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= wait) {
                lastCall = now;
                fn(...args);
            }
        };
    }

    // Intersection Observer for New Arrivals Slide-Up Animation
    if (newArrivalProducts.length > 0) {
        const newArrivalObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        newArrivalObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '20px' }
        );

        newArrivalProducts.forEach(product => {
            newArrivalObserver.observe(product);
        });
    }

    // Intersection Observer for Collections Scale-Up Animation
    if (collectionProducts.length > 0) {
        const collectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        collectionObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '20px' }
        );

        collectionProducts.forEach(product => {
            collectionObserver.observe(product);
        });
    }

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
            { threshold: 0.1, rootMargin: '20px' }
        );
        footerObserver.observe(footerSection);
    }
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});