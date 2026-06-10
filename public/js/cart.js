/* ==========================================================================
   CodeAlpha E-Commerce Store - Cart Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

// Render complete shopping cart list and invoice breakdown
function renderCart() {
  const container = document.getElementById('cart-page-layout');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    renderEmptyCart(container);
    return;
  }

  // Create layout split: Cart List Left, Side Panel summary Right
  container.innerHTML = `
    <div class="cart-layout">
      <!-- Left side panel: List of items -->
      <div class="cart-items-panel">
        <div class="cart-header-title">
          <h2>Shopping Cart</h2>
          <span class="cart-count-title" id="cart-count-total">0 items</span>
        </div>
        <div id="cart-items-list">
          <!-- Render items dynamically -->
        </div>
      </div>

      <!-- Right side panel: Invoice breakdown -->
      <div class="summary-panel">
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-row">
          <span>Items Price</span>
          <span id="summary-subtotal">₹0</span>
        </div>
        <div class="summary-row">
          <span>Delivery Charge</span>
          <span id="summary-shipping">₹0</span>
        </div>
        <div class="summary-row">
          <span>GST (18%)</span>
          <span id="summary-tax">₹0</span>
        </div>
        <div class="summary-row total-row">
          <span>Total Amount</span>
          <span id="summary-total">₹0</span>
        </div>
        <button class="btn-primary" onclick="proceedToCheckout()" style="width:100%; margin-top:1.5rem; text-align:center; display:block; font-size:1.1rem; padding:0.875rem;">
          Proceed to Checkout ➔
        </button>
      </div>
    </div>
  `;

  renderCartItems(cart);
  calculateInvoiceSummary(cart);
}

// Render dynamic items lines
function renderCartItems(cart) {
  const listElement = document.getElementById('cart-items-list');
  const countTotal = document.getElementById('cart-count-total');
  
  if (!listElement) return;
  listElement.innerHTML = '';

  const totalQty = cart.reduce((tot, item) => tot + item.quantity, 0);
  if (countTotal) countTotal.textContent = `${totalQty} item${totalQty !== 1 ? 's' : ''}`;

  cart.forEach(item => {
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item';
    itemRow.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-category">${item.category}</div>
      </div>
      <div class="quantity-controller" style="margin-bottom:0; justify-content:center;">
        <button class="qty-btn" onclick="adjustItemQty('${item.id}', -1)" style="width:1.8rem; height:1.8rem; font-size:0.875rem;">-</button>
        <input type="number" class="qty-input" value="${item.quantity}" style="width:2.5rem; height:1.8rem; font-size:0.875rem;" readonly>
        <button class="qty-btn" onclick="adjustItemQty('${item.id}', 1)" style="width:1.8rem; height:1.8rem; font-size:0.875rem;">+</button>
      </div>
      <div class="cart-item-price">₹${item.price * item.quantity}</div>
      <button class="delete-cart-item" onclick="triggerDeleteCartItem('${item.id}')" title="Remove Item">🗑️</button>
    `;
    listElement.appendChild(itemRow);
  });
}

// Invoice calculation engine
function calculateInvoiceSummary(cart) {
  const subtotalElement = document.getElementById('summary-subtotal');
  const shippingElement = document.getElementById('summary-shipping');
  const taxElement = document.getElementById('summary-tax');
  const totalElement = document.getElementById('summary-total');

  if (!subtotalElement) return;

  const subtotal = cart.reduce((tot, item) => tot + (item.price * item.quantity), 0);
  
  // Custom shipping rate: Free above ₹1500, else ₹99
  const shipping = subtotal > 1500 ? 0 : 99;
  
  // Tax 18% standard included
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  subtotalElement.textContent = `₹${subtotal}`;
  shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  taxElement.textContent = `₹${tax}`;
  totalElement.textContent = `₹${total}`;
}

// Adjust item counts on keypresses
async function adjustItemQty(productId, amount) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].quantity += amount;
  
  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  await saveCart(cart);
  renderCart();
}

// Remove item entirely
async function triggerDeleteCartItem(productId) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  const name = cart[index].name;
  cart.splice(index, 1);
  
  await saveCart(cart);
  showToast(`Removed ${name} from your Cart.`, 'warning');
  renderCart();
}

// Secure redirect checkout transition
function proceedToCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;

  // Protect path: requires login
  if (!isLoggedIn()) {
    showToast('Please Login to proceed to secure Checkout.', 'warning');
    
    // Store cart redirect query details
    localStorage.setItem('redirect_to_checkout', 'true');
    
    setTimeout(() => {
      window.location.href = '/pages/login.html';
    }, 1200);
  } else {
    window.location.href = '/pages/checkout.html';
  }
}

// Render clean empty illustration panels
function renderEmptyCart(container) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">🛒</div>
      <h3 class="empty-state-title">Your Cart is empty</h3>
      <p class="empty-state-desc">You don't have any items in your shopping bag. Start browsing our cool products catalog now!</p>
      <a href="/pages/products.html" class="btn-primary" style="display:inline-block; margin-top:1.5rem; padding:0.75rem 2rem;">Shop Tech Products</a>
    </div>
  `;
}
