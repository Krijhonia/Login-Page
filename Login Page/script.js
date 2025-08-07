document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const errorElement = document.getElementById('error-message');
    const btnLogin = document.querySelector('.btn-login');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Password Visibility Toggle
    togglePassword.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get values
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Reset error
        hideError();
        
        // Validate
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Simulate API call
        setTimeout(() => {
            if (email === 'test@example.com' && password === '123456') {
                // Success
                loginSuccess();
            } else {
                // Error
                hideLoading();
                showError('Invalid email or password');
            }
        }, 1500);
    });
    
    // Helper Functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }
    
    function hideError() {
        errorElement.classList.remove('show');
    }
    
    function showLoading() {
        btnText.style.opacity = '0';
        btnLoader.style.opacity = '1';
        btnLogin.disabled = true;
    }
    
    function hideLoading() {
        btnText.style.opacity = '1';
        btnLoader.style.opacity = '0';
        btnLogin.disabled = false;
    }
    
    function loginSuccess() {
        btnLogin.innerHTML = '<i class="fas fa-check"></i>';
        btnLogin.style.background = '#10b981';
        
        setTimeout(() => {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1000);
    }
    
    // Social Login Buttons (example functionality)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 
                          this.classList.contains('apple') ? 'Apple' : 'GitHub';
            alert(`Redirecting to ${platform} login...`);
        });
    });
});