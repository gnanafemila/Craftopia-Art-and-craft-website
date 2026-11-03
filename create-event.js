// ============================================================================
// CREATE EVENT PAGE - JavaScript
// Handles event creation form (uses localStorage)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!requireLogin()) {
        return;
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    const form = document.getElementById('createEventForm');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
    e.preventDefault();
    
    const message = document.getElementById('message');
    
    // Get form values
    const eventData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        category: document.getElementById('category').value,
        eventType: document.getElementById('eventType').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        maxParticipants: parseInt(document.getElementById('maxParticipants').value),
        image: document.getElementById('imageUrl').value.trim()
    };
    
    // Validate
    if (!eventData.title || !eventData.description || !eventData.category || 
        !eventData.eventType || !eventData.date || !eventData.time || 
        !eventData.location || isNaN(eventData.price) || isNaN(eventData.maxParticipants) || 
        !eventData.image) {
        showMessage('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Validate date is in future
    const selectedDate = new Date(eventData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showMessage('Event date must be in the future', 'error');
        return;
    }
    
    // Add event to localStorage
    try {
        const newEvent = addEvent(eventData);
        showMessage('Event created successfully! Redirecting...', 'success');
        
        // Reset form
        document.getElementById('createEventForm').reset();
        
        // Redirect to event detail page
        setTimeout(() => {
            window.location.href = `event-detail.html?id=${newEvent.id}`;
        }, 1500);
        
    } catch (error) {
        showMessage('Error creating event. Please try again.', 'error');
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
