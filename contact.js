// ============================================================================
// CONTACT PAGE - JavaScript
// Handles contact form submission (uses localStorage)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
    e.preventDefault();
    
    const message = document.getElementById('message');
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('messageText').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Save to localStorage (in real app, would send to server)
    try {
        const messages = JSON.parse(localStorage.getItem('craftopia_messages') || '[]');
        messages.push(formData);
        localStorage.setItem('craftopia_messages', JSON.stringify(messages));
        
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
    } catch (error) {
        showMessage('Error sending message. Please try again.', 'error');
        console.error(error);
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `alert alert-${type}`;
    message.style.display = 'flex';
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}
