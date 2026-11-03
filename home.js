// ============================================================================
// TUTORIALS PAGE - JavaScript
// Handles craft listing, search, and filtering
// ============================================================================

let allCrafts = [];
let filteredCrafts = [];
let selectedCategory = 'All';
let selectedDifficulty = 'All';

document.addEventListener('DOMContentLoaded', function() {
    loadCrafts();
    initializeFilters();
    initializeSearch();
});

// Load all crafts
function loadCrafts() {
    allCrafts = getAllCrafts();
    filteredCrafts = allCrafts;
    displayCrafts();
    updateCounts();
}

// Initialize category filters
function initializeFilters() {
    // Get unique categories
    const categories = ['All', ...new Set(allCrafts.map(craft => craft.category))];
    
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
    
    // Add click handlers to difficulty filters
    const difficultyContainer = document.getElementById('difficultyFilters');
    difficultyContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            difficultyContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedDifficulty = this.dataset.difficulty;
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
    
    filteredCrafts = allCrafts.filter(craft => {
        const matchesSearch = craft.title.toLowerCase().includes(searchTerm) ||
                            craft.description.toLowerCase().includes(searchTerm) ||
                            craft.category.toLowerCase().includes(searchTerm);
        
        const matchesCategory = selectedCategory === 'All' || craft.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'All' || craft.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    displayCrafts();
    updateCounts();
}

// Display crafts
function displayCrafts() {
    const container = document.getElementById('craftsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredCrafts.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredCrafts.map(craft => `
        <div class="craft-card">
            <img src="${craft.image}" alt="${craft.title}" class="craft-image" loading="lazy">
            <div class="craft-content">
                <span class="craft-category">${craft.category}</span>
                <h3 class="craft-title">${craft.title}</h3>
                <p class="craft-description">${truncateText(craft.description, 100)}</p>
                <div class="craft-meta">
                    <div class="craft-stats">
                        <span class="craft-stat">
                            <i class="fas fa-heart"></i>
                            ${craft.likes || 0}
                        </span>
                        <span class="craft-stat">
                            <i class="fas fa-eye"></i>
                            ${craft.views || 0}
                        </span>
                    </div>
                    <div class="craft-actions">
                        <button class="icon-btn ${isLiked(craft.id) ? 'active' : ''}" 
                                onclick="handleLike(${craft.id})" 
                                title="Like">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="icon-btn ${isFavorited(craft.id) ? 'active' : ''}" 
                                onclick="handleFavorite(${craft.id})" 
                                title="Save">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <a href="craft-detail.html?id=${craft.id}" class="icon-btn" title="View">
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Update counts
function updateCounts() {
    document.getElementById('totalCrafts').textContent = allCrafts.length;
    document.getElementById('resultsCount').textContent = filteredCrafts.length;
}

// Handle like
function handleLike(craftId) {
    if (toggleLike(craftId)) {
        loadCrafts();
        applyFilters();
    }
}

// Handle favorite
function handleFavorite(craftId) {
    if (toggleFavorite(craftId)) {
        displayCrafts();
    }
}
