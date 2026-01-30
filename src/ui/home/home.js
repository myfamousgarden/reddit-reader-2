document.addEventListener('DOMContentLoaded', () => {
  const postsList = document.getElementById('postsList');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const navItems = document.querySelectorAll('.nav-item');
  const modal = document.getElementById('threadModal');
  const modalCloseBtn = modal.querySelector('.close-modal');
  const modalOverlay = modal.querySelector('.modal-overlay');

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
        document.querySelector('.top-bar h1').textContent = 'Saved Threads';
        document.querySelector('.search-box').style.display = 'block';
        loadPosts(); // Reload to be safe
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

  function openModal(post) {
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalSubreddit').textContent = post.subreddit || 'r/reddit';
    document.getElementById('modalDate').textContent = new Date(post.savedAt).toLocaleString();
    
    // Render body content with markdown
    let bodyContent = '';
    
    // Check for gallery images first
    if (post.galleryImagesBase64 && post.galleryImagesBase64.length > 0) {
      const images = post.galleryImagesBase64;
      let slidesHtml = '';
      let dotsHtml = '';
      
      images.forEach((img, index) => {
        slidesHtml += `
          <div class="gallery-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="Gallery Image ${index + 1}">
          </div>
        `;
        dotsHtml += `
          <div class="gallery-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `;
      });
      
      bodyContent += `
        <div class="modal-post-image gallery-wrapper">
          <div class="gallery-container">
            ${slidesHtml}
            ${images.length > 1 ? `
              <button class="gallery-nav gallery-prev">❮</button>
              <button class="gallery-nav gallery-next">❯</button>
              <div class="gallery-dots">
                ${dotsHtml}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } 
    // Check for video
    else if (post.videoBase64 || post.videoUrl) {
      const videoSrc = post.videoBase64 || post.videoUrl;
      const isM3U8 = post.videoUrl && post.videoUrl.includes('.m3u8') && !post.videoBase64;
      
      bodyContent += `
        <div class="modal-post-image video-wrapper" style="background: black; display: flex; justify-content: center; align-items: center; min-height: 300px;">
          <video id="modalVideo" controls="true" playsinline ${!isM3U8 ? `src="${videoSrc}"` : ''} ${post.videoPoster ? `poster="${post.videoPoster}"` : ''}></video>
        </div>
      `;
    }
    // Fallback: If no videoBase64/videoUrl but videoPoster exists
    else if (post.videoPoster) {
       bodyContent += `
        <div class="modal-post-image video-wrapper" style="background: black; display: flex; justify-content: center; align-items: center; min-height: 300px; position: relative;">
          <img src="${post.videoPoster}" style="max-width: 100%; max-height: 80vh; width: auto;" alt="Video Poster">
          <div style="position: absolute; color: white; background: rgba(0,0,0,0.6); padding: 10px 20px; border-radius: 20px; font-weight: bold;">
             Video not saved (Poster Only)
          </div>
        </div>
      `;
    }
    // Fallback to single image
    else if (post.imageBase64) {
      bodyContent += `<div class="modal-post-image"><img src="${post.imageBase64}" alt="Post Image"></div>`;
    }
    
    bodyContent += markdownToHtml(post.content || '');
    document.getElementById('modalBody').innerHTML = bodyContent;

    // Initialize HLS for video if needed
    if (post.videoUrl && post.videoUrl.includes('.m3u8') && !post.videoBase64) {
      const video = document.getElementById('modalVideo');
      if (video && typeof Hls !== 'undefined') {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(post.videoUrl);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = post.videoUrl;
        }
      }
    }
    
    // Initialize gallery if present
    if (post.galleryImagesBase64 && post.galleryImagesBase64.length > 1) {
      initGallery();
    }
    
    const linkBtn = document.getElementById('modalLink');
    linkBtn.href = post.url;

    // Download CSV button handler
    const downloadCsvBtn = document.getElementById('modalDownloadCsvBtn');
    // Remove existing event listeners by cloning
    const newDownloadCsvBtn = downloadCsvBtn.cloneNode(true);
    downloadCsvBtn.parentNode.replaceChild(newDownloadCsvBtn, downloadCsvBtn);
    
    newDownloadCsvBtn.addEventListener('click', () => {
      downloadCommentsAsCsv(post);
    });

    // Delete button handler
    const deleteBtn = document.getElementById('modalDeleteBtn');
    // Remove existing event listeners by cloning
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    
    newDeleteBtn.addEventListener('click', () => {
      deletePost(post.id);
      closeModal();
    });
    
    // Render comments
    renderComments(post.commentsData);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function initGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    const slides = container.querySelectorAll('.gallery-slide');
    const dots = container.querySelectorAll('.gallery-dot');
    const prevBtn = container.querySelector('.gallery-prev');
    const nextBtn = container.querySelector('.gallery-next');
    let currentIndex = 0;
    
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      currentIndex = index;
      
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(currentIndex + 1);
    });
    
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(dot.dataset.index);
        showSlide(index);
      });
    });
  }

  function renderComments(commentsData) {
    const commentsContainer = document.getElementById('modalComments');
    const countSpan = document.getElementById('commentCount');
    
    commentsContainer.innerHTML = '';
    
    if (!commentsData || !commentsData.comments || commentsData.comments.length === 0) {
      countSpan.textContent = '0';
      commentsContainer.innerHTML = '<div class="empty-state" style="height: 100px;"><h3>No comments saved</h3></div>';
      return;
    }

    countSpan.textContent = commentsData.totalComments || commentsData.comments.length;
    const opUsername = commentsData.opUsername;

    // Render comments as a tree
    // Assuming comments are in DFS order (standard Reddit)
    // We'll use a stack to manage nesting
    
    const rootContainer = document.createElement('div');
    const stack = [{ element: rootContainer, depth: -1 }];
    
    commentsData.comments.forEach(comment => {
      // Find parent
      while (stack.length > 1 && stack[stack.length - 1].depth >= comment.depth) {
        stack.pop();
      }
      
      const parent = stack[stack.length - 1].element;
      
      const commentEl = document.createElement('div');
      commentEl.className = `comment-item ${comment.isOP ? 'op-comment' : ''}`;
      
      const timeAgo = comment.time || 'unknown time';
      
      commentEl.innerHTML = `
        <div class="comment-content-wrapper">
          <div class="comment-header">
            <span class="comment-author ${comment.isOP ? 'is-op' : ''}">${escapeHtml(comment.author)}</span>
            <span class="comment-meta">${comment.score} points • ${timeAgo}</span>
          </div>
          <div class="comment-body">${markdownToHtml(comment.content)}</div>
        </div>
        <div class="comment-children"></div>
      `;
      
      // If it's a top-level comment (depth 0), append to rootContainer (or parent if we want strict nesting)
      // Since our stack starts with rootContainer at depth -1, depth 0 will be appended to it.
      // But we need to handle the "comment-children" container for the next level.
      
      // Actually, we should append the commentEl to the parent's children container.
      // If parent is rootContainer, we append directly.
      // If parent is a comment, we append to its .comment-children.
      
      if (stack.length === 1) {
        // Root
        parent.appendChild(commentEl);
      } else {
        // Nested
        parent.querySelector('.comment-children').appendChild(commentEl);
      }
      
      // Push this comment to stack as potential parent
      stack.push({ element: commentEl, depth: comment.depth });
    });
    
    commentsContainer.appendChild(rootContainer);
  }

  function loadPosts() {
    chrome.storage.local.get(['savedPosts'], (result) => {
      savedPosts = result.savedPosts || [];
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
      
      let imageHtml = '';
      if (post.videoBase64) {
        imageHtml = `<div class="post-thumbnail video-thumbnail" style="position: relative;">
          <video src="${post.videoBase64}" ${post.videoPoster ? `poster="${post.videoPoster}"` : ''} muted style="width: 100%; height: 100%; object-fit: cover;"></video>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">▶</div>
        </div>`;
      } else if (post.videoPoster) {
        // Show poster with play icon if video is not saved but poster is available
        imageHtml = `<div class="post-thumbnail video-thumbnail" style="position: relative;">
          <img src="${post.videoPoster}" alt="Video Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">▶</div>
        </div>`;
      } else if (post.imageBase64) {
        imageHtml = `<div class="post-thumbnail"><img src="${post.imageBase64}" alt="Post Image"></div>`;
      }

      card.innerHTML = `
        <div class="post-header">
          <span class="subreddit">${escapeHtml(post.subreddit || 'r/reddit')}</span>
          <span class="date">${date}</span>
        </div>
        <h3 class="post-title" title="${escapeHtml(post.title)}">${escapeHtml(post.title)}</h3>
        ${imageHtml}
        <p class="post-excerpt">${escapeHtml(post.content || '')}</p>
        <div class="post-actions">
          <button class="btn-icon view-btn" data-url="${post.url}" title="View Original">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
          <button class="btn-icon download-btn" title="Download Comments as CSV">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
          <button class="btn-icon danger delete-btn" data-id="${post.id}" title="Delete">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      `;

      // Event listeners
      
      // Click on card to open modal (ignore clicks on actions)
      card.addEventListener('click', (e) => {
        // If click is on action buttons, don't open modal
        if (e.target.closest('.post-actions')) return;
        openModal(post);
      });

      card.querySelector('.view-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.tabs.create({ url: post.url });
      });

      card.querySelector('.download-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        downloadCommentsAsCsv(post);
      });

      card.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
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
          content: 'Extensions are built on web technologies such as HTML, CSS, and JavaScript.\n\n### Key Concepts\n\n1. **Manifest**: The blueprint.\n2. **Background Service Worker**: The event handler.\n3. **Content Scripts**: The bridge to web pages.\n\nThey take advantage of some of the same web APIs as JavaScript on a web page, but an extension also has access to its own set of APIs.',
          url: 'https://reddit.com/r/chrome_extensions/1',
          savedAt: Date.now(),
          commentsData: {
            opUsername: 'chrome_dev',
            totalComments: 3,
            comments: [
              {
                id: 'c1',
                author: 'web_wizard',
                content: 'This is a great explanation! How do content scripts communicate with the background script?',
                score: 42,
                depth: 0,
                isOP: false,
                time: '2 hours ago',
                links: []
              },
              {
                id: 'c2',
                author: 'chrome_dev',
                content: 'You can use `chrome.runtime.sendMessage` and `chrome.runtime.onMessage`. It is message passing.',
                score: 25,
                depth: 1,
                isOP: true,
                time: '1 hour ago',
                links: []
              },
              {
                id: 'c3',
                author: 'newbie_coder',
                content: 'Thanks for the info!',
                score: 10,
                depth: 2,
                isOP: false,
                time: '30 mins ago',
                links: []
              }
            ]
          }
        },
        {
          id: '2',
          title: 'Why Rust is becoming popular for web development',
          subreddit: 'r/rust',
          content: 'Rust’s performance, reliability, and productivity make it an excellent choice for web development. Frameworks like Actix and Rocket are gaining traction...',
          url: 'https://reddit.com/r/rust/1',
          savedAt: Date.now() - 86400000,
          commentsData: {
            opUsername: 'rustacean',
            totalComments: 0,
            comments: []
          }
        }
      ];
      
      chrome.storage.local.set({ savedPosts: mockPosts }, () => {
        alert('Mock data added!');
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

  function downloadCommentsAsCsv(post) {
    if (!post.commentsData || !post.commentsData.comments || post.commentsData.comments.length === 0) {
      alert('No comments to download.');
      return;
    }

    const comments = post.commentsData.comments;
    // CSV Header matching Sidebar implementation
    const headers = ['Author', 'Time', 'Score', 'Thread Level', 'Is Reply', 'Comment', 'Permalink', 'Links'];
    let csvContent = headers.join(',') + "\n";

    // Helper for CSV escaping
    const escapeCSV = (str) => {
      if (str === null || str === undefined) return '';
      const stringValue = String(str);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    comments.forEach(comment => {
      const row = [
        escapeCSV(comment.author),
        escapeCSV(comment.time),
        comment.score || 0,
        comment.depth || 0,
        (comment.depth > 0) ? 'Yes' : 'No',
        escapeCSV(comment.content),
        escapeCSV(comment.permalink ? 'https://www.reddit.com' + comment.permalink : ''),
        escapeCSV(comment.links ? comment.links.join('; ') : '')
      ].join(",");
      
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    // Sanitize filename
    const safeTitle = (post.title || 'comments').replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50);
    const filename = `${safeTitle}_comments.csv`;
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Simple Markdown to HTML converter (subset)
  function markdownToHtml(text) {
    if (!text) return '';
    
    // Escape HTML first
    let html = escapeHtml(text);
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
    
    // Wrap consecutive list items (simple approach)
    // For a robust implementation, we'd need a parser, but this helps for display
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
  }
});
