document.addEventListener('DOMContentLoaded', () => {
  const postsList = document.getElementById('postsList');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const navItems = document.querySelectorAll('.nav-item');
  const modal = document.getElementById('threadModal');
  const modalCloseBtn = modal.querySelector('.close-modal');
  const modalOverlay = modal.querySelector('.modal-overlay');

  // Initialize SavedThreads manager
  const savedThreads = new SavedThreads({
    postsList,
    emptyState,
    modal
  });

  // Initialize HistoryManager
  const historyManager = new HistoryManager({
    container: postsList,
    emptyState: emptyState
  });

  // Load posts initially
  savedThreads.loadPosts();

  // Search handler
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (document.querySelector('.nav-item[data-page="saved"]').classList.contains('active')) {
      savedThreads.filterPosts(query);
    } else if (document.querySelector('.nav-item[data-page="history"]').classList.contains('active')) {
      historyManager.filterHistory(query);
    }
  });

  // Refresh handler
  document.getElementById('refreshBtn').addEventListener('click', function() {
    const icon = this.querySelector('svg');
    icon.style.transition = 'transform 0.5s ease';
    icon.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
      icon.style.transition = 'none';
      icon.style.transform = 'none';
    }, 500);

    if (document.querySelector('.nav-item[data-page="saved"]').classList.contains('active')) {
      savedThreads.loadPosts();
    } else if (document.querySelector('.nav-item[data-page="history"]').classList.contains('active')) {
      historyManager.loadHistory();
    } else if (document.querySelector('.nav-item[data-page="settings"]').classList.contains('active')) {
      renderSettings();
    }
  });

  // Navigation handler (simple tab switching)
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Clear search input when switching tabs
      searchInput.value = '';

      const viewToggle = document.querySelector('.view-toggle');

      if (page === 'saved') {
        document.querySelector('.top-bar h1').textContent = 'Saved Threads';
        document.querySelector('.search-box').style.display = 'block';
        if (viewToggle) viewToggle.style.display = 'flex';
        savedThreads.loadPosts(); // Reload to be safe
      } else if (page === 'history') {
        document.querySelector('.top-bar h1').textContent = 'History';
        document.querySelector('.search-box').style.display = 'block';
        if (viewToggle) viewToggle.style.display = 'none';
        historyManager.loadHistory();
      } else if (page === 'settings') {
        document.querySelector('.top-bar h1').textContent = 'Settings';
        document.querySelector('.search-box').style.display = 'none';
        if (viewToggle) viewToggle.style.display = 'none';
        renderSettings();
      }
    });
  });

  // Modal handlers
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    // Stop any playing video
    const video = document.getElementById('modalVideo');
    if (video) {
      video.pause();
      video.src = "";
      video.load();
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  function renderSettings() {
    postsList.innerHTML = `
      <div style="padding: 20px; background: white; border-radius: 12px; box-shadow: var(--card-shadow);">
        <h3>Data</h3>
        <p>Manage your saved data.</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="clearAll" class="btn-text danger" style="background: #fff1f0; padding: 10px 20px;">Clear Saved Threads</button>
          <button id="clearHistory" class="btn-text danger" style="background: #fff1f0; padding: 10px 20px;">Clear History</button>
        </div>
      </div>
    `;
    postsList.style.display = 'block';
    emptyState.style.display = 'none';

    document.getElementById('clearAll').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all saved threads?')) {
        savedThreads.clearAllPosts();
      }
    });
    
    document.getElementById('clearHistory').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your viewing history?')) {
        historyManager.clearHistory();
        alert('History cleared.');
      }
    });
  }
});
