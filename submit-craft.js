// ============================================================================
// SUBMIT CRAFT PAGE - JavaScript
// Handles craft submission form (uses localStorage)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!requireLogin()) {
        return;
    }
    
    const form = document.getElementById('submitCraftForm');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
    e.preventDefault();
    
    const message = document.getElementById('message');
    
    // Get form values
    const craftData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        category: document.getElementById('category').value,
        difficulty: document.getElementById('difficulty').value,
        timeRequired: document.getElementById('timeRequired').value.trim(),
        materials: document.getElementById('materials').value.trim(),
        instructions: document.getElementById('instructions').value.trim(),
        image: document.getElementById('imageUrl').value.trim(),
        videoUrl: document.getElementById('videoUrl').value.trim()
    };
    
    // Validate
    if (!craftData.title || !craftData.description || !craftData.category || 
        !craftData.difficulty || !craftData.timeRequired || !craftData.materials || 
        !craftData.instructions || !craftData.image) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Add craft to localStorage
    try {
        const newCraft = addCraft(craftData);
        showMessage('Craft submitted successfully! Redirecting...', 'success');
        
        // Reset form
        document.getElementById('submitCraftForm').reset();
        
        // Redirect to craft detail page
        setTimeout(() => {
            window.location.href = `craft-detail.html?id=${newCraft.id}`;
        }, 1500);
        
    } catch (error) {
        showMessage('Error submitting craft. Please try again.', 'error');
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
    
    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    }
}
