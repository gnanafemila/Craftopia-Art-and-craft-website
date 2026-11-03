// ============================================================================
// EVENTS PAGE - JavaScript
// Handles event listing, search, and filtering
// ============================================================================

let allEvents = [];
let filteredEvents = [];
let selectedType = 'all';
let selectedCategory = 'All';

document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    initializeSearch();
});

// Load all events
function loadEvents() {
    allEvents = getAllEvents();
    // Filter to show only upcoming events
    const today = new Date();
    allEvents = allEvents.filter(event => new Date(event.date) >= today);
    filteredEvents = allEvents;
	initializeFilters();
    displayEvents();
    updateCounts();
}

// Initialize filters
function initializeFilters() {
    // Get unique categories
    const categories = ['All', ...new Set(allEvents.map(event => event.category))];
    
    const categoryContainer = document.getElementById('categoryFilters');
    categoryContainer.innerHTML = categories.map(category => `
        <button class="filter-btn ${category === 'All' ? 'active' : ''}" 
                data-category="${category}">${category}</button>
    `).join('');
    
    // Add click handlers to category filters
    categoryContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            categoryContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.dataset.category;
            applyFilters();
        });
    });
    
    // Add click handlers to type filters
    const typeContainer = document.getElementById('typeFilters');
    typeContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            typeContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.dataset.type;
            applyFilters();
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        applyFilters();
    });
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredEvents = allEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm) ||
                            event.category.toLowerCase().includes(searchTerm);
        
const matchesType = selectedType === 'all' || event.eventType === selectedType;
const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;        
        return matchesSearch && matchesType && matchesCategory;
    });
    
    displayEvents();
    updateCounts();
}

// Display events
function displayEvents() {
    const container = document.getElementById('eventsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredEvents.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredEvents.map(event => `
    <div class="event-card">
        <img src="${event.image}" alt="${event.title}" class="event-image" loading="lazy">
        <div class="event-content">
            <span class="event-badge">${event.eventType === 'online' ? 'Online' : 'Offline
'}</span>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-info">
                <div class="event-info-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(event.date)}</span>
                </div>
                <div class="event-info-item">
                    <i class="fas fa-clock"></i>
                    <span>${formatTime(event.time)}</span>
                </div>
                <div class="event-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${truncateText(event.location, 40)}</span>
                </div>
                <div class="event-info-item">
                    <i class="fas fa-tags"></i>
                    <span>${event.category}</span>
                </div>
            </div>
            <a href="event-detail.html?id=${event.id}" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                View Details
            </a>
        </div>
    </div>
`).join('');
}

// Update counts
function updateCounts() {
    document.getElementById('resultsCount').textContent = filteredEvents.length;
}
