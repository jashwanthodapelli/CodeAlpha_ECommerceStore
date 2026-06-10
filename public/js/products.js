/* ==========================================================================
   CodeAlpha E-Commerce Store - Products Catalog Page Orchestration
   ========================================================================== */

let activeCategory = 'All';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParameters();
  setupSearchInput();
  setupCategoryButtons();
  fetchCatalog();
});

// Check if category filters were passed in the URL (e.g. from Home page clicks)
function parseUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  if (categoryParam) {
    activeCategory = categoryParam;
    
    // Highlight correct filter button initially
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-category').toLowerCase() === activeCategory.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// Fetch products based on category and search query parameters
async function fetchCatalog() {
  const gridContainer = document.getElementById('catalog-products-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '<div style="grid-column: 1/-1; text-align:center;"><div class="spinner" style="margin:2rem auto;"></div></div>';

  try {
    let url = `/api/products?category=${encodeURIComponent(activeCategory)}`;
    if (searchQuery.trim()) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.success && data.products) {
      renderCatalog(data.products, gridContainer);
    } else {
      gridContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><p class="empty-state-title">Failed to load catalog products.</p></div>';
    }
  } catch (error) {
    console.error('Catalog fetch error:', error);
    gridContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><p class="empty-state-title">Error connecting to database.</p></div>';
  }
}

// Render HTML layout for product grid
function renderCatalog(products, container) {
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No products found</h3>
        <p class="empty-state-desc">We couldn't find anything matching your filters. Try adjusting your search query.</p>
        <button onclick="resetFilters()" class="btn-primary" style="padding:0.5rem 1.5rem; margin-top:1rem;">Reset Filters</button>
      </div>
    `;
    return;
  }

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
        <a href="product-details.html?id=${product.id}" class="product-details-link">
          View Details
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Attach debounced keystrokes listeners on the catalog search box
function setupSearchInput() {
  const searchInput = document.getElementById('catalog-search');
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value;
      fetchCatalog();
    }, 400); // 400ms debounce
  });
}

// Attach listeners to sidebar categories
function setupCategoryButtons() {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      fetchCatalog();
    });
  });
}

// Global actions triggers
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
    console.error('Error adding product:', error);
    showToast('Network error adding product.', 'error');
  } finally {
    hideSpinner();
  }
}

// Reset filters hook
function resetFilters() {
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) searchInput.value = '';
  searchQuery = '';
  
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(b => b.classList.remove('active'));
  
  const allBtn = document.querySelector('.category-btn[data-category="All"]');
  if (allBtn) allBtn.classList.add('active');
  
  activeCategory = 'All';
  fetchCatalog();
}
