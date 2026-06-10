/* ==========================================================================
   CodeAlpha E-Commerce Store - Auth Login Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect away
  if (isLoggedIn()) {
    window.location.href = '/index.html';
    return;
  }

  setupLoginForm();
});

// Configure submit events and click fill helper
function setupLoginForm() {
  const form = document.getElementById('login-form');
  const autofillBtn = document.getElementById('autofill-demo-btn');

  if (autofillBtn) {
    autofillBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');

      if (emailInput && passInput) {
        emailInput.value = 'student@example.com';
        passInput.value = 'student123';
        showToast('Demo Credentials Auto-filled!', 'info');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        showToast('Please fill in all credentials fields.', 'warning');
        return;
      }

      showSpinner();

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
          // Save session
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);

          // Fetch matching cart from server database if available
          await fetchUserCartFromServer();

          hideSpinner();
          localStorage.setItem('login_toast', `Welcome back, ${data.user.name}!`);

          // Redirect to appropriate landing pages
          const isRedirectCheckout = localStorage.getItem('redirect_to_checkout');
          if (isRedirectCheckout) {
            localStorage.removeItem('redirect_to_checkout');
            window.location.href = '/pages/checkout.html';
          } else {
            window.location.href = '/index.html';
          }
        } else {
          hideSpinner();
          showToast(data.message || 'Login failed. Please check inputs.', 'error');
        }
      } catch (error) {
        console.error('Login submit error:', error);
        hideSpinner();
        showToast('Server down. Please run Node locally.', 'error');
      }
    });
  }
}
