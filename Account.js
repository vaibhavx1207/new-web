document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const otpModal = document.getElementById('otp-modal');
    const accountContainer = document.getElementById('account-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const otpForm = document.getElementById('otp-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const resendOtpLink = document.getElementById('resend-otp');
    const closeButtons = document.querySelectorAll('.close-btn');

    const BASE_URL = 'http://localhost:5000/api/users';

    // Highlight the Account icon in the navbar
    const accountIcon = document.querySelector('.icon.account');
    if (accountIcon) {
        accountIcon.classList.add('active');
        accountIcon.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigation since we're already on Account.html
        });
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        // Optionally, verify the token with the backend (e.g., a /profile endpoint)
        // For now, we'll assume the token is valid and load the user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            loadAccountContent(user);
        } else {
            localStorage.removeItem('token');
            loginModal.style.display = 'flex';
        }
    } else {
        loginModal.style.display = 'flex';
    }

    // Toggle modals
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            otpModal.style.display = 'none';
        });
    });

    // Register form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value.trim();
        const mobile = document.getElementById('register-mobile').value.trim();
        const password = document.getElementById('register-password').value;
        const gender = document.getElementById('register-gender').value;

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, mobile, password }),
            });
            const data = await response.json();

            if (response.ok) {
                // Store user details temporarily for OTP verification
                localStorage.setItem('pendingUser', JSON.stringify({ email, mobile, password, gender }));
                // Pre-fill the OTP email field
                document.getElementById('otp-email').value = email;
                registerModal.style.display = 'none';
                otpModal.style.display = 'flex';
                alert(data.message); // "User registered. Please verify your email with the OTP sent."
            } else {
                alert(data.message); // e.g., "User with this email or mobile already exists"
            }
        } catch (error) {
            alert('Error: Unable to connect to the server. Please try again later.');
        }
    });

    // OTP form submission
    otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('otp-email').value.trim();
        const otp = document.getElementById('otp-code').value.trim();

        try {
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();

            if (response.ok) {
                // On successful OTP verification, log the user in automatically
                const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
                if (!pendingUser) {
                    alert('Session expired. Please register again.');
                    otpModal.style.display = 'none';
                    registerModal.style.display = 'flex';
                    return;
                }

                // Perform login to get the token
                const loginResponse = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ identifier: pendingUser.email, password: pendingUser.password }),
                });
                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    localStorage.setItem('token', loginData.token);
                    const user = {
                        name: pendingUser.email.split('@')[0], // Use email prefix as name (since backend doesn't store name)
                        email: pendingUser.email,
                        mobile: pendingUser.mobile,
                        gender: pendingUser.gender,
                        memberSince: new Date().toISOString(),
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.removeItem('pendingUser');
                    otpModal.style.display = 'none';
                    loadAccountContent(user);
                    alert(data.message); // "Email verified successfully. Welcome email sent."
                } else {
                    alert('Error logging in after OTP verification. Please try logging in manually.');
                    otpModal.style.display = 'none';
                    loginModal.style.display = 'flex';
                }
            } else {
                alert(data.message); // e.g., "Invalid or expired OTP"
            }
        } catch (error) {
            alert('Error: Unable to connect to the server. Please try again later.');
        }
    });

    // Resend OTP
    resendOtpLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('otp-email').value.trim();
        const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));

        if (!pendingUser) {
            alert('Session expired. Please register again.');
            otpModal.style.display = 'none';
            registerModal.style.display = 'flex';
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: pendingUser.email,
                    mobile: pendingUser.mobile,
                    password: pendingUser.password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                alert('OTP resent successfully. Please check your email.');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error: Unable to resend OTP. Please try again later.');
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-identifier').value.trim();
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                // Since the backend doesn't return user details, we'll simulate the user object
                // In a real app, you'd fetch user details from a /profile endpoint using the token
                const user = {
                    name: identifier.split('@')[0], // Use email prefix as name
                    email: identifier.includes('@') ? identifier : '',
                    mobile: !identifier.includes('@') ? identifier : '',
                    gender: 'other', // Default, since we don't have this from login
                    memberSince: new Date().toISOString(),
                };
                localStorage.setItem('user', JSON.stringify(user));
                loginModal.style.display = 'none';
                loadAccountContent(user);
            } else {
                alert(data.message); // e.g., "Invalid credentials" or "Please verify your email first"
            }
        } catch (error) {
            alert('Error: Unable to connect to the server. Please try again later.');
        }
    });

    // Load account content
    function loadAccountContent(user) {
        const emoji = user.gender === 'male' ? '😎' : user.gender === 'female' ? '💃' : '🤖';
        accountContainer.innerHTML = `
            <h1 class="account-title">Your AI-Powered Account 🤖✨</h1>
            <div class="account-content">
                <div class="account-card profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar">${emoji}</div>
                        <h2>Welcome, ${user.name}! ${emoji}</h2>
                    </div>
                    <div class="profile-details">
                        <p>Name: ${user.name}</p>
                        <p>Email: ${user.email || 'N/A'}</p>
                        <p>Mobile: ${user.mobile || 'N/A'}</p>
                        <p>Member Since: ${new Date(user.memberSince).toLocaleDateString()}</p>
                        <p>Gender: ${user.gender}</p>
                    </div>
                    <button class="edit-profile-btn">Edit Profile ✍️</button>
                </div>
                <div class="account-card order-history-card">
                    <h2>Order History 📦</h2>
                    <div class="order-list">
                        <div class="order-item">
                            <p>Order #12345 - ₹1,299</p>
                            <p>Status: Delivered 🚚</p>
                            <p>Date: May 20, 2025</p>
                            <button class="view-order-btn">View Details 👀</button>
                        </div>
                        <div class="order-item">
                            <p>Order #12346 - ₹799</p>
                            <p>Status: Processing ⏳</p>
                            <p>Date: June 1, 2025</p>
                            <button class="view-order-btn">View Details 👀</button>
                        </div>
                    </div>
                </div>
                <div class="account-card wishlist-card">
                    <h2>Wishlist ❤️</h2>
                    <div class="wishlist-list">
                        <div class="wishlist-item">
                            <img src="black-tee.jpg" alt="Black Tee" class="wishlist-image">
                            <div class="wishlist-details">
                                <p>Veirdo Premium Black Graphic Tee</p>
                                <p>₹799</p>
                                <button class="add-to-cart-btn">Add to Cart 🛒</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="account-card settings-card">
                    <h2>Settings ⚙️</h2>
                    <div class="settings-options">
                        <button class="settings-btn">Change Password 🔒</button>
                        <button class="settings-btn">Manage Addresses 🏠</button>
                        <button class="settings-btn">Notification Preferences 🔔</button>
                    </div>
                </div>
                <div class="account-card logout-card">
                    <button class="logout-btn">Logout 👋</button>
                </div>
            </div>
        `;

        // Re-attach event listeners
        attachEventListeners();
    }

    // Attach event listeners
    function attachEventListeners() {
        // Edit Profile Button
        const editProfileBtn = document.querySelector('.edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                alert('Edit Profile feature coming soon! ✍️');
            });
        }

        // View Order Buttons
        const viewOrderButtons = document.querySelectorAll('.view-order-btn');
        viewOrderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.parentElement.querySelector('p').textContent.split('#')[1].split(' ')[0];
                alert(`Viewing order details for Order #${orderId}`);
            });
        });

        // Add to Cart Buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.parentElement.querySelector('p').textContent;
                alert(`Added ${productName} to cart 🛒`);
                button.classList.add('animate');
                setTimeout(() => button.classList.remove('animate'), 500);
            });
        });

        // Settings Buttons
        const settingsButtons = document.querySelectorAll('.settings-btn');
        settingsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.textContent;
                alert(`${action} settings coming soon! ⚙️`);
            });
        });

        // Logout Button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout? 👋')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('pendingUser');
                    window.location.href = 'index.html';
                }
            });
        }

        // Intersection Observer for Account Cards
        const accountCards = document.querySelectorAll('.account-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideIn 0.8s ease-out forwards';
                    }, index * 200);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        accountCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});