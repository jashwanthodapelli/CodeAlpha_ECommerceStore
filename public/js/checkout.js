/* ==========================================================================
   CodeAlpha E-Commerce Store - Secure Checkout Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Direct auth guarding
  if (!checkAuthAndRedirect()) return;

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your Cart is empty. Please add products first.', 'warning');
    setTimeout(() => {
      window.location.href = '/pages/products.html';
    }, 1200);
    return;
  }

  autofillCustomerDetails();
  renderCheckoutSummary(cart);
  setupCheckoutForm(cart);
});

// Auto fill user details in input fields initially for optimal experience
function autofillCustomerDetails() {
  const user = getSessionUser();
  if (!user) return;

  const nameInput = document.getElementById('checkout-name');
  const emailInput = document.getElementById('checkout-email');

  if (nameInput) nameInput.value = user.name;
  if (emailInput) emailInput.value = user.email;
}

// Render dynamic invoice total breakdown on sidebar
function renderCheckoutSummary(cart) {
  const container = document.getElementById('checkout-items-summary');
  const totalCostElement = document.getElementById('checkout-total-price');

  if (!container || !totalCostElement) return;

  container.innerHTML = '';

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.style.fontSize = '0.9rem';
    row.style.marginBottom = '0.5rem';
    row.innerHTML = `
      <span>${item.name} <strong style="color:var(--primary);">x${item.quantity}</strong></span>
      <span>₹${item.price * item.quantity}</span>
    `;
    container.appendChild(row);
  });

  const shipping = subtotal > 1500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  totalCostElement.textContent = `₹${total}`;
}

// Configure form checkout submit handlers
function setupCheckoutForm(cart) {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const paymentMethod = document.getElementById('checkout-payment').value;

    if (!name || !email || !address || !phone || !paymentMethod) {
      showToast('Please fill in all shipping details.', 'warning');
      return;
    }

    const subtotal = cart.reduce((tot, item) => tot + (item.price * item.quantity), 0);
    const shipping = subtotal > 1500 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    showSpinner();

    try {
      const token = getSessionToken();
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          address,
          phone,
          paymentMethod,
          items: cart,
          total
        })
      });

      const data = await response.json();

      if (data.success && data.orderId) {
        // Clear local storage cart state
        localStorage.removeItem('cart');
        
        // Synchronize empty cart with server
        try {
          await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ cart: [] })
          });
        } catch (err) {
          console.error('Cart sync error on checkout:', err);
        }

        updateCartBadge();
        hideSpinner();

        // Reveal order success modal overlay
        showSuccessModal(data.orderId);
      } else {
        hideSpinner();
        showToast(data.message || 'Checkout failed. Please review fields.', 'error');
      }
    } catch (error) {
      console.error('Checkout API error:', error);
      hideSpinner();
      showToast('Connection error during order placement.', 'error');
    }
  });
}

// Display order placed success visual overlay
function showSuccessModal(orderId) {
  const modalOverlay = document.getElementById('success-modal-overlay');
  const orderNumElement = document.getElementById('success-order-id');

  if (orderNumElement) orderNumElement.textContent = orderId;
  if (modalOverlay) {
    modalOverlay.classList.add('active');
  }
}

// Redirect modal triggers
function closeSuccessModalAndRedirect() {
  const modalOverlay = document.getElementById('success-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
  window.location.href = '/pages/orders.html';
}
