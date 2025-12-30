// Header Search Functionality - Inline Version
(function() {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container-header');
    const searchInput = document.getElementById('search-input');
    const closeSearch = document.getElementById('close-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchToggle || !searchInput) return;
    
    let allPosts = [];
    
    // Extract posts from DOM if on blog page
    function extractPostsFromDOM() {
        const postsGrid = document.getElementById('posts-grid');
        if (!postsGrid) return;
        
        const postCards = postsGrid.querySelectorAll('.post-card');
        allPosts = Array.from(postCards).map(card => {
            const titleEl = card.querySelector('.post-title a');
            const excerptEl = card.querySelector('.post-excerpt');
            const tagsEls = card.querySelectorAll('.tag');
            
            return {
                title: titleEl?.textContent || '',
                url: titleEl?.href || '',
                excerpt: excerptEl?.textContent || '',
                tags: Array.from(tagsEls).map(tag => tag.textContent)
            };
        });
    }
    
    // Open search
    function openSearch() {
        searchContainer.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
        
        if (allPosts.length === 0) {
            extractPostsFromDOM();
        }
    }
    
    // Close search
    function closeSearchBox() {
        searchContainer.classList.remove('active');
        searchResults.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
    
    // Perform search
    function performSearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (!normalizedQuery) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }
        
        const matches = allPosts.filter(post => {
            const searchText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
            return searchText.includes(normalizedQuery);
        });
        
        searchResults.classList.add('active');
        
        if (matches.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p>Không tìm thấy "<strong>${escapeHtml(query)}</strong>"</p>
                </div>
            `;
        } else {
            const resultsHTML = matches.slice(0, 8).map(post => `
                <a href="${post.url}" class="search-result-item">
                    <div class="search-result-title">${highlightText(post.title, query)}</div>
                    <div class="search-result-excerpt">${highlightText(post.excerpt.substring(0, 100), query)}...</div>
                    ${post.tags.length > 0 ? `
                        <div class="search-result-meta">
                            ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </a>
            `).join('');
            
            searchResults.innerHTML = `
                <div class="results-count">Tìm thấy <strong>${matches.length}</strong> bài viết${matches.length > 8 ? ' (hiển thị 8)' : ''}</div>
                ${resultsHTML}
            `;
        }
    }
    
    // Highlight search terms
    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return escapeHtml(text).replace(regex, '<mark>$1</mark>');
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Escape regex
    function escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Event listeners
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (searchContainer.classList.contains('active')) {
            closeSearchBox();
        } else {
            openSearch();
        }
    });
    
    closeSearch.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearchBox();
    });
    
    const debouncedSearch = debounce((e) => {
        performSearch(e.target.value);
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
    
    searchInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchResults.contains(e.target)) {
            closeSearchBox();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to open
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        
        // ESC to close
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            closeSearchBox();
        }
    });
    
    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', extractPostsFromDOM);
    } else {
        extractPostsFromDOM();
    }
})();
