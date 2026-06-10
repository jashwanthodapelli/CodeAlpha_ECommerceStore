/* ==========================================================================
   CodeAlpha E-Commerce Store - Product Details Page Orchestration
   ========================================================================== */

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    fetchProductDetails(productId);
  } else {
    showErrorState('No product ID specified.');
  }
});

// Fetch detailed metadata from backend
async function fetchProductDetails(id) {
  showSpinner();
  try {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();

    if (data.success && data.product) {
      currentProduct = data.product;
      renderProductDetails(data.product);
    } else {
      showErrorState(data.message || 'Product details not found.');
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    showErrorState('Connection error. Failed to retrieve product details.');
  } finally {
    hideSpinner();
  }
}

// Render dynamic visual grids for the single product details
function renderProductDetails(product) {
  const detailsContainer = document.getElementById('product-details-container');
  if (!detailsContainer) return;

  detailsContainer.innerHTML = `
    <div class="details-grid">
      <!-- Left side image -->
      <div class="details-image-panel">
        <img src="${product.image}" alt="${product.name}" id="details-img">
      </div>
      
      <!-- Right side textual details -->
      <div class="details-info-panel">
        <span class="details-category">${product.category}</span>
        <h1 class="details-title">${product.name}</h1>
        <div class="details-price">₹${product.price}</div>
        <p class="details-desc">${product.description}</p>
        
        <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; margin-top:auto;">
          <h4 style="margin-bottom:0.75rem;">Select Quantity:</h4>
          <div class="quantity-controller">
            <button class="qty-btn" onclick="adjustDetailsQty(-1)">-</button>
            <input type="number" id="details-qty" class="qty-input" value="1" min="1" readonly>
            <button class="qty-btn" onclick="adjustDetailsQty(1)">+</button>
          </div>
          
          <div class="action-row">
            <button class="btn-primary" onclick="handleAddCartClick()" style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; font-size:1.1rem; padding:0.875rem 1.5rem;">
              <span>🛒</span> Add To Cart
            </button>
            <a href="/pages/products.html" class="btn-outline" style="text-align:center;">
              Back to Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Interactive increments/decrements inputs
function adjustDetailsQty(amount) {
  const qtyInput = document.getElementById('details-qty');
  if (!qtyInput) return;

  let currentVal = Number(qtyInput.value);
  currentVal += amount;

  if (currentVal < 1) currentVal = 1;
  qtyInput.value = currentVal;
}

// Send selected items and quantity details directly to local cart store
async function handleAddCartClick() {
  if (!currentProduct) return;
  
  const qtyInput = document.getElementById('details-qty');
  const quantity = qtyInput ? Number(qtyInput.value) : 1;

  showSpinner();
  await addToCart(currentProduct, quantity);
  hideSpinner();
}

// Handle rendering error panels nicely
function showErrorState(message) {
  const detailsContainer = document.getElementById('product-details-container');
  if (!detailsContainer) return;

  detailsContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">⚠️</div>
      <h3 class="empty-state-title">Unable to view product</h3>
      <p class="empty-state-desc">${message}</p>
      <a href="/pages/products.html" class="btn-primary" style="display:inline-block; margin-top:1.5rem;">Back to Catalog</a>
    </div>
  `;
}
