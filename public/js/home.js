/* ==========================================================================
   CodeAlpha E-Commerce Store - Home Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  fetchFeaturedProducts();
  setupCategoryLinks();
});

// Load featured products on home page load
async function fetchFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products-container');
  if (!featuredContainer) return;

  try {
    const response = await fetch('/api/products');
    const data = await response.json();

    if (data.success && data.products) {
      // Pick first 4 products to feature
      const featuredList = data.products.slice(0, 4);
      renderFeaturedProducts(featuredList, featuredContainer);
    } else {
      featuredContainer.innerHTML = '<p class="error-msg">Failed to load featured products.</p>';
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
    featuredContainer.innerHTML = '<p class="error-msg">Error connecting to the catalog server.</p>';
  }
}

// Render HTML layout for each card
function renderFeaturedProducts(products, container) {
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-badge">${product.category}</div>
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-card-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">₹${product.price}</span>
          <button class="product-action-btn" onclick="triggerAddToCart('${product.id}')" title="Add to Cart">
            🛒
          </button>
        </div>
        <a href="/pages/product-details.html?id=${product.id}" class="product-details-link">
          View Details
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Global hook for triggering adding items to cart from cards
async function triggerAddToCart(productId) {
  showSpinner();
  try {
    const response = await fetch(`/api/product/${productId}`);
    const data = await response.json();
    
    if (data.success && data.product) {
      await addToCart(data.product, 1);
    } else {
      showToast('Could not add product to cart.', 'error');
    }
  } catch (error) {
    console.error('Error in triggerAddToCart:', error);
    showToast('Network error adding product.', 'error');
  } finally {
    hideSpinner();
  }
}

// Handle clicking categories to redirect to filter in catalogue
function setupCategoryLinks() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      window.location.href = `/pages/products.html?category=${encodeURIComponent(category)}`;
    });
  });
}
