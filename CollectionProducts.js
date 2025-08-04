document.addEventListener('DOMContentLoaded', () => {
    // Initialize wishlist and cart from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Product Data (expanded with color-specific images and reviews)
    const products = {
        tshirt: [
            {
                id: 't1',
                name: 'Classic "Old School" T-Shirt with Indian Flag Sleeve',
                price: '₹600',
                originalPrice: '₹1,200',
                discount: '50% OFF',
                rating: '4.6',
                images: {
                    default: ['Sale/1(1).png', 'Sale/1(2).png', 'Sale/1(3).png', 'Sale/1(11).png'],
                    black: ['Sale/1(1).png', 'Sale/1(2).png', 'Sale/1(3).png', 'Sale/1(11).png'],
                    white: ['Sale/1(12).png', 'Sale/1(13).png', 'Sale/1(14).png', 'Sale/1(4).png']
                },
                tag: 'SALE',
                isNew: false,
                isTrending: true,
                description: 'Embrace vintage vibes with our Classic "Old School" T-Shirt, featuring a unique Indian flag sleeve detail. Made from premium, breathable cotton for ultimate comfort and style. Perfect for casual wear and showing off your patriotic spirit. This limited edition tee combines classic design with a modern twist, making it a must-have for your wardrobe. Available in various sizes and colors to suit your preference. Pair it with your favorite jeans or shorts for a complete look. Experience the perfect blend of comfort, style, and national pride.',
                reviews: [
                    { id: 1, author: 'Ravi K.', rating: 5, date: '2024-06-20', title: 'Great T-Shirt!', text: 'The quality is amazing, and the design is super cool. Love the Indian flag detail!' },
                    { id: 2, author: 'Priya S.', rating: 4, date: '2024-06-18', title: 'Comfortable and Stylish', text: 'Very comfortable to wear all day. The fit is perfect, and it looks great.' },
                    { id: 3, author: 'Amit V.', rating: 5, date: '2024-06-15', title: 'Highly Recommend', text: 'Worth every penny. The print is durable, and it washes well. Will buy more!' }
                ]
            },
            {
                id: 't2',
                name: 'Bold "Bad Boys" Graphic T-Shirt with Crown & Smiley',
                price: '₹699',
                originalPrice: '₹1,200',
                discount: '50% OFF',
                rating: '4.5',
                images: {
                    default: ['Sale/2(1).png', 'Sale/2(2).png', 'Sale/2(3).png', 'Sale/2(11).png'],
                    black: ['Sale/2(1).png', 'Sale/2(2).png', 'Sale/2(3).png', 'Sale/2(11).png'],
                    white: ['Sale/2(12).png', 'Sale/2(13).png', 'Sale/2(14).png', 'Sale/2(4).png']
                },
                tag: 'NEW',
                isNew: true,
                isTrending: false,
                description: 'Make a statement with our Bold "Bad Boys" Graphic T-Shirt, featuring an edgy crown and smiley design. Crafted from soft, breathable fabric for maximum comfort and a relaxed fit. This tee is perfect for those who dare to stand out and express their unique style. Its vibrant print and contemporary design make it a versatile addition to your casual wardrobe. Ideal for pairing with jeans or cargo pants for an urban-inspired look. Elevate your everyday style with this eye-catching graphic tee.',
                reviews: [
                    { id: 1, author: 'Kartik D.', rating: 5, date: '2024-06-22', title: 'Awesome Design!', text: 'The "Bad Boys" graphic is so cool. Got many compliments!' },
                    { id: 2, author: 'Shruti M.', rating: 4, date: '2024-06-19', title: 'Good Quality Fabric', text: 'Comfortable and the print seems durable. Happy with the purchase.' }
                ]
            },
            {
                id: 't3',
                name: 'Abstract "Cosmic Swirl" T-Shirt with Unique Back Print',
                price: '₹750',
                originalPrice: '₹1,500',
                discount: '50% OFF',
                rating: '4.8',
                images: {
                    default: ['Sale/3(1).png', 'Sale/3(2).png', 'Sale/3(3).png', 'Sale/3(11).png'],
                    black: ['Sale/3(1).png', 'Sale/3(2).png', 'Sale/3(3).png', 'Sale/3(11).png'],
                    white: ['Sale/3(12).png', 'Sale/3(13).png', 'Sale/3(14).png', 'Sale/3(4).png']
                },
                tag: 'TRENDING',
                isNew: false,
                isTrending: true,
                description: 'Dive into the unknown with our Abstract "Cosmic Swirl" T-Shirt, featuring a mesmerizing unique back print. Made with a blend of cotton for a soft touch and comfortable wear. This artistic tee is designed for those who appreciate unique patterns and intricate details. The "Cosmic Swirl" design adds a touch of mystery and depth to your outfit, making it ideal for both casual outings and creative events. Its lightweight material ensures breathability, perfect for any season. Stand out from the crowd with this truly unique piece.',
                reviews: [
                    { id: 1, author: 'Deepak G.', rating: 5, date: '2024-06-25', title: 'Stunning Back Print!', text: 'The cosmic swirl is even better in person. Great unique design.' },
                    { id: 2, author: 'Anjali R.', rating: 5, date: '2024-06-21', title: 'Soft and Comfortable', text: 'Love the fabric, very soft. Looks super stylish with jeans.' }
                ]
            },
            {
                id: 't4',
                name: 'Streetwear "Urban Explorer" T-Shirt with Cityscape Graphic',
                price: '₹650',
                originalPrice: '₹1,300',
                discount: '50% OFF',
                rating: '4.3',
                images: {
                    default: ['Sale/4(1).png', 'Sale/4(2).png', 'Sale/4(3).png', 'Sale/4(11).png'],
                    black: ['Sale/4(1).png', 'Sale/4(2).png', 'Sale/4(3).png', 'Sale/4(11).png'],
                    white: ['Sale/4(12).png', 'Sale/4(13).png', 'Sale/4(14).png', 'Sale/4(4).png']
                },
                tag: 'SALE',
                isNew: false,
                isTrending: false,
                description: 'Explore the urban jungle in style with our "Urban Explorer" T-Shirt, featuring a cool cityscape graphic. Constructed from durable, high-quality cotton that ensures longevity and retains its shape. This tee is an ode to city life, perfect for casual wear, weekend outings, or simply relaxing. Its distinct graphic print embodies the spirit of adventure and discovery, making it a favorite among streetwear enthusiasts. The classic fit offers ease of movement, while the breathable fabric keeps you cool. A versatile piece that effortlessly blends comfort with contemporary urban style.',
                reviews: [
                    { id: 1, author: 'Suresh L.', rating: 4, date: '2024-06-17', title: 'Nice Streetwear Tee', text: 'Good quality and the cityscape graphic is well-done.' },
                    { id: 2, author: 'Neha P.', rating: 4, date: '2024-06-14', title: 'Comfortable Daily Wear', text: 'A bit loose fit, but super comfortable for daily use.' }
                ]
            },
            {
                id: 't5',
                name: 'Minimalist "Geometric Pattern" T-Shirt with Subtle Design',
                price: '₹550',
                originalPrice: '₹1,100',
                discount: '50% OFF',
                rating: '4.7',
                images: {
                    default: ['Sale/5(1).png', 'Sale/5(2).png', 'Sale/5(3).png', 'Sale/5(11).png'],
                    black: ['Sale/5(1).png', 'Sale/5(2).png', 'Sale/5(3).png', 'Sale/5(11).png'],
                    white: ['Sale/5(12).png', 'Sale/5(13).png', 'Sale/5(14).png', 'Sale/5(4).png']
                },
                tag: 'NEW',
                isNew: true,
                isTrending: true,
                description: 'Embrace simplicity with our Minimalist "Geometric Pattern" T-Shirt, designed for those who appreciate understated elegance. Crafted from premium, soft cotton for a comfortable fit that lasts. This tee features a subtle yet captivating geometric pattern, adding a touch of modern sophistication to your everyday look. Its versatile design makes it suitable for various occasions, from casual meetups to more polished casual events. The breathable fabric ensures all-day comfort, while its timeless appeal ensures it remains a staple in your wardrobe. A perfect blend of minimalist aesthetics and comfortable wear.',
                reviews: [
                    { id: 1, author: 'Rahul K.', rating: 5, date: '2024-06-23', title: 'Elegant and Simple', text: 'Exactly what I was looking for. Subtle yet stylish.' },
                    { id: 2, author: 'Disha S.', rating: 4, date: '2024-06-20', title: 'Good for Everyday', text: 'Comfortable and the material feels nice. Happy with the purchase.' }
                ]
            },
            {
                id: 't6',
                name: 'Vintage "Retro Vibe" T-Shirt with Distressed Logo',
                price: '₹700',
                originalPrice: '₹1,400',
                discount: '50% OFF',
                rating: '4.2',
                images: {
                    default: ['Sale/6(1).png', 'Sale/6(2).png', 'Sale/6(3).png', 'Sale/6(11).png'],
                    black: ['Sale/6(1).png', 'Sale/6(2).png', 'Sale/6(3).png', 'Sale/6(11).png'],
                    white: ['Sale/6(12).png', 'Sale/6(13).png', 'Sale/6(14).png', 'Sale/6(4).png']
                },
                tag: 'SALE',
                isNew: false,
                isTrending: false,
                description: 'Step back in time with our Vintage "Retro Vibe" T-Shirt, featuring a cool distressed logo that exudes classic charm. Made from soft, pre-shrunk cotton for a relaxed fit and lasting comfort. This tee captures the essence of retro fashion, making it a perfect choice for those who love timeless styles. Its unique distressed logo adds an authentic vintage touch, setting it apart from contemporary designs. Ideal for pairing with denim jeans or shorts for a complete throwback look. Experience comfort and style with a nostalgic twist.',
                reviews: [
                    { id: 1, author: 'Pranav B.', rating: 4, date: '2024-06-16', title: 'Classic Look', text: 'Love the distressed look. Feels like a proper vintage tee.' },
                    { id: 2, author: 'Kirti J.', rating: 3, date: '2024-06-13', title: 'Decent Quality', text: 'Good for the price, but the material is a bit thin.' }
                ]
            }
        ],
        hoodie: [
            {
                id: 'h1',
                name: 'Cozy "Urban Comfort" Hoodie with Front Pocket',
                price: '₹1200',
                originalPrice: '₹2400',
                discount: '50% OFF',
                rating: '4.7',
                images: {
                    default: ['hoodie/h1(1).png', 'hoodie/h1(2).png', 'hoodie/h1(3).png'],
                    black: ['hoodie/h1(1).png', 'hoodie/h1(2).png', 'hoodie/h1(3).png'],
                    white: ['hoodie/h1(4).png', 'hoodie/h1(5).png', 'hoodie/h1(6).png']
                },
                tag: 'NEW',
                isNew: true,
                isTrending: false,
                description: 'Stay warm and stylish with our Cozy "Urban Comfort" Hoodie, designed for ultimate relaxation. Crafted from a soft, fleece-lined fabric, this hoodie offers exceptional warmth and a luxurious feel against your skin. Its practical front pocket provides convenience, while the adjustable drawstring hood adds an extra layer of coziness. Perfect for chilly evenings, casual outings, or simply lounging at home. The versatile design pairs effortlessly with any casual outfit, making it a staple for your wardrobe. Experience unparalleled comfort and modern style with this essential hoodie.',
                reviews: [
                    { id: 1, author: 'Vivek A.', rating: 5, date: '2024-06-24', title: 'Super Soft!', text: 'This hoodie is incredibly soft and warm. Perfect for winter.' },
                    { id: 2, author: 'Smita P.', rating: 4, date: '2024-06-20', title: 'Great Fit', text: 'Fits perfectly and very comfortable. Love the large pocket.' }
                ]
            },
            {
                id: 'h2',
                name: 'Sporty "Athletic Fit" Hoodie with Zipper',
                price: '₹1350',
                originalPrice: '₹2700',
                discount: '50% OFF',
                rating: '4.5',
                images: {
                    default: ['hoodie/h2(1).png', 'hoodie/h2(2).png', 'hoodie/h2(3).png'],
                    black: ['hoodie/h2(1).png', 'hoodie/h2(2).png', 'hoodie/h2(3).png'],
                    white: ['hoodie/h2(4).png', 'hoodie/h2(5).png', 'hoodie/h2(6).png']
                },
                tag: 'SALE',
                isNew: false,
                isTrending: true,
                description: 'Achieve your fitness goals in style with our Sporty "Athletic Fit" Hoodie, designed for optimal performance. Made from moisture-wicking fabric, this hoodie keeps you dry and comfortable during intense workouts or outdoor activities. Its full-zip design allows for easy layering, while the athletic fit ensures maximum mobility. Perfect for gym sessions, morning runs, or a casual sporty look. The sleek design and practical features make it an ideal choice for active individuals. Stay comfortable and focused on your goals with this high-performance athletic hoodie.',
                reviews: [
                    { id: 1, author: 'Gaurav S.', rating: 5, date: '2024-06-21', title: 'Excellent for Gym', text: 'Lightweight and breathable. Perfect for my workouts.' },
                    { id: 2, author: 'Pooja R.', rating: 4, date: '2024-06-18', title: 'Stylish and Functional', text: 'Looks good and very practical for sports. The zipper is smooth.' }
                ]
            },
            {
                id: 'h3',
                name: 'Graphic "Abstract Art" Hoodie with Unique Print',
                price: '₹1400',
                originalPrice: '₹2800',
                discount: '50% OFF',
                rating: '4.8',
                images: {
                    default: ['hoodie/h3(1).png', 'hoodie/h3(2).png', 'hoodie/h3(3).png'],
                    black: ['hoodie/h3(1).png', 'hoodie/h3(2).png', 'hoodie/h3(3).png'],
                    white: ['hoodie/h3(4).png', 'hoodie/h3(5).png', 'hoodie/h3(6).png']
                },
                tag: 'TRENDING',
                isNew: false,
                isTrending: true,
                description: 'Express your artistic side with our Graphic "Abstract Art" Hoodie, featuring a captivating and unique print. Made from a blend of soft cotton and durable polyester, this hoodie offers both comfort and longevity. The striking abstract design makes it a true statement piece, perfect for those who appreciate contemporary art and bold fashion. Ideal for casual wear, art events, or simply adding a creative touch to your daily ensemble. Its comfortable fit ensures ease of movement, while the vibrant print ensures you stand out. Embrace creativity and comfort with this exceptional hoodie.',
                reviews: [
                    { id: 1, author: 'Divya C.', rating: 5, date: '2024-06-26', title: 'Amazing Design!', text: 'The abstract print is so unique and vibrant. Love it!' },
                    { id: 2, author: 'Rohit K.', rating: 4, date: '2024-06-23', title: 'Good Material', text: 'Soft inside and the print quality is great. Happy with this purchase.' }
                ]
            }
        ],
        polo: [
            {
                id: 'p1',
                name: 'Classic "Polo Perfection" T-Shirt with Collar Detail',
                price: '₹800',
                originalPrice: '₹1600',
                discount: '50% OFF',
                rating: '4.6',
                images: {
                    default: ['polo/polo1(1).png', 'polo/polo1(2).png', 'polo/polo1(3).png'],
                    black: ['polo/polo1(1).png', 'polo/polo1(2).png', 'polo/polo1(3).png'],
                    white: ['polo/polo1(4).png', 'polo/polo1(5).png', 'polo/polo1(6).png']
                },
                tag: 'SALE',
                isNew: false,
                isTrending: false,
                description: 'Experience timeless elegance with our Classic "Polo Perfection" T-Shirt, featuring refined collar detail. Made from premium, breathable pique cotton, this polo shirt offers superior comfort and a sophisticated look. Its classic design with a ribbed collar and cuffs makes it a versatile addition to any wardrobe, suitable for both casual and semi-formal occasions. Perfect for a smart-casual office look, a weekend brunch, or a relaxed evening out. The soft fabric ensures all-day comfort, while the durable construction ensures lasting quality. A true classic that never goes out of style.',
                reviews: [
                    { id: 1, author: 'Siddharth M.', rating: 5, date: '2024-06-20', title: 'Perfect Polo!', text: 'Great fit and excellent material. Looks very classy.' },
                    { id: 2, author: 'Nisha B.', rating: 4, date: '2024-06-17', title: 'Comfortable and Smart', text: 'Ideal for work and casual outings. Very comfortable.' }
                ]
            },
            {
                id: 'p2',
                name: 'Sporty "Active Edge" Polo T-Shirt with Contrast Stripes',
                price: '₹850',
                originalPrice: '₹1700',
                discount: '50% OFF',
                rating: '4.4',
                images: {
                    default: ['polo/polo2(1).png', 'polo/polo2(2).png', 'polo/polo2(3).png'],
                    black: ['polo/polo2(1).png', 'polo/polo2(2).png', 'polo/polo2(3).png'],
                    white: ['polo/polo2(4).png', 'polo/polo2(5).png', 'polo/polo2(6).png']
                },
                tag: 'NEW',
                isNew: true,
                isTrending: false,
                description: 'Elevate your athletic style with our Sporty "Active Edge" Polo T-Shirt, featuring stylish contrast stripes. Crafted from lightweight, moisture-wicking fabric, this polo keeps you cool and dry during any activity. Its dynamic design and comfortable fit make it ideal for sports, golf, or a refined casual look. The ribbed collar and cuffs add a touch of classic polo charm, while the active fabric ensures maximum breathability. Perfect for hitting the golf course, a casual day out, or weekend leisure. Combine performance and style with this versatile polo.',
                reviews: [
                    { id: 1, author: 'Kiran J.', rating: 4, date: '2024-06-23', title: 'Good for Sports', text: 'Breathable and comfortable during my tennis sessions.' },
                    { id: 2, author: 'Ajay D.', rating: 3, date: '2024-06-19', title: 'Stripes are Nice', text: 'Looks good, but wish the fabric was a bit softer.' }
                ]
            },
            {
                id: 'p3',
                name: 'Premium "Luxury Knit" Polo T-Shirt with Fine Texture',
                price: '₹950',
                originalPrice: '₹1900',
                discount: '50% OFF',
                rating: '4.8',
                images: {
                    default: ['polo/polo3(1).png', 'polo/polo3(2).png', 'polo/polo3(3).png'],
                    black: ['polo/polo3(1).png', 'polo/polo3(2).png', 'polo/polo3(3).png'],
                    white: ['polo/polo3(4).png', 'polo/polo3(5).png', 'polo/polo3(6).png']
                },
                tag: 'TRENDING',
                isNew: false,
                isTrending: true,
                description: 'Indulge in sophisticated comfort with our Premium "Luxury Knit" Polo T-Shirt, featuring a delicate fine texture. Made from a superior blend of cotton and elastane, this polo offers a soft touch and a flexible, flattering fit. Its exquisite texture and refined design make it a perfect choice for elevated casual wear or semi-formal occasions. Ideal for dinner parties, business casual settings, or simply when you want to look effortlessly chic. The high-quality knit ensures durability, while the comfortable fit provides all-day ease. Experience luxury in every detail with this premium polo shirt.',
                reviews: [
                    { id: 1, author: 'Meera S.', rating: 5, date: '2024-06-26', title: 'Excellent Quality', text: 'The fabric feels luxurious, and it fits perfectly. Very impressed.' },
                    { id: 2, author: 'Rohan G.', rating: 5, date: '2024-06-24', title: 'Very Stylish', text: 'Looks and feels premium. A great addition to my wardrobe.' }
                ]
            }
        ]
    };

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

    // Call update functions on initial load
    updateWishlistCount();
    updateCartCount();

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    let currentProduct = null;
    let currentImageIndex = 0;
    let currentProductColor = 'default'; // default color

    // Find the product
    for (const category in products) {
        const found = products[category].find(p => p.id === productId);
        if (found) {
            currentProduct = found;
            break;
        }
    }

    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailContainer = document.querySelector('.thumbnail-gallery');
    const productNameElement = document.getElementById('productName');
    const productPriceElement = document.getElementById('productPrice');
    const productOriginalPriceElement = document.getElementById('productOriginalPrice');
    const productDiscountElement = document.getElementById('productDiscount');
    const productRatingElement = document.getElementById('productRating');
    const productDescriptionElement = document.getElementById('productDescription');
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // Image navigation elements
    const prevImageBtn = document.querySelector('.previous-btn');
    const nextImageBtn = document.querySelector('.next-btn');

    // Color options
    const colorOptions = document.querySelectorAll('.color-option');

    // Reviews section elements
    const reviewsSection = document.querySelector('.reviews-section');
    const reviewList = document.getElementById('reviewList');
    const overallRatingElement = document.getElementById('overallRating');
    const totalReviewsElement = document.getElementById('totalReviews');

    if (currentProduct) {
        function updateProductDisplay() {
            // Update main product details
            productNameElement.textContent = currentProduct.name;
            productPriceElement.textContent = currentProduct.price;
            productOriginalPriceElement.textContent = currentProduct.originalPrice;
            productDiscountElement.textContent = currentProduct.discount;
            productRatingElement.textContent = currentProduct.rating;
            productDescriptionElement.textContent = currentProduct.description;

            // Update main image and thumbnails
            const imagesToShow = currentProduct.images[currentProductColor] || currentProduct.images.default;

            if (imagesToShow && imagesToShow.length > 0) {
                mainProductImage.src = imagesToShow[currentImageIndex];
                mainProductImage.alt = currentProduct.name;

                thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
                imagesToShow.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${currentProduct.name} - Thumbnail ${index + 1}`;
                    img.classList.add('thumbnail');
                    if (index === currentImageIndex) {
                        img.classList.add('active');
                    }
                    img.addEventListener('click', () => {
                        currentImageIndex = index;
                        updateProductDisplay(); // Re-render to update main image and active thumbnail
                    });
                    thumbnailContainer.appendChild(img);
                });
            } else {
                mainProductImage.src = 'https://placehold.co/650x650/EFEFEF/AAAAAA?text=Image+Not+Found'; // Fallback
                mainProductImage.alt = 'No image available';
                thumbnailContainer.innerHTML = '';
            }

            // Update wishlist button state
            if (wishlist.some(item => item.id === currentProduct.id)) {
                wishlistBtn.classList.add('active');
            } else {
                wishlistBtn.classList.remove('active');
            }

            // Update reviews
            renderReviews();
        }

        function renderReviews() {
            reviewList.innerHTML = ''; // Clear existing reviews
            if (currentProduct.reviews && currentProduct.reviews.length > 0) {
                let totalRating = 0;
                currentProduct.reviews.forEach(review => {
                    totalRating += review.rating;
                    const reviewDiv = document.createElement('div');
                    reviewDiv.classList.add('review-item');
                    reviewDiv.innerHTML = `
                        <div class="reviewer-info">
                            <span class="reviewer-initial">${review.author.charAt(0).toUpperCase()}</span>
                            <div class="reviewer-details">
                                <span class="name">${review.author}</span>
                                <span class="stars">${'⭐'.repeat(review.rating)}</span>
                                <span class="date">${review.date}</span>
                                <span class="verified">Verified Purchase</span>
                            </div>
                        </div>
                        <div class="review-title">${review.title}</div>
                        <p class="review-text">${review.text}</p>
                    `;
                    reviewList.appendChild(reviewDiv);
                });
                overallRatingElement.textContent = (totalRating / currentProduct.reviews.length).toFixed(1);
                totalReviewsElement.textContent = `${currentProduct.reviews.length} reviews`;
            } else {
                reviewList.innerHTML = '<p style="text-align: center; color: #b0b0b0; padding: 20px;">No reviews yet. Be the first to review this product!</p>';
                overallRatingElement.textContent = 'N/A';
                totalReviewsElement.textContent = '0 reviews';
            }
        }

        // Initial display
        updateProductDisplay();

        // Image navigation event listeners
        prevImageBtn.addEventListener('click', () => {
            const imagesToShow = currentProduct.images[currentProductColor] || currentProduct.images.default;
            currentImageIndex = (currentImageIndex - 1 + imagesToShow.length) % imagesToShow.length;
            updateProductDisplay();
        });

        nextImageBtn.addEventListener('click', () => {
            const imagesToShow = currentProduct.images[currentProductColor] || currentProduct.images.default;
            currentImageIndex = (currentImageIndex + 1) % imagesToShow.length;
            updateProductDisplay();
        });

        // Color option event listeners
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all color options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to the clicked option
                option.classList.add('active');

                // Get the color from the data attribute
                const color = option.dataset.color;
                currentProductColor = color;
                currentImageIndex = 0; // Reset image index when color changes
                updateProductDisplay();
            });
        });

        // Size Selection
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });


        // Wishlist button logic
        wishlistBtn.addEventListener('click', () => {
            const existingIndex = wishlist.findIndex(item => item.id === currentProduct.id);
            if (existingIndex === -1) {
                wishlist.push({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, image: currentProduct.images.default[0] });
                wishlistBtn.classList.add('active');
            } else {
                wishlist.splice(existingIndex, 1);
                wishlistBtn.classList.remove('active');
            }
            saveWishlist();
            updateWishlistCount();
        });

        // Add to Cart button logic
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-btn.active')?.dataset.size;
            if (!selectedSize) {
                // Using custom modal/message box instead of alert()
                const messageBox = document.createElement('div');
                messageBox.classList.add('message-box');
                messageBox.innerHTML = `
                    <div class="message-content">
                        <p>Please select a size before adding to cart.</p>
                        <button class="message-ok-btn">OK</button>
                    </div>
                `;
                document.body.appendChild(messageBox);

                document.querySelector('.message-ok-btn').addEventListener('click', () => {
                    document.body.removeChild(messageBox);
                });
                return;
            }

            const existingCartItemIndex = cart.findIndex(item => item.id === currentProduct.id && item.size === selectedSize && item.selectedColor === currentProductColor);

            if (existingCartItemIndex !== -1) {
                cart[existingCartItemIndex].quantity = (cart[existingCartItemIndex].quantity || 1) + 1;
            } else {
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    image: currentProduct.images[currentProductColor] ? currentProduct.images[currentProductColor][0] : currentProduct.images.default[0],
                    quantity: 1,
                    selectedColor: currentProductColor, // Store selected color with cart item
                    size: selectedSize
                });
            }
            saveCart();
            updateCartCount();

            // Custom message box for add to cart success
            const messageBox = document.createElement('div');
            messageBox.classList.add('message-box');
            messageBox.innerHTML = `
                <div class="message-content">
                    <p>${currentProduct.name} (Size: ${selectedSize}, Color: ${currentProductColor}) added to cart!</p>
                    <button class="message-ok-btn">OK</button>
                </div>
            `;
            document.body.appendChild(messageBox);

            document.querySelector('.message-ok-btn').addEventListener('click', () => {
                document.body.removeChild(messageBox);
            });
        });

        // Accordion functionality for Product Description and Reviews
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.parentElement;
                const accordionContent = header.nextElementSibling;
                const toggleIcon = header.querySelector('.toggle-icon');

                accordionItem.classList.toggle('active');

                if (accordionItem.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    toggleIcon.textContent = '-';
                } else {
                    accordionContent.style.maxHeight = null;
                    toggleIcon.textContent = '+';
                }
            });
        });

    } else {
        // Handle product not found
        const productDetailsSection = document.querySelector('.product-details-section');
        if (productDetailsSection) {
            productDetailsSection.innerHTML = '<p style="text-align: center; font-size: 1.5em; color: #ff6b6b; padding: 50px;">Product not found. Please go back to the <a href="Collection.html" style="color: #2ecc71; text-decoration: none;">collections page</a>.</p>';
        }
    }

    // Navbar functionality (from Collection.js, ensuring it also works here)
    const searchInput = document.getElementById('searchInput');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const footerSection = document.querySelector('.footer-section'); // Corrected class name for footer

    // Search Bar functionality
    if (searchInput) {
        // Cycle placeholders initially and then every 2 seconds
        const placeholders = ['T-shirts', 'Polo Tshirt', 'Hoodie'];
        let currentIndex = 0;
        function cyclePlaceholders() {
            searchInput.placeholder = `Try searching "${placeholders[currentIndex]}"`;
            currentIndex = (currentIndex + 1) % placeholders.length;
        }
        cyclePlaceholders();
        setInterval(cyclePlaceholders, 2000);

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`Searching for: ${query}`);
                    // Implement search logic here
                    // For now, you might want to redirect or filter results on the collection page
                    // window.location.href = `Collection.html?search=${encodeURIComponent(query)}`;
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

    // Dropdown for mobile (adjusted for CollectionProducts.html context)
    document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = link.nextElementSibling;
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Footer Fade-In Animation (if applicable, otherwise remove)
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

    // Newsletter subscription (if applicable)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            if (email) {
                // Using custom modal/message box instead of alert()
                const messageBox = document.createElement('div');
                messageBox.classList.add('message-box');
                messageBox.innerHTML = `
                    <div class="message-content">
                        <p>Thank you for subscribing, ${email}!</p>
                        <button class="message-ok-btn">OK</button>
                    </div>
                `;
                document.body.appendChild(messageBox);

                document.querySelector('.message-ok-btn').addEventListener('click', () => {
                    document.body.removeChild(messageBox);
                });
                emailInput.value = '';
            } else {
                const messageBox = document.createElement('div');
                messageBox.classList.add('message-box');
                messageBox.innerHTML = `
                    <div class="message-content">
                        <p>Please enter a valid email address.</p>
                        <button class="message-ok-btn">OK</button>
                    </div>
                `;
                document.body.appendChild(messageBox);

                document.querySelector('.message-ok-btn').addEventListener('click', () => {
                    document.body.removeChild(messageBox);
                });
            }
        });
    }

    // Added custom message box CSS for general alerts
    const style = document.createElement('style');
    style.innerHTML = `
        .message-box {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .message-content {
            background-color: #1c1c1c;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
            color: #f5f5f5;
            max-width: 400px;
            width: 90%;
            border-top: 4px solid #ff6b6b;
        }
        .message-content p {
            margin-bottom: 20px;
            font-size: 1.1em;
            line-height: 1.5;
        }
        .message-ok-btn {
            background-color: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
        }
        .message-ok-btn:hover {
            background-color: #e63946;
        }
    `;
    document.head.appendChild(style);
});
