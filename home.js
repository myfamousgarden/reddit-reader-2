document.addEventListener('DOMContentLoaded', () => {
  const postsList = document.getElementById('postsList');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const navItems = document.querySelectorAll('.nav-item');

  let savedPosts = [];

  // Load posts
  loadPosts();

  // Search handler
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredPosts = savedPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      post.subreddit.toLowerCase().includes(query)
    );
    renderPosts(filteredPosts);
  });

  // Navigation handler (simple tab switching)
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      if (page === 'saved') {
        document.querySelector('.top-bar h1').textContent = 'Saved Posts';
        document.querySelector('.search-box').style.display = 'block';
        loadPosts(); // Reload to be safe
      } else if (page === 'settings') {
        document.querySelector('.top-bar h1').textContent = 'Settings';
        document.querySelector('.search-box').style.display = 'none';
        renderSettings();
      }
    });
  });

  function loadPosts() {
    chrome.storage.local.get(['savedPosts'], (result) => {
      savedPosts = result.savedPosts || [];
      
      // If no posts, and we are in dev environment (or just for demo), 
      // we might want to show something. 
      // For now, let's just show empty state or render what we have.
      renderPosts(savedPosts);
    });
  }

  function renderPosts(posts) {
    postsList.innerHTML = '';
    
    if (posts.length === 0) {
      postsList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }

    postsList.style.display = 'grid';
    emptyState.style.display = 'none';

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';
      
      const date = new Date(post.savedAt).toLocaleDateString();
      
      card.innerHTML = `
        <div class="post-header">
          <span class="subreddit">${escapeHtml(post.subreddit || 'r/reddit')}</span>
          <span class="date">${date}</span>
        </div>
        <h3 class="post-title" title="${escapeHtml(post.title)}">${escapeHtml(post.title)}</h3>
        <p class="post-excerpt">${escapeHtml(post.content || '')}</p>
        <div class="post-actions">
          <button class="btn-text primary view-btn" data-url="${post.url}">View Original</button>
          <button class="btn-text danger delete-btn" data-id="${post.id}">Delete</button>
        </div>
      `;

      // Event listeners
      card.querySelector('.view-btn').addEventListener('click', () => {
        chrome.tabs.create({ url: post.url });
      });

      card.querySelector('.delete-btn').addEventListener('click', () => {
        deletePost(post.id);
      });

      postsList.appendChild(card);
    });
  }

  function deletePost(id) {
    if (confirm('Are you sure you want to delete this saved post?')) {
      savedPosts = savedPosts.filter(p => p.id !== id);
      chrome.storage.local.set({ savedPosts }, () => {
        renderPosts(savedPosts);
      });
    }
  }

  function renderSettings() {
    postsList.innerHTML = `
      <div style="padding: 20px; background: white; border-radius: 12px; box-shadow: var(--card-shadow);">
        <h3>Debug Tools</h3>
        <p>Use these tools to populate data for testing.</p>
        <button id="addMockData" class="btn-text primary" style="background: #eef6fc; padding: 10px 20px;">Add Mock Data</button>
        <button id="clearAll" class="btn-text danger" style="background: #fff1f0; padding: 10px 20px; margin-left: 10px;">Clear All Data</button>
      </div>
    `;
    postsList.style.display = 'block';
    emptyState.style.display = 'none';

    document.getElementById('addMockData').addEventListener('click', () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Understanding the Chrome Extension Architecture',
          subreddit: 'r/chrome_extensions',
          content: 'Extensions are built on web technologies such as HTML, CSS, and JavaScript. They take advantage of some of the same web APIs as JavaScript on a web page, but an extension also has access to its own set of APIs...',
          url: 'https://reddit.com',
          savedAt: Date.now()
        },
        {
          id: '2',
          title: 'Why Rust is becoming popular for web development',
          subreddit: 'r/rust',
          content: 'Rust’s performance, reliability, and productivity make it an excellent choice for web development. Frameworks like Actix and Rocket are gaining traction...',
          url: 'https://reddit.com',
          savedAt: Date.now() - 86400000
        },
        {
          id: '3',
          title: 'The state of AI in 2026',
          subreddit: 'r/artificial',
          content: 'We are seeing massive improvements in reasoning capabilities of LLMs. Agents are becoming more autonomous and capable of complex tasks...',
          url: 'https://reddit.com',
          savedAt: Date.now() - 172800000
        }
      ];
      
      chrome.storage.local.set({ savedPosts: mockPosts }, () => {
        alert('Mock data added!');
        // Don't auto reload, user can go back to Saved tab
      });
    });

    document.getElementById('clearAll').addEventListener('click', () => {
      if(confirm('Clear all saved posts?')) {
        chrome.storage.local.set({ savedPosts: [] }, () => {
          alert('All data cleared!');
        });
      }
    });
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});