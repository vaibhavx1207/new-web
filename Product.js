document.addEventListener('DOMContentLoaded', () => {
  // Inject smooth scroll behavior into CSS
  const style = document.createElement('style');
  style.textContent = 'html { scroll-behavior: smooth; }';
  document.head.appendChild(style);

  // Function to update wishlist count badge
  function updateWishlistCount() {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const wishlistCountBadge = document.querySelector('.icon.heart .count-badge');
      const heartIcon = document.querySelector('.icon.heart');
      
      if (!heartIcon) {
        console.warn('Wishlist icon (.icon.heart) not found in DOM.');
        return;
      }
      
      if (wishlistCountBadge) {
        wishlistCountBadge.textContent = wishlist.length;
        wishlistCountBadge.classList.toggle('hidden', wishlist.length === 0);
        console.log(`Wishlist count updated: ${wishlist.length}`);
      } else {
        console.warn('Wishlist count badge (.icon.heart .count-badge) not found.');
      }
    } catch (e) {
      console.error('Error updating wishlist count:', e);
    }
  }

  // Function to update cart count badge
  function updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartCountBadge = document.querySelector('.icon.cart .count-badge');
      const cartIcon = document.querySelector('.icon.cart');
      
      if (!cartIcon) {
        console.warn('Cart icon (.icon.cart) not found in DOM.');
        return;
      }
      
      if (cartCountBadge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountBadge.textContent = totalItems;
        cartCountBadge.classList.toggle('hidden', totalItems === 0);
        console.log(`Cart count updated: ${totalItems}, Cart contents:`, cart);
        // Add animation to badge
        if (totalItems > 0) {
          cartCountBadge.style.animation = 'shakeBadge 0.5s ease-in-out';
          setTimeout(() => {
            cartCountBadge.style.animation = '';
          }, 500);
        }
      } else {
        console.warn('Cart count badge (.icon.cart .count-badge) not found.');
      }
    } catch (e) {
      console.error('Error updating cart count:', e);
    }
  }

  // Retry DOM selection if elements are not found initially
  function retryUpdateCartCount(attempts = 5, delay = 100) {
    if (attempts <= 0) {
      console.error('Failed to find cart count badge after retries.');
      return;
    }
    const cartCountBadge = document.querySelector('.icon.cart .count-badge');
    if (cartCountBadge) {
      updateCartCount();
    } else {
      console.log(`Cart count badge not found, retrying... (${attempts} attempts left)`);
      setTimeout(() => retryUpdateCartCount(attempts - 1, delay * 2), delay);
    }
  }

  // Call update counts immediately
  updateWishlistCount();
  retryUpdateCartCount();

  // Sample product data (replace with API call in production)
  const products = {
    '1': {
      id: '1',
      name: '"Old School" Style T-Shirt with Indian Flag Sleeve - Graphic Tee',
      images: ['Sale/1(1).png', 'Sale/1(2).png', 'Sale/1(3).png', 'Sale/1(11).png', 'Sale/1(12).png', 'Sale/1(13).png', 'Sale/1(4).png', 'Sale/1(14).png'],
      tag: 'best-seller-tag',
      tagText: 'Sale🔖',
      rating: '⭐4.6',
      orders: '|🚚189',
      currentPrice: '₹600',
      originalPrice: '₹1,200',
      discount: '🔥50% OFF',
      description: 'Celebrate retro style and national pride with this "Old School" graphic t-shirt for men. Featuring a vibrant boombox and sneakers design, plus an Indian flag on the sleeve, this black or white tee offers comfort and unique flair.',
      colors: [{ name: 'white', hex: '#ffffff' }, { name: 'black', hex: '#000000' }],
      colorImageMap: { 'white': 'Sale/1(11).png', 'black': 'Sale/1(1).png'},
      relatedProducts: ['2', '3', '4'] // Related best-seller products
    },
    '2': {
      id: '2',
      name: '"BE YOURSELF" Inspirational Hoodie for Men & Women - Black & White',
      images: ['Sale/4(1).png', 'Sale/4(2).png', 'Sale/4(3).png', 'Sale/4(4).png'],
      tag: 'best-seller-tag',
      tagText: 'Sale',
      rating: '⭐4.8',
      orders: '|🚚120',
      currentPrice: '₹1,500',
      originalPrice: '₹2,500',
      discount: '40% OFF',
      description: 'Embrace your individuality with our "BE YOURSELF" graphic hoodie. Featuring a bold, repeating message on the front and a subtle Indian flag on the sleeve, this comfortable pullover is perfect for daily wear. Available in classic black or crisp white.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'Sale/4(1).png', 'white': 'Sale/4(3).png' },
      relatedProducts: ['1', '3', '4'] // Related best-seller products
    },
    '3': {
      id: '3',
      name: ' "Bad Boys" Graphic T-Shirt - Edgy with Crown & Smiley',
      images: ['Sale/2(1).png', 'Sale/2(2).png', 'Sale/2(3).png', 'Sale/2(11).png', 'Sale/2(12).png', 'Sale/2(13).png', 'Sale/2(4).png', 'Sale/2(14).png'],
      tag: 'best-seller-tag',
      tagText: 'Sale',
      rating: '⭐4.5',
      orders: '|🚚169',
      currentPrice: '₹600',
      originalPrice: '₹1,200',
      discount: '50% OFF',
      description: "Unleash your inner rebel with our 'Bad Boys' graphic t-shirt. Featuring a bold front logo with a smiley, a striking 'Stay Away From Bad Boy' back print, and an edgy red crown on the sleeve, this tee comes in black or white. Perfect for making a statement.",
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'Sale/2(1).png', 'white': 'Sale/2(11).png'},
      relatedProducts: ['1', '2', '4'] // Related best-seller products
    },
    '4': {
      id: '4',
      name: '"Positive Energy" Unisex Hoodie - Inspirational Graphic Pullover',
      images: ['Sale/3(1).png', 'Sale/3(2).png', 'Sale/3(3).png', 'Sale/3(4).png'],
      tag: 'best-seller-tag',
      tagText: 'Sale',
      rating: '⭐4.6',
      orders: '|🚚219',
      currentPrice: '₹1,500',
      originalPrice: '₹2,500',
      discount: '50% OFF',
      description: 'Radiate good vibes with our "Positive Energy" graphic hoodie. Featuring a bold, uplifting design with an "Estd 1989" detail, and an Indian flag on the sleeve, this comfortable pullover is available in black or white – perfect for spreading positivity.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'Sale/3(1).png', 'white': 'Sale/3(3).png' },
      relatedProducts: ['1', '2', '3'] // Related best-seller products
    },
    '5': {
      id: '5',
      name: "Men's Motivational Quote Tee - Perseverance Design",
      images: ['index/5(1).png', 'index/5(2).png', 'index/5(3).png'],
      tag: 'best-seller-tag',
      tagText: 'Sale',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹550',
      originalPrice: '₹1,100',
      discount: '50% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'navy', hex: '#1a2a44' }, { name: 'white', hex: '#ffffff' }, { name: 'red', hex: '#ff4d4d' }],
      colorImageMap: { 'navy': 'index/5(1).png', 'white': 'index/5(2).png', 'red': 'index/5(3).png' },
      relatedProducts: ['1', '2', '3'] // Related best-seller products
    },
    '6': {
      id: '6',
      name: 'Crown & "Glory" Graphic Hoodie for Men & Women - Black & White',
      images: ['trend/1(1).png', 'trend/1(2).png', 'trend/1(3).png', 'trend/1(4).png'],
      tag: 'trending-tag',
      tagText: 'Trending',
      rating: '⭐4.6',
      orders: '|🚚109',
      currentPrice: '₹1,750',
      originalPrice: '₹2,500',
      discount: '30% OFF',
      description: 'Achieve greatness in our stylish "Glory" hoodie. This unisex pullover boasts a striking crown graphic, motivational "One step at a time, You"ll get there" text, and an Indian flag emblem on the sleeve. Perfect for everyday comfort and inspiration, available in black or white.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'trend/1(1).png', 'white': 'trend/1(3).png' },
      relatedProducts: ['7', '8', '9'] // Related trending products
    },
    '7': {
      id: '7',
      name: '"You Are Enough" Motivational T-Shirt - Inspirational Graphic Tee',
      images: ['trend/2(1).png', 'trend/2(2).png', 'trend/2(3).png', 'trend/2(4).png'],
      tag: 'trending-tag',
      tagText: 'Trending',
      rating: '⭐4.8',
      orders: '|🚚249',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Boost your confidence with our "You Are Enough" graphic t-shirt. This inspiring tee features a powerful message in bold red and elegant script, reminding you of your worth. Available in classic black or crisp white, with a subtle Indian flag on the sleeve, it is perfect for everyday wear and spreading positivity',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'trend/2(1).png', 'white': 'trend/2(3).png'},
      relatedProducts: ['6', '8', '9'] // Related trending products
    },
    '8': {
      id: '8',
      name: 'Streetwear "Hustle" T-Shirt - Men Graphic Tee',
      images: ['trend/3(1).png', 'trend/3(2).png', 'trend/3(3).png', 'trend/3(4).png', 'trend/3(5).png', 'trend/3(6).png', 'trend/3(7).png', 'trend/3(8).png'],
      tag: 'trending-tag',
      tagText: 'Trending',
      rating: '⭐4.7',
      orders: '|🚚199',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'trend/3(1).png', 'purple': 'trend/3(5).png' },
      relatedProducts: ['6', '7', '9'] // Related trending products
    },
    '9': {
      id: '9',
      name: '"Sunset Is Beautiful" Mountain & Sun Hoodie - Nature Inspired Pullover',
      images: ['trend/5(1).png', 'trend/5(2).png', 'trend/5(3).png', 'trend/5(4).png'],
      tag: 'trending-tag',
      tagText: 'Trending',
      rating: '⭐4.8',
      orders: '|🚚249',
      currentPrice: '₹1,750',
      originalPrice: '₹2,500',
      discount: '30% OFF',
      description: 'Embrace the beauty of nature with our "Sunset Is Beautiful" graphic hoodie. Featuring a serene mountain and sun design, this comfortable pullover is perfect for outdoor lovers and casual wear. Available in black or white, with an Indian flag on the sleeve for added detail.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'trend/5(1).png', 'white': 'trend/5(3).png' },
      relatedProducts: ['6', '7', '8'] // Related trending products
    },
    '10': {
      id: '10',
      name: '"Never Stop Trying" Spiral Graphic T-Shirt - Inspirational Tee',
      images: ['trend/4(1).png', 'trend/4(2).png', 'trend/4(3).png', 'trend/4(4).png', 'trend/4(5).png', 'trend/4(6).png'],
      tag: 'trending-tag',
      tagText: 'Trending',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Stay relentless with our "Never Stop Trying" graphic t-shirt. This inspiring tee features a unique spiral text design, a central red symbol, and a "Los Angeles Estd 2025" detail. Available in black, white, or light purple, with an Indian flag on the sleeve, it is perfect for those who embody perseverance.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'trend/4(1).png', 'white': 'trend/4(3).png', 'purple': 'trend/4(5).png' },
      relatedProducts: ['6', '7', '8'] // Related trending products
    },
    '11': {
      id: '11',
      name: '"HUSTLE" Pixel Art Graphic Tee - Unisex Motivation T-Shirt',
      images: ['new/1(1).png', 'new/1(2).png', 'new/1(3).png', 'new/1(4).png', 'new/1(5).png', 'new/1(6).png'],
      tag: 'new-arrival-tag',
      tagText: 'NEW',
      rating: '⭐4.9',
      orders: '|🚚99',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Get motivated in our "HUSTLE" pixel art graphic tee. This streetwear-ready t-shirt features a distinctive multi-color framed "HUSTLE" design on the front and an Indian flag on the sleeve. Ideal for daily wear, available in versatile black, white, or light purple.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'new/1(1).png', 'white': 'new/1(5).png', 'purple': 'new/1(3).png' },
      relatedProducts: ['12', '13', '14'] // Related new arrival products
    },
    '12': {
      id: '12',
      name: 'Borealis Classic 1960 Car Hoodie - Vintage Auto Graphic Pullover',
      images: ['new/2(1).png', 'new/2(2).png', 'new/2(3).png', 'new/2(4).png'],
      tag: 'new-arrival-tag',
      tagText: 'NEW',
      rating: '⭐4.8',
      orders: '|🚚200',
      currentPrice: '₹1,750',
      originalPrice: '₹2,250',
      discount: '30% OFF',
      description: 'Relive the golden era of classic cars with our "Borealis Classic 1960" hoodie. This comfortable unisex pullover features a stylish vintage car graphic and "Reliving the Golden Era of Classic Cars" text on the front. Available in black or white, and detailed with an Indian flag on the sleeve.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'new/2(1).png', 'white': 'new/2(3).png' },
      relatedProducts: ['11', '13', '14'] // Related new arrival products
    },
    '13': {
      id: '13',
      name: '"FEARLESS" Bold Graphic T-Shirt Statement Tee',
      images: ['new/3(1).png', 'new/3(2).png', 'new/3(3).png', 'new/3(4).png', 'new/3(5).png', 'new/3(6).png'],
      tag: 'new-arrival-tag',
      tagText: 'NEW',
      rating: '⭐4.7',
      orders: '|🚚200',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Unleash your inner strength with our "FEARLESS" graphic t-shirt. This bold tee features striking text with "Estd 1989" detail on the front and a unique, distressed-look back graphic including "Fearless" and a tiger. Available in black or white, with an Indian flag on the sleeve, it is perfect for making a powerful statement.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'new/3(5).png', 'white': 'new/3(1).png', 'purple': 'new/3(3).png' },
      relatedProducts: ['11', '12', '14'] // Related new arrival products
    },
    '14': {
      id: '14',
      name: '"Stay Alone" Statement Hoodies - Black & White with Indian Flag Detail',
      images: ['new/4(1).png', 'new/4(2).png', 'new/4(3).png', 'new/4(4).png'],
      tag: 'new-arrival-tag',
      tagText: 'NEW',
      rating: '⭐4.5',
      orders: '|🚚169',
      currentPrice: '₹1,750',
      originalPrice: '₹2,250',
      discount: '30% OFF',
      description: 'Express your individuality with our "Stay Alone" hoodies. Available in classic black and crisp white, each features a subtle Indian flag on the sleeve. Perfect for comfort and making a statement.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'new/4(1).png', 'white': 'new/4(3).png' },
      relatedProducts: ['11', '12', '13'] // Related new arrival products
    },
    '15': {
      id: '15',
      name: '"Swag" T-Shirts with Bucket Hat & Snapback Designs - India Flag Sleeve',
      images: ['new/5(1).png', 'new/5(2).png', 'new/5(3).png', 'new/5(4).png', 'new/5(5).png', 'new/5(6).png', 'new/5(7).png', 'new/5(8).png', 'new/5(9).png'],
      tag: 'new-arrival-tag',
      tagText: 'NEW',
      rating: '⭐4.8',
      orders: '|🚚99',
      currentPrice: '₹750',
      originalPrice: '₹1,250',
      discount: '40% OFF',
      description: 'Unleash your "Swag" with our trendy t-shirts! Featuring a unique bucket hat design on the front and a cool snapback graphic on the back, plus an Indian flag on the sleeve. Available in multiple colors.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'new/5(7).png', 'white': 'new/5(4).png', 'purple': 'new/5(1).png' },
      relatedProducts: ['11', '12', '13'] // Related new arrival products
    },
    '16': {
      id: '16',
      name: '"Stay Alone" Statement Hoodies - Black & White with Indian Flag Detail',
      images: ['exc/1(1).png', 'exc/1(2).png', 'exc/1(3).png', 'exc/1(4).png'],
      tag: 'collection-tag',
      tagText: 'COLLECTION',
      rating: '⭐4.5',
      orders: '|🚚169',
      currentPrice: '₹1,750',
      originalPrice: '₹2,250',
      discount: '30% OFF',
      description: 'Express your individuality with our "Stay Alone" hoodies. Available in classic black and crisp white, each features a subtle Indian flag on the sleeve. Perfect for comfort and making a statement.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'exc/1(1).png', 'white': 'exc/1(3).png'},
      relatedProducts: ['17', '18', '19'] // Related collection products
    },
    '17': {
      id: '17',
      name: "Men's Motivational Quote Tee - Perseverance Design",
      images: ['exc/2(1).png', 'exc/2(2).png', 'exc/2(3).png', 'exc/2(4).png'],
      tag: 'collection-tag',
      tagText: 'COLLECTION',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹550',
      originalPrice: '₹1,100',
      discount: '50% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'exc/2(1).png', 'white': 'exc/2(3).png' },
      relatedProducts: ['16', '18', '19'] // Related collection products
    },
    '18': {
      id: '18',
      name: "Men's Motivational Quote Tee - Perseverance Design",
      images: ['exc/3(1).png', 'exc/3(2).png', 'exc/3(3).png', 'exc/3(4).png', 'exc/3(5).png', 'exc/3(6).png'],
      tag: 'collection-tag',
      tagText: 'COLLECTION',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹550',
      originalPrice: '₹1,100',
      discount: '50% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'exc/3(5).png', 'white': 'exc/3(1).png', 'purple': 'exc/3(3).png' },
      relatedProducts: ['16', '17', '19'] // Related collection products
    },
    '19': {
      id: '19',
      name: "Men's Motivational Quote Tee - Perseverance Design",
      images: ['exc/4(1).png', 'exc/4(2).png', 'exc/4(3).png', 'exc/4(4).png', 'exc/4(5).png', 'exc/4(6).png'],
      tag: 'collection-tag',
      tagText: 'COLLECTION',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹550',
      originalPrice: '₹1,100',
      discount: '50% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }],
      colorImageMap: { 'black': 'exc/4(1).png', 'white': 'exc/4(4).png' },
      relatedProducts: ['16', '17', '18'] // Related collection products
    },
    '20': {
      id: '20',
      name: "Men's Motivational Quote Tee - Perseverance Design",
      images: ['exc/5(1).png', 'exc/5(2).png', 'exc/5(3).png', 'exc/5(4).png', 'exc/5(5).png', 'exc/5(6).png'],
      tag: 'collection-tag',
      tagText: 'COLLECTION',
      rating: '⭐4.9',
      orders: '|🚚200',
      currentPrice: '₹550',
      originalPrice: '₹1,100',
      discount: '50% OFF',
      description: 'Stay cozy and stylish with the Veirdo Exclusive Designer Hoodie. Crafted with premium materials and a unique design, this hoodie is a must-have for your wardrobe.',
      colors: [{ name: 'black', hex: '#000000' }, { name: 'white', hex: '#ffffff' }, { name: 'purple', hex: '#D8BFD8' }],
      colorImageMap: { 'black': 'exc/5(1).png', 'white': 'exc/5(3).png', 'purple': 'exc/5(5).png' },
      relatedProducts: ['16', '17', '18'] // Related collection products
    }
  };

  
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products[productId] || products['1'];

  // Select DOM elements with error handling
  const mainImage = document.querySelector('.main-product-image');
  const thumbnailContainer = document.querySelector('.thumbnail-container');
  const productTag = document.querySelector('.product-tag');
  const productTitle = document.querySelector('.product-title');
  const ratingValue = document.querySelector('.rating-value');
  const orders = document.querySelector('.orders');
  const currentPrice = document.querySelector('.current-price');
  const originalPrice = document.querySelector('.original-price');
  const discountPercentage = document.querySelector('.discount-percentage');
  const productDescription = document.querySelector('.product-description');
  const colorOptions = document.querySelector('.color-options');
  const productCardsContainer = document.querySelector('.product-cards');

  // Check if critical elements exist
  if (!mainImage || !thumbnailContainer || !productTag || !productTitle || !ratingValue || 
      !orders || !currentPrice || !originalPrice || !discountPercentage || 
      !productDescription || !colorOptions || !productCardsContainer) {
    console.error('One or more DOM elements are missing. Check HTML selectors.');
    return;
  }

  // Initial population
  mainImage.src = product.images[0] || '';
  mainImage.dataset.images = product.images.join(',');
  productTag.className = `product-tag ${product.tag}`;
  productTag.textContent = product.tagText || '';
  productTitle.textContent = product.name || '';
  ratingValue.textContent = product.rating || '';
  orders.textContent = `${product.orders} Orders` || '';
  currentPrice.textContent = product.currentPrice || '';
  originalPrice.textContent = product.originalPrice || '';
  discountPercentage.textContent = product.discount || '';
  productDescription.textContent = product.description || '';

  // Populate thumbnails
  product.images.forEach((img, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = img;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.className = `thumbnail${index === 0 ? ' active' : ''}`;
    thumbnailContainer.appendChild(thumbnail);
  });

  // Populate color options
  product.colors.forEach(color => {
    const colorDot = document.createElement('span');
    colorDot.className = `color-dot${color.name === 'white' ? ' white' : color.name === 'black' ? ' black' : ''}`;
    colorDot.style.backgroundColor = color.hex;
    colorDot.dataset.color = color.name;
    colorOptions.appendChild(colorDot);
  });

  // Populate Explore More Products
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    product.relatedProducts.forEach((relatedId, index) => {
      const relatedProduct = products[relatedId];
      if (relatedProduct) {
        const card = document.createElement('div');
        card.className = `product-card card-${index + 1}`;
        card.innerHTML = `
          <div class="product-card-image">
            <img src="${relatedProduct.images[0]}" alt="${relatedProduct.name}" class="card-image">
          </div>
          <div class="product-card-info">
            <h4 class="card-title">${relatedProduct.name}</h4>
            <div class="card-price-details">
              <span class="card-current-price">${relatedProduct.currentPrice}</span>
              <span class="card-original-price">${relatedProduct.originalPrice}</span>
              <span class="card-discount-percentage">${relatedProduct.discount}</span>
            </div>
            <div class="card-rating">
              <span class="card-rating-value">${relatedProduct.rating}</span>
              <span class="card-orders">${relatedProduct.orders} Orders</span>
            </div>
            <button class="view-product-btn" onclick="window.location.href='Product.html?id=${relatedProduct.id}'">View Product</button>
          </div>
        `;
        productCardsContainer.appendChild(card);
      } else {
        console.warn(`Related product ID ${relatedId} not found.`);
      }
    });
  } else {
    console.warn('No related products defined for product ID:', productId);
    productCardsContainer.innerHTML = '<p>No related products available.</p>';
  }

  // Image Gallery Functionality with Smooth Transitions
  const thumbnails = document.querySelectorAll('.thumbnail');
  const leftNav = document.querySelector('.gallery-nav.left');
  const rightNav = document.querySelector('.gallery-nav.right');
  let currentImageIndex = 0;

  function updateMainImage(index) {
    if (!mainImage) return;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = product.images[index] || product.images[0];
      mainImage.style.opacity = '1';
      mainImage.style.transform = 'scale(1)';
    }, 300);
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    currentImageIndex = index;
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      updateMainImage(index);
      thumbnail.style.animation = 'pulseThumbnail 0.5s ease-in-out';
      setTimeout(() => thumbnail.style.animation = '', 500);
    });
  });

  if (leftNav) {
    leftNav.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
      updateMainImage(currentImageIndex);
    });
  }

  if (rightNav) {
    rightNav.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % product.images.length;
      updateMainImage(currentImageIndex);
    });
  }

  // Color Selector Functionality with Animation
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      dot.style.animation = 'pulseColor 0.5s ease-in-out';
      setTimeout(() => dot.style.animation = '', 500);
      const selectedColor = dot.dataset.color;
      const imageForColor = product.colorImageMap[selectedColor] || product.images[0];
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = imageForColor;
        mainImage.style.opacity = '1';
        mainImage.style.transform = 'scale(1)';
      }, 300);
      console.log(`Selected color: ${selectedColor}`);
      // Update wishlist button state when color changes
      updateWishlistButtonState(productId, selectedColor);
    });
  });

  // Size Selector Functionality with Animation
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      button.style.animation = 'pulseSize 0.5s ease-in-out';
      setTimeout(() => button.style.animation = '', 500);
      console.log(`Selected size: ${button.dataset.size}`);
    });
  });

  // Quantity Selector Functionality with Smooth Animation
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityInput = document.querySelector('.quantity-input');

  function animateQuantityChange(targetValue) {
    let currentValue = parseInt(quantityInput.value);
    const step = targetValue > currentValue ? 1 : -1;
    const animate = () => {
      currentValue += step;
      quantityInput.value = currentValue;
      quantityInput.style.transform = 'scale(1.1)';
      setTimeout(() => {
        quantityInput.style.transform = 'scale(1)';
      }, 150);
      if (currentValue !== targetValue) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        animateQuantityChange(value - 1);
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value < 10) {
        animateQuantityChange(value + 1);
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener('input', () => {
      let value = parseInt(quantityInput.value);
      if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
      } else if (value > 10) {
        quantityInput.value = 10;
      }
    });
  }

  // Add to Cart Functionality with Animation
  function addToCart(productId, quantity, color, size) {
    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const product = products[productId];
      const imageForColor = product.colorImageMap[color] || product.images[0];
      const cartItem = {
        id: productId,
        name: product.name,
        image: imageForColor,
        price: product.currentPrice,
        quantity: parseInt(quantity),
        color: color,
        size: size,
      };

      const existingItemIndex = cart.findIndex(item => item.id === productId && item.color === color && item.size === size);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += parseInt(quantity);
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart updated:', cart);
      updateCartCount(); // Update cart count after adding item
      alert(`${quantity} ${product.name} (Color: ${color}, Size: ${size}) added to cart!`);
    } catch (e) {
      console.error('Error updating cart:', e);
      alert('Unable to add item to cart due to browser restrictions.');
    }
  }

  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const selectedColor = document.querySelector('.color-dot.active')?.dataset.color;
      const selectedSize = document.querySelector('.size-btn.active')?.dataset.size;
      const quantity = quantityInput.value;

      if (!selectedColor) {
        alert('Please select a color.');
        return;
      }
      if (!selectedSize) {
        alert('Please select a size.');
        return;
      }

      addToCart(productId, quantity, selectedColor, selectedSize);
      addToCartBtn.style.animation = 'pulseButton 0.5s ease-in-out';
      setTimeout(() => addToCartBtn.style.animation = '', 500);
    });
  }

  // Function to update wishlist button state
  function updateWishlistButtonState(productId, selectedColor) {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (!wishlistBtn) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isInWishlist = wishlist.some(item => item.id === productId && item.color === selectedColor);
    wishlistBtn.classList.toggle('active', isInWishlist);
  }

  // Wishlist Button Functionality with Animation
  const wishlistBtn = document.querySelector('.wishlist-btn');
  if (wishlistBtn) {
    // Initialize wishlist button state
    const selectedColor = document.querySelector('.color-dot.active')?.dataset.color || product.colors[0].name;
    updateWishlistButtonState(productId, selectedColor);

    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
      wishlistBtn.style.animation = 'heartBeat 0.5s ease-in-out';
      setTimeout(() => wishlistBtn.style.animation = '', 500);

      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const selectedColor = document.querySelector('.color-dot.active')?.dataset.color;

      if (!selectedColor) {
        alert('Please select a color before adding to wishlist.');
        wishlistBtn.classList.remove('active'); // Revert active state
        return;
      }

      const wishlistItem = {
        id: productId,
        name: product.name,
        image: product.colorImageMap[selectedColor] || product.images[0],
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        color: selectedColor,
      };

      const itemIndex = wishlist.findIndex(
        (item) => item.id === productId && item.color === selectedColor
      );

      try {
        if (wishlistBtn.classList.contains('active')) {
          // Add to wishlist if not already present
          if (itemIndex === -1) {
            wishlist.push(wishlistItem);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${product.name} (Color: ${selectedColor}) added to wishlist!`);
          }
        } else {
          // Remove from wishlist if present
          if (itemIndex !== -1) {
            wishlist.splice(itemIndex, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${product.name} (Color: ${selectedColor}) removed from wishlist!`);
          }
        }

        // Update wishlist count immediately
        updateWishlistCount();
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        alert('Unable to update wishlist due to browser restrictions.');
        wishlistBtn.classList.toggle('active'); // Revert toggle on error
      }
    });
  }

  // Search Bar Functionality with Smooth Placeholder Animation
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.querySelector('.search-icon');
  const placeholders = ['T-shirts', 'Polo Tshirt', 'Hoodie'];
  let currentIndex = 0;

  function cyclePlaceholders() {
    if (!searchInput) return;
    searchInput.style.opacity = '0';
    setTimeout(() => {
      searchInput.placeholder = `Try searching "${placeholders[currentIndex]}"`;
      searchInput.style.opacity = '1';
      currentIndex = (currentIndex + 1) % placeholders.length;
    }, 300);
  }

  if (searchInput && searchButton) {
    cyclePlaceholders();
    setInterval(cyclePlaceholders, 1500);
  }

  // Debounce search input
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (query) => {
    if (query) {
      console.log(`Searching for: ${query}`);
    }
  };

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      handleSearch(query);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        handleSearch(query);
      }
    });

    searchInput.addEventListener('input', debounce((e) => {
      const query = e.target.value.trim();
      handleSearch(query);
    }, 300));
  }

  // Intersection Observer for More Products Animation
  const productCards = document.querySelectorAll('.product-card');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInCard 1s ease-in-out forwards`;
        entry.target.style.animationDelay = `${index * 0.2}s`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  productCards.forEach(card => {
    observer.observe(card);
  });
});