// ============================================================================
// CRAFTOPIA - Core JavaScript Functions
// Handles authentication, navigation, and common utilities
// ============================================================================

// === AUTHENTICATION FUNCTIONS ===

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem('craftopia_user');
    return user !== null;
}

// Get current logged in user
function getCurrentUser() {
    const user = localStorage.getItem('craftopia_user');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('craftopia_user');
    window.location.href = 'index.html';
}

// Require login (redirect to login page if not logged in)
function requireLogin() {
    if (!isLoggedIn()) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// === USER MENU DISPLAY ===

function updateUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (!userMenu) return;
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        userMenu.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="color: var(--text-secondary);">Hi, ${user.name}</span>
                <button onclick="logout()" class="btn btn-small btn-secondary">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        `;
    } else {
        userMenu.innerHTML = `
            <div style="display: flex; gap: 0.75rem;">
                <a href="login.html" class="btn btn-small btn-secondary">Login</a>
                <a href="register.html" class="btn btn-small btn-primary">Sign Up</a>
            </div>
        `;
    }
}

// === MOBILE MENU ===

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (window.innerWidth <= 968) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--bg-secondary)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderTop = '1px solid var(--border)';
            }
        });
    }
}

// === SAMPLE DATA INITIALIZATION ===

function initializeSampleData() {
    // Initialize crafts if not exists
    if (!localStorage.getItem('craftopia_crafts')) {
        const sampleCrafts = [
            {
                id: 1,
                title: 'Paper Quilling Art',
                description: 'Create beautiful decorative designs using rolled paper strips. Perfect for beginners!',
                category: 'Paper Crafts',
                difficulty: 'Medium',
                timeRequired: '2-3 hours',
                materials: 'Colored paper strips, glue, quilling tool, cardboard base',
                instructions: '1. Cut paper into thin strips\n2. Roll strips using quilling tool\n3. Shape into desired patterns\n4. Glue pieces onto cardboard\n5. Let dry completely',
                image: 'https://i.pinimg.com/originals/28/40/77/28407765311e0e6836d9540840a3dce9.png',
                videoUrl: 'https://www.youtube.com/embed/fCi_JjPP_3w',
                likes: 45,
                views: 230,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 2,
                title: 'Macrame Wall Hanging',
                description: 'Beautiful boho-style wall decoration using macrame techniques',
                category: 'Home Decor',
                difficulty: 'Medium',
                timeRequired: '3-4 hours',
                materials: 'Cotton rope (100m), wooden dowel (30cm), scissors, measuring tape',
                instructions: '1. Cut rope into equal lengths\n2. Attach ropes to dowel using lark\'s head knot\n3. Create square knots pattern\n4. Add fringe at bottom\n5. Trim evenly',
                image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800',
                videoUrl: '',
                likes: 78,
                views: 345,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 3,
                title: 'Origami Flowers',
                description: 'Delicate paper flowers perfect for decoration or gifts',
                category: 'Paper Crafts',
                difficulty: 'Easy',
                timeRequired: '1-2 hours',
                materials: 'Origami paper, wire stems, green floral tape, scissors',
                instructions: '1. Fold paper into flower petals\n2. Assemble petals into flower shape\n3. Attach to wire stem\n4. Wrap stem with green tape\n5. Arrange in bouquet',
                image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800',
                videoUrl: 'https://www.youtube.com/embed/yCn-YTti1M0 ',
                likes: 92,
                views: 456,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 4,
                title: 'Handmade Soap Making',
                description: 'Create natural, aromatic soaps at home with essential oils',
                category: 'DIY Beauty',
                difficulty: 'Medium',
                timeRequired: '4-6 hours (plus curing time)',
                materials: 'Soap base, essential oils, soap molds, colorants, dried flowers',
                instructions: '1. Melt soap base in double boiler\n2. Add essential oils and colorants\n3. Pour into molds\n4. Add dried flowers on top\n5. Let cool for 24 hours\n6. Remove from molds and cure',
                image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
                videoUrl: '',
                likes: 67,
                views: 289,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 5,
                title: 'Resin Jewelry',
                description: 'Make stunning jewelry pieces with epoxy resin and dried flowers',
                category: 'Jewelry',
                difficulty: 'Hard',
                timeRequired: '3-4 hours (plus curing)',
                materials: 'Epoxy resin, hardener, jewelry molds, dried flowers, glitter, mixing cups',
                instructions: '1. Mix resin and hardener according to instructions\n2. Pour first layer into mold\n3. Place dried flowers\n4. Pour remaining resin\n5. Remove bubbles with heat gun\n6. Let cure for 24-48 hours',
                image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
                videoUrl: 'https://www.youtube.com/embed/Wi0ARqX7BI0',   
				likes: 134,
                views: 567,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 6,
                title: 'Knitted Scarf',
                description: 'Cozy winter scarf with classic knitting pattern for beginners',
                category: 'Knitting',
                difficulty: 'Easy',
                timeRequired: '10-12 hours',
                materials: 'Knitting needles (size 8), wool yarn (200g), scissors, tapestry needle',
                instructions: '1. Cast on 30 stitches\n2. Knit every row (garter stitch)\n3. Continue until scarf reaches desired length\n4. Cast off all stitches\n5. Weave in loose ends',
                image: 'https://throughthestitch.com/wp-content/uploads/2020/01/knit-scarf-pattern-scarf-in-brioche-stitch-scarf-knitting-pattern-1.jpg',
                videoUrl: '',
                likes: 56,
                views: 312,
                createdAt: new Date().toISOString(),
                author: 'Admin'
            }
        ];
        localStorage.setItem('craftopia_crafts', JSON.stringify(sampleCrafts));
    }
    
    // Initialize events if not exists
    if (!localStorage.getItem('craftopia_events')) {
        const sampleEvents = [
            {
                id: 1,
                title: 'Watercolor Painting Workshop',
                description: 'Learn basic watercolor techniques from professional artists. All materials provided!',
                category: 'Painting',
                eventType: 'offline',
                date: '2026-04-15',
                time: '14:00',
                location: 'Art Studio, 123 Main Street, Downtown',
                price: 45,
                maxParticipants: 20,
                currentParticipants: 8,
                image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 2,
                title: 'Online Pottery Masterclass',
                description: 'Virtual pottery class for beginners. Learn basic techniques from home!',
                category: 'Pottery',
                eventType: 'online',
                date: '2026-04-20',
                time: '18:00',
                location: 'Zoom Meeting (link sent after registration)',
                price: 30,
                maxParticipants: 50,
                currentParticipants: 15,
                image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800',
                createdAt: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: 3,
                title: 'Jewelry Making Workshop',
                description: 'Create your own unique jewelry pieces using beads, wire, and resin',
                category: 'Jewelry',
                eventType: 'offline',
                date: '2026-04-25',
                time: '10:00',
                location: 'Community Center, Room 205',
                price: 55,
                maxParticipants: 15,
                currentParticipants: 5,
                image: 'https://creativitychronicles.com/content/images/size/w1000/2023/04/jewelry-making-mat.png',
                createdAt: new Date().toISOString(),
                author: 'Admin'
            }
        ];
        localStorage.setItem('craftopia_events', JSON.stringify(sampleEvents));
    }
    
    // Initialize likes if not exists
    if (!localStorage.getItem('craftopia_likes')) {
        localStorage.setItem('craftopia_likes', JSON.stringify([]));
    }
    
    // Initialize favorites if not exists
    if (!localStorage.getItem('craftopia_favorites')) {
        localStorage.setItem('craftopia_favorites', JSON.stringify([]));
    }
}

// === CRAFT FUNCTIONS ===

// Get all crafts
function getAllCrafts() {
    const crafts = localStorage.getItem('craftopia_crafts');
    return crafts ? JSON.parse(crafts) : [];
}

// Get craft by ID
function getCraftById(id) {
    const crafts = getAllCrafts();
    return crafts.find(craft => craft.id == id);
}

// Add new craft
function addCraft(craftData) {
    const crafts = getAllCrafts();
    const newCraft = {
        id: Date.now(),
        ...craftData,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        author: getCurrentUser()?.name || 'Anonymous'
    };
    crafts.push(newCraft);
    localStorage.setItem('craftopia_crafts', JSON.stringify(crafts));
    return newCraft;
}

// Toggle like on craft
function toggleLike(craftId) {
    if (!isLoggedIn()) {
        alert('Please login to like crafts');
        return false;
    }
    
    const likes = JSON.parse(localStorage.getItem('craftopia_likes') || '[]');
    const index = likes.indexOf(craftId);
    
    if (index > -1) {
        likes.splice(index, 1);
    } else {
        likes.push(craftId);
    }
    
    localStorage.setItem('craftopia_likes', JSON.stringify(likes));
    
    // Update craft likes count
    const crafts = getAllCrafts();
    const craft = crafts.find(c => c.id == craftId);
    if (craft) {
        craft.likes = index > -1 ? craft.likes - 1 : craft.likes + 1;
        localStorage.setItem('craftopia_crafts', JSON.stringify(crafts));
    }
    
    return true;
}

// Check if craft is liked
function isLiked(craftId) {
    const likes = JSON.parse(localStorage.getItem('craftopia_likes') || '[]');
    return likes.includes(craftId);
}

// Toggle favorite on craft
function toggleFavorite(craftId) {
    if (!isLoggedIn()) {
        alert('Please login to save favorites');
        return false;
    }
    
    const favorites = JSON.parse(localStorage.getItem('craftopia_favorites') || '[]');
    const index = favorites.indexOf(craftId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(craftId);
    }
    
    localStorage.setItem('craftopia_favorites', JSON.stringify(favorites));
    return true;
}

// Check if craft is favorited
function isFavorited(craftId) {
    const favorites = JSON.parse(localStorage.getItem('craftopia_favorites') || '[]');
    return favorites.includes(craftId);
}

// === EVENT FUNCTIONS ===

// Get all events
function getAllEvents() {
    const events = localStorage.getItem('craftopia_events');
    return events ? JSON.parse(events) : [];
}

// Get event by ID
function getEventById(id) {
    const events = getAllEvents();
    return events.find(event => event.id == id);
}

// Add new event
function addEvent(eventData) {
    const events = getAllEvents();
    const newEvent = {
        id: Date.now(),
        ...eventData,
        currentParticipants: 0,
        createdAt: new Date().toISOString(),
        author: getCurrentUser()?.name || 'Anonymous'
    };
    events.push(newEvent);
    localStorage.setItem('craftopia_events', JSON.stringify(events));
    return newEvent;
}

// === UTILITY FUNCTIONS ===

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
function renderHomePage() {
    // Featured Crafts (most liked)
    const craftsContainer = document.getElementById('featuredCrafts');
    if (craftsContainer) {
        const crafts = getAllCrafts().sort((a, b) => b.likes - a.likes).slice(0, 4);
        craftsContainer.innerHTML = crafts.map(c => `
            <div class="craft-card" onclick="openCraftDetail('${c.id}')">
                <img src="${c.image}" alt="${c.title}">
                <div class="craft-info">
                    <h3>${c.title}</h3>
                    <p>${truncateText(c.description, 80)}</p>
                    <div class="craft-meta">
                        <span><i class="fas fa-heart"></i> ${c.likes}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Upcoming Events (or you can sort by any metric)
    const eventsContainer = document.getElementById('upcomingEvents');
    if (eventsContainer) {
        const events = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
        eventsContainer.innerHTML = events.map(e => `
            <div class="event-card" onclick="openEventDetail('${e.id}')">
                <img src="${e.image}" alt="${e.title}">
                <div class="event-info">
                    <h3>${e.title}</h3>
                    <p>${truncateText(e.description, 80)}</p>
                    <div class="event-meta">
                        <span>${formatDate(e.date)} ${e.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
function openCraftDetail(id) {
    window.location.href = `craft-detail.html?id=${id}`;
}
function openEventDetail(id) {
    localStorage.setItem('selectedEventId', id);
    window.location.href = 'event-detail.html';
}
// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data
    initializeSampleData();
    
    // Update user menu
    updateUserMenu();
    
    // Initialize mobile menu
    initMobileMenu();
	renderHomePage();

});
// ======================
// HOMEPAGE RENDERING
// ======================

 