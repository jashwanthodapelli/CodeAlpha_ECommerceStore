/* ==========================================================================
   CodeAlpha E-Commerce Store - Auth Register Page Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    window.location.href = '/index.html';
    return;
  }

  setupRegisterForm();
});

// Configure dynamic validations and submit events
function setupRegisterForm() {
  const form = document.getElementById('register-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPass = document.getElementById('reg-confirm-password').value;

      if (!name || !email || !password || !confirmPass) {
        showToast('Please fill in all registration fields.', 'warning');
        return;
      }

      if (password !== confirmPass) {
        showToast('Passwords do not match.', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password should be at least 6 characters.', 'warning');
        return;
      }

      showSpinner();

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
          // Save session directly on registration
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);

          hideSpinner();
          localStorage.setItem('login_toast', `Welcome to CodeAlpha Store, ${data.user.name}!`);

          // Redirect to appropriate landing
          const isRedirectCheckout = localStorage.getItem('redirect_to_checkout');
          if (isRedirectCheckout) {
            localStorage.removeItem('redirect_to_checkout');
            window.location.href = '/pages/checkout.html';
          } else {
            window.location.href = '/index.html';
          }
        } else {
          hideSpinner();
          showToast(data.message || 'Registration failed.', 'error');
        }
      } catch (error) {
        console.error('Registration submit error:', error);
        hideSpinner();
        showToast('Server down. Please run Node locally.', 'error');
      }
    });
  }
}
