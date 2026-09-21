// script.js - Storefront functionality for Lé Anna Company

// Product Data Structure
const products = [
    {
        id: 1,
        name: "Korean Hydrating Serum",
        category: "korean",
        price: 45,
        originalPrice: 60,
        image: "images/serum.svg",
        badge: "Bestseller",
        description: "Advanced hydrating serum with hyaluronic acid and green tea extract. Deeply penetrates skin layers to provide long-lasting moisture and a radiant glow.",
        usage: "Apply 2-3 drops to clean skin morning and night.",
        ingredients: "Hyaluronic Acid, Green Tea Extract, Glycerin, Water."
    },
    {
        id: 2,
        name: "Professional Makeup Palette",
        category: "makeup",
        price: 85,
        originalPrice: null,
        image: "images/palette.svg",
        badge: "New",
        description: "Complete eyeshadow palette with 24 highly pigmented shades ranging from matte to shimmer. Perfect for creating both natural and dramatic looks.",
        usage: "Use a brush to apply and blend shades on eyelids.",
        ingredients: "Mica, Talc, Magnesium Stearate, Mineral Oil."
    },
    {
        id: 3,
        name: "Anti-Aging Night Cream",
        category: "skincare",
        price: 55,
        originalPrice: 70,
        image: "images/night-cream.svg",
        badge: "Sale",
        description: "Rich night cream with retinol and peptides to reduce fine lines and improve skin elasticity while you sleep.",
        usage: "Massage into face and neck before bedtime.",
        ingredients: "Retinol, Peptides, Shea Butter, Vitamin E."
    },
    {
        id: 4,
        name: "Hair Repair Treatment",
        category: "haircare",
        price: 38,
        originalPrice: null,
        image: "images/hair-repair.svg",
        badge: null,
        description: "Intensive repair treatment for damaged hair. Restores strength, shine, and manageability to over-processed hair.",
        usage: "Apply to damp hair, leave for 10 minutes, then rinse.",
        ingredients: "Keratin, Argan Oil, Panthenol."
    },
    {
        id: 5,
        name: "Vitamin C Brightening Cream",
        category: "skincare",
        price: 42,
        originalPrice: null,
        image: "images/vitamin-c-cream.svg",
        badge: "Popular",
        description: "Brightening cream with vitamin C and niacinamide. Evens skin tone and reduces the appearance of dark spots.",
        usage: "Apply daily as a moisturizer.",
        ingredients: "Vitamin C, Niacinamide, Aloe Vera."
    },
    {
        id: 6,
        name: "Matte Lipstick Set",
        category: "makeup",
        price: 35,
        originalPrice: 45,
        image: "images/lipstick-set.svg",
        badge: null,
        description: "Set of 5 long-lasting matte lipsticks in trending shades. Creamy formula that doesn't dry out lips.",
        usage: "Apply directly to lips.",
        ingredients: "Beeswax, Castor Oil, Pigments."
    },
    {
        id: 7,
        name: "Korean Sheet Mask Pack",
        category: "korean",
        price: 25,
        originalPrice: null,
        image: "images/sheet-mask.svg",
        badge: null,
        description: "Pack of 10 hydrating sheet masks infused with botanical extracts for an instant skin boost.",
        usage: "Place mask on face for 15-20 minutes.",
        ingredients: "Collagen, Tea Tree Oil, Rose Water."
    },
    {
        id: 8,
        name: "Luxury Perfume",
        category: "fragrance",
        price: 95,
        originalPrice: 120,
        image: "images/perfume.svg",
        badge: "Premium",
        description: "Elegant fragrance with floral and woody notes. Long-lasting scent that makes a statement.",
        usage: "Spray on pulse points.",
        ingredients: "Alcohol, Fragrance, Water."
    },
    {
        id: 9,
        name: "Gentle Cleansing Foam",
        category: "skincare",
        price: 28,
        originalPrice: null,
        image: "images/cleansing-foam.svg",
        badge: "New",
        description: "Mild cleansing foam that removes impurities without stripping skin of its natural oils.",
        usage: "Lather with water and massage onto face.",
        ingredients: "Amino Acids, Chamomile, Glycerin."
    },
    {
        id: 10,
        name: "Glow Primer",
        category: "makeup",
        price: 32,
        originalPrice: null,
        image: "images/glow-primer.svg",
        badge: null,
        description: "Illuminating primer that creates a smooth canvas for makeup while adding a subtle radiance.",
        usage: "Apply before foundation.",
        ingredients: "Silicone, Pearl Powder, Vitamin E."
    },
    {
        id: 11,
        name: "Volumizing Mascara",
        category: "makeup",
        price: 22,
        originalPrice: 28,
        image: "images/mascara.svg",
        badge: "Sale",
        description: "Waterproof mascara that provides extreme volume and length without clumping.",
        usage: "Sweep from root to tip of lashes.",
        ingredients: "Carbon Black, Waxes, Polymers."
    },
    {
        id: 12,
        name: "Scalp Revitalizer",
        category: "haircare",
        price: 45,
        originalPrice: null,
        image: "images/scalp-revitalizer.svg",
        badge: "Bestseller",
        description: "Refreshing scalp treatment that promotes healthy hair growth and reduces itchiness.",
        usage: "Apply directly to scalp and massage.",
        ingredients: "Peppermint Oil, Salicylic Acid, Biotin."
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('leAnnaCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('leAnnaWishlist')) || [];

// Brand gold, used for filled wishlist hearts
const GOLD = '#e0b04a';

// Shop filters combine, so a category, a price cap and a sort order can all apply at once
const shopState = { category: 'all', maxPrice: Infinity, sort: 'featured' };

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const searchInput = document.getElementById('searchInput');
const searchResults = document.createElement('div');
searchResults.className = 'search-results-dropdown';
if (document.querySelector('.search-box')) {
    document.querySelector('.search-box').appendChild(searchResults);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
    
    if (document.getElementById('shopProducts')) {
        loadShopProducts();
    }
    
    if (document.querySelector('.cart-items')) {
        loadCartItems();
    }

    if (window.location.pathname.includes('product.html')) {
        loadProductDetail();
    }

    if (document.querySelector('.hero-slider')) {
        initHeroSlider();
    }

    if (document.getElementById('checkoutSummary')) {
        loadCheckoutSummary();
    }
    
    setupEventListeners();
    setupStickyHeader();
    createQuickViewModal();
    initReveal();
});

// Event Listeners
function setupEventListeners() {
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) toggleMobileMenu();
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const modal = document.getElementById('quickViewModal');
        if (modal) modal.style.display = 'none';
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = e.target.value + ' L';
            filterByPrice(e.target.value);
        });
    }
    
    const filterLinks = document.querySelectorAll('.filter-link');
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.category);
        });
    });
    
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', sortProducts);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Sticky Header
function setupStickyHeader() {
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function toggleMobileMenu() {
    const open = nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active', open);
    mobileMenuBtn.setAttribute('aria-expanded', open);
}

// Cart Functions
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    // header bag and the mobile bottom-nav bag share the same badge class
    document.querySelectorAll('.cart-count').forEach(badge => {
        badge.textContent = count;
        badge.classList.toggle('is-zero', count === 0);
    });
    localStorage.setItem('leAnnaCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Product added to cart!', 'success');
}

// Wishlist Functions
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist', 'success');
    }
    localStorage.setItem('leAnnaWishlist', JSON.stringify(wishlist));
    updateWishlistIcons();
}

function updateWishlistIcons() {
    document.querySelectorAll('.action-btn .fa-heart').forEach(icon => {
        const card = icon.closest('.product-card');
        if (card) {
            const id = parseInt(card.dataset.id);
            if (wishlist.includes(id)) {
                icon.classList.add('fas');
                icon.classList.remove('far');
                icon.style.color = GOLD;
            } else {
                icon.classList.add('far');
                icon.classList.remove('fas');
                icon.style.color = '';
            }
        }
    });
}

// Product Card UI
function createProductCard(product) {
    const isWishlisted = wishlist.includes(product.id);
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onclick="goToProduct(${product.id})" style="cursor: pointer;" loading="lazy" decoding="async">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="addToCart(${product.id}); event.stopPropagation();" title="Add to Cart" aria-label="Add ${product.name} to cart">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                    <button class="action-btn" onclick="openQuickView(${product.id}); event.stopPropagation();" title="Quick View" aria-label="Quick view ${product.name}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="toggleWishlist(${product.id}); event.stopPropagation();" title="Add to Wishlist" aria-label="Save ${product.name} to wishlist">
                        <i class="${isWishlisted ? 'fas' : 'far'} fa-heart" style="${isWishlisted ? `color: ${GOLD};` : ''}"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title" onclick="goToProduct(${product.id})" style="cursor: pointer;">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">${product.price} L</span>
                    ${product.originalPrice ? `<span class="price-original">${product.originalPrice} L</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Navigation
function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// Shop Logic
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function loadShopProducts() {
    // Links such as shop.html?category=korean (used by the hero slides) open pre-filtered
    const requested = new URLSearchParams(window.location.search).get('category');
    const filterLinks = document.querySelectorAll('.filter-link');
    if (requested && Array.from(filterLinks).some(l => l.dataset.category === requested)) {
        shopState.category = requested;
        filterLinks.forEach(l => l.classList.toggle('active', l.dataset.category === requested));
    }
    renderShop();
}

function renderShop() {
    const container = document.getElementById('shopProducts');
    if (!container) return;
    const list = products.filter(p =>
        (shopState.category === 'all' || p.category === shopState.category) &&
        p.price <= shopState.maxPrice
    );
    if (shopState.sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (shopState.sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (shopState.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

    container.innerHTML = list.length
        ? list.map(product => createProductCard(product)).join('')
        : `<div class="empty-state"><i class="fas fa-leaf"></i><h3>Nothing here yet</h3><p>No products match these filters. Try another category or a higher price.</p></div>`;
    document.getElementById('productCount').textContent = list.length;
}

function filterProducts(category) {
    shopState.category = category;
    renderShop();
}

function filterByPrice(maxPrice) {
    shopState.maxPrice = Number(maxPrice);
    renderShop();
}

function sortProducts() {
    shopState.sort = document.getElementById('sortBy').value;
    renderShop();
}

// Search & Recommendations
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    if (term.length < 1) {
        searchResults.style.display = 'none';
        return;
    }

    const matches = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );

    if (matches.length > 0) {
        searchResults.innerHTML = `
            <div class="search-results-header">Products found (${matches.length})</div>
            ${matches.slice(0, 5).map(p => `
                <div class="search-item" onclick="goToProduct(${p.id})">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="search-item-info">
                        <div class="search-item-name">${p.name}</div>
                        <div class="search-item-price">${p.price} L</div>
                    </div>
                </div>
            `).join('')}
            ${matches.length > 5 ? `<div class="search-more">And ${matches.length - 5} more...</div>` : ''}
            <div class="search-recommendations">
                <div class="search-results-header">Recommended for you</div>
                ${getRecommendations(term).map(p => `
                    <div class="search-item" onclick="goToProduct(${p.id})">
                        <i class="fas fa-star" style="color: var(--gold-500); margin-right: 10px;"></i>
                        <div class="search-item-info">
                            <div class="search-item-name">${p.name}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = `
            <div class="search-no-results">No products found for "${term}"</div>
            <div class="search-recommendations">
                <div class="search-results-header">Try these instead</div>
                ${products.slice(0, 3).map(p => `
                    <div class="search-item" onclick="goToProduct(${p.id})">
                        <div class="search-item-info">
                            <div class="search-item-name">${p.name}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        searchResults.style.display = 'block';
    }
}

function getRecommendations(term) {
    // Simple recommendation logic: products in same category as first match
    const firstMatch = products.find(p => p.name.toLowerCase().includes(term));
    if (firstMatch) {
        return products.filter(p => p.category === firstMatch.category && p.id !== firstMatch.id).slice(0, 3);
    }
    return products.slice(0, 3);
}

// Quick View Modal
function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div id="quickViewBody"></div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
}

function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const body = document.getElementById('quickViewBody');
    body.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <span class="product-category">${product.category}</span>
                <h2 class="product-title">${product.name}</h2>
                <div class="product-price">
                    <span class="price-current">${product.price} L</span>
                    ${product.originalPrice ? `<span class="price-original">${product.originalPrice} L</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn btn-secondary" onclick="goToProduct(${product.id})">View Details</button>
            </div>
        </div>
    `;
    document.getElementById('quickViewModal').style.display = 'flex';
}

// Product Detail Page
function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (!product) {
        document.getElementById('productDetailContent').innerHTML = '<h2>Product not found</h2>';
        return;
    }

    document.title = `${product.name} | Lé Anna Company`;

    // Same-category picks first, topped up from the rest of the range
    const related = [
        ...products.filter(p => p.category === product.category && p.id !== product.id),
        ...products.filter(p => p.category !== product.category)
    ].slice(0, 4);
    
    const container = document.getElementById('productDetailContent');
    if (container) {
        container.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-detail-gallery">
                    <img src="${product.image}" alt="${product.name}" class="main-image">
                </div>
                <div class="product-detail-info">
                    <nav class="breadcrumb">
                        <a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${product.name}
                    </nav>
                    <span class="product-category">${product.category}</span>
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-price">
                        <span class="price-current">${product.price} L</span>
                        ${product.originalPrice ? `<span class="price-original">${product.originalPrice} L</span>` : ''}
                    </div>
                    <div class="product-description">
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class="product-meta">
                        <div class="meta-item"><strong>Usage:</strong> ${product.usage}</div>
                        <div class="meta-item"><strong>Ingredients:</strong> ${product.ingredients}</div>
                    </div>
                    <div class="product-actions-detail">
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                            <input type="number" value="1" min="1" class="qty-input" id="detailQty">
                            <button class="qty-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                        </div>
                        <button class="btn btn-primary btn-lg" onclick="addDetailToCart(${product.id})">Add to Cart</button>
                        <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})">
                            <i class="far fa-heart"></i> Wishlist
                        </button>
                    </div>
                </div>
            </div>
            <section class="related-products section">
                <h2 class="section-title">You May Also <em>Like</em></h2>
                <div class="products-grid">
                    ${related.map(p => createProductCard(p)).join('')}
                </div>
            </section>
        `;
    }
}

function addDetailToCart(id) {
    const qty = parseInt(document.getElementById('detailQty').value);
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty
        });
    }
    updateCartCount();
    showNotification(`${qty} ${product.name} added to cart!`, 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    const icon = { success: 'fa-circle-check', error: 'fa-circle-exclamation' }[type] || 'fa-circle-info';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Existing logic for Cart, Checkout, etc. remains same but uses expanded data...
function loadCartItems() {
    const container = document.querySelector('.cart-items');
    const summaryContainer = document.querySelector('.cart-summary');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Discover skincare, makeup and fragrance worth treasuring.</p>
                <a href="shop.html" class="btn btn-primary">Shop Now</a>
            </div>`;
        if (summaryContainer) summaryContainer.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <a href="product.html?id=${item.id}" class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </a>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.price} L</p>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">&minus;</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-total">${item.price * item.quantity} L</span>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i> Remove</button>
            </div>
        </div>
    `).join('');

    // Same delivery rule as checkout: free over 100 L, otherwise 10 L
    const subtotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    if (summaryContainer) {
        summaryContainer.style.display = 'block';
        summaryContainer.innerHTML = `
            <h3>Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>${subtotal} L</span></div>
            <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : shipping + ' L'}</span></div>
            <div class="summary-row total"><span>Total</span><span>${subtotal + shipping} L</span></div>
            <a href="checkout.html" class="btn btn-primary btn-full">Checkout</a>
        `;
    }
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
        updateCartCount();
        loadCartItems();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartCount();
    loadCartItems();
}

function handleContactForm(e) {
    e.preventDefault();
    showNotification('Message sent!', 'success');
    e.target.reset();
}

function handleCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showNotification('Order placed successfully!', 'success');
    cart = [];
    updateCartCount();
    localStorage.removeItem('leAnnaCart');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let timer;

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Auto slide; a manual choice restarts the clock so the next slide doesn't jump in early
    function restartAutoplay() {
        clearInterval(timer);
        timer = setInterval(() => showSlide(currentSlide + 1), 6000);
    }

    function goTo(n) {
        showSlide(n);
        restartAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentSlide - 1));

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goTo(idx));
    });

    restartAutoplay();
}

// Checkout Summary
function loadCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    if (!summary) return;
    
    if (cart.length === 0) {
        summary.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    const subtotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    summary.innerHTML = `
        <div class="checkout-items-mini">
            ${cart.map(item => `
                <div class="summary-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <div class="summary-item-name">${item.name}</div>
                        <div class="summary-item-meta">${item.quantity} x ${item.price} L</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${subtotal} L</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'Free' : shipping + ' L'}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>${total} L</span>
        </div>
    `;
}

function getCartTotal() {
    return cart.reduce((t, i) => t + (i.price * i.quantity), 0);
}

// --- NEW FUNCTIONALITY ---

// Wishlist Button Logic (for mobile nav and header)
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.tagName === 'A' && btn.getAttribute('href') === '#') {
            e.preventDefault();
            window.location.href = 'wishlist.html';
        }
    });
});

// Account Button Logic
const accountBtns = document.querySelectorAll('.account-btn');

function updateAccountStatus() {
    const user = localStorage.getItem('leAnnaUser');
    if (user) {
        accountBtns.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-user-check" style="color: var(--success-color);"></i>' + (btn.classList.contains('mobile-nav-item') ? '<span>Account</span>' : '');
            btn.title = `Logged in as ${user}`;
            // If logged in, the dropdown could show a logout option
            const dropdown = btn.nextElementSibling;
            if (dropdown && dropdown.classList.contains('account-dropdown')) {
                dropdown.innerHTML = `
                    <a href="account.html">My Profile</a>
                    <a href="wishlist.html">Wishlist</a>
                    <div class="divider"></div>
                    <a href="#" onclick="handleLogout(event)">Logout</a>
                `;
            }
        });
    }
}

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('leAnnaUser');
    showNotification('Logged out successfully', 'info');
    setTimeout(() => location.reload(), 1000);
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateAccountStatus();
});

// Wishlist Count Logic
function updateWishlistCount() {
    const counts = document.querySelectorAll('.wishlist-count');
    counts.forEach(c => {
        c.textContent = wishlist.length;
        c.classList.toggle('is-zero', wishlist.length === 0);
    });
}

// Header and mobile bottom-nav badges
function updateAllCounts() {
    updateCartCount();
    updateWishlistCount();
}

// Fade sections in as they scroll into view
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
}

// Update the original toggleWishlist to include count update
const originalToggleWishlist = toggleWishlist;
toggleWishlist = function(productId) {
    originalToggleWishlist(productId);
    updateWishlistCount();
};

// Update the original addToCart to include count update
const originalAddToCart = addToCart;
addToCart = function(productId) {
    originalAddToCart(productId);
    updateAllCounts();
};

// Initial calls
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    
    // Set active class on mobile bottom nav based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});


// Mobile Filter Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const shopSidebar = document.querySelector('.shop-sidebar');
    
    if (mobileFilterBtn && shopSidebar) {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        mobileFilterBtn.addEventListener('click', () => {
            shopSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });

        overlay.addEventListener('click', () => {
            shopSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });

        // Close sidebar when a filter is clicked
        const filterLinks = shopSidebar.querySelectorAll('.filter-link');
        filterLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    shopSidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
});
