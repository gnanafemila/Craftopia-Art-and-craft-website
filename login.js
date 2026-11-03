// ============================================================================
// LOGIN PAGE - JavaScript
// Handles login form submission with PHP backend
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', handleLogin);
});

async function handleLogin(e) {
    e.preventDefault();
    
    const message = document.getElementById('message');
    const submitBtn = document.querySelector('button[type="submit"]');
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    try {
        // Send login request to PHP
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user in localStorage
            localStorage.setItem('craftopia_user', JSON.stringify(data.user));
            
            showMessage(data.message || 'Login successful!', 'success');
            
            // Redirect to home
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage(data.message || 'Login failed. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('An error occurred. Using demo mode.', 'warning');
        
        // Demo fallback - use localStorage only
        const users = JSON.parse(localStorage.getItem('craftopia_users_demo') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const userData = { id: user.id, name: user.name, email: user.email };
            localStorage.setItem('craftopia_user', JSON.stringify(userData));
            showMessage('Login successful! (Demo Mode)', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage('Invalid email or password', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `alert alert-${type}`;
    message.style.display = 'flex';
}
