// ============================================================================
// REGISTER PAGE - JavaScript
// Handles registration form submission with PHP backend
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', handleRegister);
});

async function handleRegister(e) {
    e.preventDefault();
    
    const message = document.getElementById('message');
    const submitBtn = document.querySelector('button[type="submit"]');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (name.length < 2) {
        showMessage('Name must be at least 2 characters', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    
    try {
        // Send registration request to PHP
        const response = await fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user in localStorage
            localStorage.setItem('craftopia_user', JSON.stringify(data.user));
            
            showMessage(data.message || 'Registration successful! Welcome to Craftopia.', 'success');
            
            // Redirect to home
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(data.message || 'Registration failed. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('An error occurred. Using demo mode.', 'warning');
        
        // Demo fallback - use localStorage only
        const users = JSON.parse(localStorage.getItem('craftopia_users_demo') || '[]');
        
        // Check if email exists
        if (users.find(u => u.email === email)) {
            showMessage('Email already registered', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            return;
        }
        
        // Add new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In real app, this would be hashed
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('craftopia_users_demo', JSON.stringify(users));
        
        // Store user session
        const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
        localStorage.setItem('craftopia_user', JSON.stringify(userData));
        
        showMessage('Registration successful! (Demo Mode)', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `alert alert-${type}`;
    message.style.display = 'flex';
}
