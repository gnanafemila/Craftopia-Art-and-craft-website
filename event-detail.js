// ============================================================================
// EVENT DETAIL PAGE - JavaScript
// Displays full event details
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    loadEventDetail();
});

function loadEventDetail() {
    const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id') || localStorage.getItem('selectedEventId');    
    if (!eventId) {
        window.location.href = 'events.html';
        return;
    }
    
    const event = getEventById(eventId);
    
    if (!event) {
        alert('Event not found');
        window.location.href = 'events.html';
        return;
    }
    
    displayHeader(event);
    displayContent(event);
    displaySidebar(event);
}

function displayHeader(event) {
    const header = document.getElementById('eventHeader');
    header.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <span class="event-badge">${event.eventType === 'online' ? 'Online Event' : 'Offline Event'}</span>
        </div>
        <h1 class="section-title" style="margin-bottom: 1rem;">${event.title}</h1>
        <div style="display: flex; gap: 2rem; color: var(--text-secondary); margin-bottom: 2rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-user"></i>
                <span>By ${event.author}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-calendar"></i>
                <span>${formatDate(event.date)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-clock"></i>
                <span>${formatTime(event.time)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-users"></i>
                <span>${event.currentParticipants || 0}/${event.maxParticipants} registered</span>
            </div>
        </div>
    `;
}

function displayContent(event) {
    const content = document.getElementById('eventContent');
    content.innerHTML = `
        <div style="margin-bottom: 3rem;">
            <img src="${event.image}" alt="${event.title}" 
                 style="width: 100%; border-radius: 12px; margin-bottom: 2rem;">
            
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">About This Event</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">
                ${event.description}
            </p>
        </div>
        
        <div style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Event Details</h2>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px;">
                <div style="display: grid; gap: 1rem;">
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                            Date & Time
                        </div>
                        <div style="font-weight: 600;">
                            ${formatDate(event.date)} at ${formatTime(event.time)}
                        </div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                            Location
                        </div>
                        <div style="font-weight: 600;">
                            ${event.location}
                        </div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                            Category
                        </div>
                        <div style="font-weight: 600;">
                            ${event.category}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displaySidebar(event) {
    const sidebar = document.getElementById('eventSidebar');
    const spotsLeft = event.maxParticipants - (event.currentParticipants || 0);
    const isFull = spotsLeft <= 0;
    
    sidebar.innerHTML = `
        <div class="sidebar-card">
            <h3 class="sidebar-title">Price</h3>
            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary); margin-bottom: 1.5rem;">
                ₹ ${event.price}
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: var(--text-secondary);">Spots Available</span>
                    <span style="font-weight: 600;">${spotsLeft}/${event.maxParticipants}</span>
                </div>
                <div style="background: var(--bg-secondary); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: var(--primary); height: 100%; width: ${((event.currentParticipants || 0) / event.maxParticipants * 100)}%; transition: width 0.3s;"></div>
                </div>
            </div>
            
            ${isFull ? `
                <button class="btn btn-secondary" style="width: 100%;" disabled>
                    <i class="fas fa-times-circle"></i>
                    Event Full
                </button>
            ` : `
                <button class="btn btn-primary" style="width: 100%;" onclick="registerForEvent(${event.id})">
                    <i class="fas fa-check-circle"></i>
                    Register Now
                </button>
            `}
        </div>
        
        <div class="sidebar-card">
            <h3 class="sidebar-title">Share This Event</h3>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary btn-icon" title="Share on Facebook">
                    <i class="fab fa-facebook"></i>
                </button>
                <button class="btn btn-secondary btn-icon" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="btn btn-secondary btn-icon" onclick="copyLink()" title="Copy Link">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        </div>
    `;
}

function registerForEvent(eventId) {
    if (!isLoggedIn()) {
        alert('Please login to register for events');
        window.location.href = 'login.html';
        return;
    }
    
    const events = getAllEvents();
    const event = events.find(e => e.id == eventId);
    
    if (event) {
        event.currentParticipants = (event.currentParticipants || 0) + 1;
        localStorage.setItem('craftopia_events', JSON.stringify(events));
        alert('Registration successful! We will send you event details via email.');
        location.reload();
    }
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy link');
    });
}
