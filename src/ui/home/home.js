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

  // Load posts initially
  savedThreads.loadPosts();

  // Search handler
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    savedThreads.filterPosts(query);
  });

  // Navigation handler (simple tab switching)
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      if (page === 'saved') {
        document.querySelector('.top-bar h1').textContent = 'Saved Threads';
        document.querySelector('.search-box').style.display = 'block';
        savedThreads.loadPosts(); // Reload to be safe
      } else if (page === 'settings') {
        document.querySelector('.top-bar h1').textContent = 'Settings';
        document.querySelector('.search-box').style.display = 'none';
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
        <button id="clearAll" class="btn-text danger" style="background: #fff1f0; padding: 10px 20px;">Clear All Data</button>
      </div>
    `;
    postsList.style.display = 'block';
    emptyState.style.display = 'none';

    document.getElementById('clearAll').addEventListener('click', () => {
      savedThreads.clearAllPosts();
    });
  }
});
