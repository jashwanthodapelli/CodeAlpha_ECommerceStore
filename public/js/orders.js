/* ==========================================================================
   CodeAlpha E-Commerce Store - Placed Orders History Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Direct auth guarding
  if (!checkAuthAndRedirect()) return;

  fetchOrdersHistory();
});

// Fetch order records from protected API endpoint
async function fetchOrdersHistory() {
  const container = document.getElementById('orders-page-layout');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center;"><div class="spinner" style="margin:4rem auto;"></div></div>';

  try {
    const token = getSessionToken();
    const response = await fetch('/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success && data.orders) {
      renderOrders(data.orders, container);
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <h3 class="empty-state-title">Failed to load orders</h3>
          <p class="empty-state-desc">${data.message || 'Failed to retrieve your order logs history.'}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching orders history:', error);
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3 class="empty-state-title">Connection Error</h3>
        <p class="empty-state-desc">Failed to connect to the order history records database.</p>
      </div>
    `;
  }
}

// Render dynamic invoice lists cards
function renderOrders(orders, container) {
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3 class="empty-state-title">No orders placed yet</h3>
        <p class="empty-state-desc">You haven't placed any orders with us yet. Start exploring our premium tech catalog and place your first order!</p>
        <a href="/pages/products.html" class="btn-primary" style="display:inline-block; margin-top:1.5rem; padding:0.75rem 2rem;">Shop Tech Catalog</a>
      </div>
    `;
    return;
  }

  // Header count and structure list
  const listWrapper = document.createElement('div');
  listWrapper.className = 'orders-list';

  orders.forEach(order => {
    const orderCard = document.createElement('div');
    orderCard.className = 'order-receipt-card';
    
    // Total quantity calculations
    const itemsCount = order.items.reduce((total, item) => total + item.quantity, 0);

    // Build items rows
    let itemsHTML = '';
    order.items.forEach(item => {
      itemsHTML += `
        <div class="order-card-item">
          <div class="order-item-detail">
            <div class="order-item-img">
              <img src="${item.image}" alt="${item.name}" style="height:100%; width:auto; object-fit:contain;">
            </div>
            <div>
              <div class="order-meta-value" style="font-size:1rem;">${item.name}</div>
              <span class="order-item-qty">Quantity: ${item.quantity}</span>
            </div>
          </div>
          <div class="order-item-price">₹${item.price * item.quantity}</div>
        </div>
      `;
    });

    orderCard.innerHTML = `
      <!-- Order Card Header metadata -->
      <div class="order-card-header">
        <div class="order-header-info">
          <div>
            <div class="order-meta-label">Order Number</div>
            <div class="order-meta-value" style="color:var(--primary); font-family:var(--font-display); font-weight:800;">${order.id}</div>
          </div>
          <div>
            <div class="order-meta-label">Date Placed</div>
            <div class="order-meta-value">${order.date}</div>
          </div>
          <div>
            <div class="order-meta-label">Ship To</div>
            <div class="order-meta-value">${order.customer.name}</div>
          </div>
          <div>
            <div class="order-meta-label">Total Amount Paid</div>
            <div class="order-meta-value">₹${order.total}</div>
          </div>
        </div>
        <div>
          <span class="order-status-badge">🟢 ${order.status}</span>
        </div>
      </div>

      <!-- Order items detailed rows -->
      <div class="order-card-body">
        ${itemsHTML}
      </div>
    `;
    listWrapper.appendChild(orderCard);
  });

  container.innerHTML = `
    <h2>Your Orders Log History</h2>
    <p style="color:var(--text-muted); margin-bottom:1.5rem;">Below is the complete history of purchases made on this student demo account.</p>
  `;
  container.appendChild(listWrapper);
}
