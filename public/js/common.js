/* ==========================================================================
   CodeAlpha E-Commerce Store - Common Utility and UI Injections
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inject spinner, toast containers and lay out HTML
  setupUtilityContainers();
  injectNavbar();
  injectFooter();
  updateCartBadge();
});

// Setup toast container and loader globally
function setupUtilityContainers() {
  // Spinner overlay
  if (!document.getElementById('loading-overlay')) {
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
  }

  // Toast notifications wrapper
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

// Show global loading indicator
function showSpinner() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.add('active');
}

// Hide global loading indicator
function hideSpinner() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('active');
}

// Toast Alert System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Set alert symbols/icons
  let icon = '🔔';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'warning') icon = '⚠️';
  if (type === 'info') icon = 'ℹ️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Automatic remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Authentication Helpers
function getSessionUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function getSessionToken() {
  return localStorage.getItem('token');
}

function isLoggedIn() {
  return !!getSessionToken();
}

// Redirect if unauthenticated
function checkAuthAndRedirect() {
  if (!isLoggedIn()) {
    showToast('Please login to continue to Checkout.', 'warning');
    setTimeout(() => {
      window.location.href = '/pages/login.html';
    }, 1500);
    return false;
  }
  return true;
}

// Synchronize Navbar dynamically based on auth state
function injectNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const user = getSessionUser();
  const loggedIn = isLoggedIn();

  placeholder.innerHTML = `
    <div class="header-wrapper">
      <div class="container navbar">
        <a href="/index.html" class="brand-logo">
          CodeAlpha<span>Store</span>
        </a>
        <nav class="nav-links">
          <a href="/index.html" class="nav-link" id="nav-home">Home</a>
          <a href="/pages/products.html" class="nav-link" id="nav-products">Products</a>
          <a href="/pages/cart.html" class="nav-link cart-icon-wrapper" id="nav-cart">
            Cart
            <span class="cart-badge" id="cart-badge-count">0</span>
          </a>
          ${loggedIn ? `
            <a href="/pages/orders.html" class="nav-link" id="nav-orders">Orders</a>
            <span style="color: var(--text-muted); font-size: 0.875rem; font-weight:600;">Hi, ${user.name.split(' ')[0]}</span>
            <button onclick="handleLogout()" class="auth-btn" style="background-color: var(--danger); font-size:0.875rem;">Logout</button>
          ` : `
            <a href="/pages/login.html" class="nav-link" id="nav-login">Login</a>
            <a href="/pages/register.html" class="auth-btn" id="nav-register">Register</a>
          `}
        </nav>
      </div>
    </div>
  `;

  // Highlight active page
  setActiveNavLink(window.location.pathname.includes('/pages/'));
}

// Highlight navbar links matching current active pathname
function setActiveNavLink(isSubpage) {
  const path = window.location.pathname;
  let activeId = 'nav-home';

  if (path.includes('products.html')) activeId = 'nav-products';
  else if (path.includes('product-details.html')) activeId = 'nav-products';
  else if (path.includes('cart.html')) activeId = 'nav-cart';
  else if (path.includes('orders.html')) activeId = 'nav-orders';
  else if (path.includes('login.html')) activeId = 'nav-login';
  else if (path.includes('register.html')) activeId = 'nav-register';
  else if (path.includes('checkout.html')) activeId = 'nav-cart';

  const activeLink = document.getElementById(activeId);
  if (activeLink) activeLink.classList.add('active');
}

// Inject standard Footer markup dynamically
function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <div class="footer-logo">CodeAlpha<span>Store</span></div>
          <p class="footer-desc">
            A premium full-stack showcase project submission built for the CodeAlpha Web Development Internship. Implements complete student-focused features.
          </p>
        </div>
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <div class="footer-links">
            <a href="/index.html" class="footer-link">Home</a>
            <a href="/pages/products.html" class="footer-link">All Products</a>
            <a href="/pages/cart.html" class="footer-link">Shopping Cart</a>
          </div>
        </div>
        <div>
          <h4 class="footer-heading">Developer Credentials</h4>
          <p class="footer-desc" style="margin-bottom:0.5rem;">CodeAlpha Intern</p>
          <p class="footer-desc">Email: student@example.com</p>
        </div>
        <div>
          <h4 class="footer-heading">Built With</h4>
          <div class="footer-links">
            <span class="footer-link">HTML5 & CSS Grid</span>
            <span class="footer-link">Vanilla JavaScript</span>
            <span class="footer-link">Express.js Backend</span>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 CodeAlpha_ECommerceStore. Created for Internship Showcase.</p>
        <p>Verified Student Project Submission ✅</p>
      </div>
    </footer>
  `;
}

// Handle session removal and logouts
function handleLogout() {
  showSpinner();
  setTimeout(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Clear cart state locally
    hideSpinner();
    
    // Set temp logout flag to show toast after redirect
    localStorage.setItem('logout_toast', 'Logged out successfully. See you again!');
    window.location.href = '/index.html';
  }, 800);
}

// Show redirect toasts if set
window.addEventListener('load', () => {
  const toastMsg = localStorage.getItem('logout_toast');
  if (toastMsg) {
    showToast(toastMsg, 'info');
    localStorage.removeItem('logout_toast');
  }
  const loginToast = localStorage.getItem('login_toast');
  if (loginToast) {
    showToast(loginToast, 'success');
    localStorage.removeItem('login_toast');
  }
});

/* ==========================================================================
   CART OPERATIONS UTILITY functions
   ========================================================================== */
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Sync cart data to local storage and backend if authenticated
async function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();

  // If user is logged in, sync with backend API
  if (isLoggedIn()) {
    try {
      const token = getSessionToken();
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cart })
      });
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
    }
  }
}

// Fetch user's cart from backend on login
async function fetchUserCartFromServer() {
  if (isLoggedIn()) {
    try {
      const token = getSessionToken();
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success && data.cart) {
        localStorage.setItem('cart', JSON.stringify(data.cart));
        updateCartBadge();
      }
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    }
  }
}

// Add item to cart
async function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += Number(quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: Number(quantity)
    });
  }

  await saveCart(cart);
  showToast(`Added ${product.name} to Shopping Cart!`, 'success');
}

// Update cart counter in the header badge
function updateCartBadge() {
  const badge = document.getElementById('cart-badge-count');
  if (!badge) return;

  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  badge.textContent = count;
}
