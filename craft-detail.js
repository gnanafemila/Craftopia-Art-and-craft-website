// ============================================================================
// CRAFT DETAIL PAGE - JavaScript
// Displays full craft tutorial details
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    loadCraftDetail();
});

function loadCraftDetail() {
    // Get craft ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const craftId = urlParams.get('id');
    
    if (!craftId) {
        window.location.href = 'tutorials.html';
        return;
    }
    
    const craft = getCraftById(craftId);
    
    if (!craft) {
        alert('Craft not found');
        window.location.href = 'tutorials.html';
        return;
    }
    
    // Increment view count
    incrementViews(craftId);
    
    // Display craft header
    displayHeader(craft);
    
    // Display craft content
    displayContent(craft);
    
    // Display sidebar
    displaySidebar(craft);
}

function incrementViews(craftId) {
    const crafts = getAllCrafts();
    const craft = crafts.find(c => c.id == craftId);
    if (craft) {
        craft.views = (craft.views || 0) + 1;
        localStorage.setItem('craftopia_crafts', JSON.stringify(crafts));
    }
}

function displayHeader(craft) {
    const header = document.getElementById('craftHeader');
    header.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <span class="craft-category">${craft.category}</span>
        </div>
        <h1 class="section-title" style="margin-bottom: 1rem;">${craft.title}</h1>
        <div style="display: flex; gap: 2rem; color: var(--text-secondary); margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-user"></i>
                <span>By ${craft.author}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-calendar"></i>
                <span>${formatDate(craft.createdAt)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-heart"></i>
                <span>${craft.likes || 0} likes</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-eye"></i>
                <span>${craft.views || 0} views</span>
            </div>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button class="btn ${isLiked(craft.id) ? 'btn-primary' : 'btn-secondary'}" 
                    onclick="handleLike(${craft.id})" id="likeBtn">
                <i class="fas fa-heart"></i>
                ${isLiked(craft.id) ? 'Liked' : 'Like'}
            </button>
            <button class="btn ${isFavorited(craft.id) ? 'btn-primary' : 'btn-secondary'}" 
                    onclick="handleFavorite(${craft.id})" id="favoriteBtn">
                <i class="fas fa-bookmark"></i>
                ${isFavorited(craft.id) ? 'Saved' : 'Save'}
            </button>
        </div>
    `;
}

function displayContent(craft) {
    const content = document.getElementById('craftContent');
    content.innerHTML = `
        <div style="margin-bottom: 3rem;">
            <img src="${craft.image}" alt="${craft.title}" 
                 style="width: 100%; border-radius: 12px; margin-bottom: 2rem;">
            
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Description</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">
                ${craft.description}
            </p>
        </div>
        
        ${craft.videoUrl ? `
        <div style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Video Tutorial</h2>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
                <iframe src="${craft.videoUrl}" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                        allowfullscreen></iframe>
            </div>
        </div>
        ` : ''}
        
        <div style="margin-bottom: 3rem;">
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Materials Needed</h2>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px;">
                <p style="color: var(--text-secondary); line-height: 1.8; white-space: pre-line;">
                    ${craft.materials}
                </p>
            </div>
        </div>
        
        <div>
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Step-by-Step Instructions</h2>
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px;">
                <p style="color: var(--text-secondary); line-height: 1.8; white-space: pre-line;">
                    ${craft.instructions}
                </p>
            </div>
        </div>
    `;
}

function displaySidebar(craft) {
    const sidebar = document.getElementById('craftSidebar');
    sidebar.innerHTML = `
        <div class="sidebar-card">
            <h3 class="sidebar-title">Craft Details</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                        Difficulty Level
                    </div>
                    <div style="display: inline-block; padding: 0.5rem 1rem; background: var(--primary); color: white; border-radius: 8px; font-weight: 600;">
                        ${craft.difficulty}
                    </div>
                </div>
                <div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                        Time Required
                    </div>
                    <div style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-clock" style="color: var(--primary);"></i>
                        ${craft.timeRequired}
                    </div>
                </div>
                <div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">
                        Category
                    </div>
                    <div style="font-weight: 600;">
                        ${craft.category}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="sidebar-card">
            <h3 class="sidebar-title">Share This Craft</h3>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary btn-icon" title="Share on Facebook">
                    <i class="fab fa-facebook"></i>
                </button>
                <button class="btn btn-secondary btn-icon" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="btn btn-secondary btn-icon" title="Share on Pinterest">
                    <i class="fab fa-pinterest"></i>
                </button>
                <button class="btn btn-secondary btn-icon" onclick="copyLink()" title="Copy Link">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        </div>
    `;
}

function handleLike(craftId) {
    if (toggleLike(craftId)) {
        location.reload();
    }
}

function handleFavorite(craftId) {
    if (toggleFavorite(craftId)) {
        const btn = document.getElementById('favoriteBtn');
        const isFav = isFavorited(craftId);
        btn.className = `btn ${isFav ? 'btn-primary' : 'btn-secondary'}`;
        btn.innerHTML = `
            <i class="fas fa-bookmark"></i>
            ${isFav ? 'Saved' : 'Save'}
        `;
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
