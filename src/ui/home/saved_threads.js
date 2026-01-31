class SavedThreads {
  constructor(elements) {
    this.postsList = elements.postsList;
    this.emptyState = elements.emptyState;
    this.modal = elements.modal;
    this.savedPosts = [];
    this.currentView = 'card'; // 'card' or 'list'
    
    // Bind methods
    this.renderPosts = this.renderPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.downloadCommentsAsCsv = this.downloadCommentsAsCsv.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setView = this.setView.bind(this);

    // Initialize view toggle buttons
    const cardViewBtn = document.getElementById('cardViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');

    if (cardViewBtn && listViewBtn) {
      cardViewBtn.addEventListener('click', () => this.setView('card'));
      listViewBtn.addEventListener('click', () => this.setView('list'));
    }

    // Load persisted view preference
    chrome.storage.local.get(['savedThreadsView'], (result) => {
      if (result.savedThreadsView) {
        this.setView(result.savedThreadsView);
      }
    });
  }

  setView(view) {
    this.currentView = view;
    
    // Update buttons state
    const cardViewBtn = document.getElementById('cardViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    if (cardViewBtn && listViewBtn) {
      if (view === 'card') {
        cardViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
      } else {
        cardViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
      }
    }

    // Update grid class
    if (view === 'list') {
      this.postsList.classList.add('list-view');
    } else {
      this.postsList.classList.remove('list-view');
    }

    // Persist preference
    chrome.storage.local.set({ savedThreadsView: view });
  }

  loadPosts() {
    chrome.storage.local.get(['savedPosts'], (result) => {
      this.savedPosts = result.savedPosts || [];
      this.renderPosts(this.savedPosts);
    });
  }

  filterPosts(query) {
    const filtered = this.savedPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      (post.content && post.content.toLowerCase().includes(query)) ||
      (post.subreddit && post.subreddit.toLowerCase().includes(query))
    );
    this.renderPosts(filtered);
  }

  renderPosts(posts) {
    this.postsList.innerHTML = '';
    
    if (posts.length === 0) {
      this.postsList.style.display = 'none';
      this.emptyState.style.display = 'flex';
      return;
    }

    this.postsList.style.removeProperty('display');
    this.emptyState.style.display = 'none';

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
        imageHtml = `<div class="post-thumbnail video-thumbnail" style="position: relative;">
          <img src="${post.videoPoster}" alt="Video Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">▶</div>
        </div>`;
      } else if (post.imageBase64) {
        imageHtml = `<div class="post-thumbnail"><img src="${post.imageBase64}" alt="Post Image"></div>`;
      } else {
        // Placeholder for consistent card size
        imageHtml = `<div class="post-thumbnail no-image">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.2;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>`;
      }

      card.innerHTML = `
        ${imageHtml}
        <div class="post-content-wrapper">
          <div class="post-header">
            <span class="subreddit">${this.escapeHtml(post.subreddit || 'r/reddit')}</span>
            <span class="date">${date}</span>
          </div>
          <h3 class="post-title" title="${this.escapeHtml(post.title)}">${this.escapeHtml(post.title)}</h3>
          <p class="post-excerpt">${this.escapeHtml(post.content || '')}</p>
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
        </div>
      `;

      // Event listeners
      card.addEventListener('click', (e) => {
        if (e.target.closest('.post-actions')) return;
        this.openModal(post);
      });

      card.querySelector('.view-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.tabs.create({ url: post.url });
      });

      card.querySelector('.download-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadCommentsAsCsv(post);
      });

      card.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deletePost(post.id);
      });

      this.postsList.appendChild(card);
    });
  }

  deletePost(id) {
    if (confirm('Are you sure you want to delete this saved post?')) {
      this.savedPosts = this.savedPosts.filter(p => p.id !== id);
      chrome.storage.local.set({ savedPosts: this.savedPosts }, () => {
        this.renderPosts(this.savedPosts);
      });
    }
  }

  clearAllPosts() {
    if(confirm('Clear all saved posts?')) {
      this.savedPosts = [];
      chrome.storage.local.set({ savedPosts: [] }, () => {
        alert('All data cleared!');
        this.renderPosts([]);
      });
    }
  }

  downloadCommentsAsCsv(post) {
    if (!post.commentsData || !post.commentsData.comments || post.commentsData.comments.length === 0) {
      alert('No comments to download.');
      return;
    }

    const comments = post.commentsData.comments;
    const headers = ['Author', 'Time', 'Score', 'Thread Level', 'Is Reply', 'Comment', 'Permalink', 'Links'];
    let csvContent = headers.join(',') + "\n";

    comments.forEach(comment => {
      const row = [
        this.escapeCSV(comment.author),
        this.escapeCSV(comment.time),
        comment.score || 0,
        comment.depth || 0,
        (comment.depth > 0) ? 'Yes' : 'No',
        this.escapeCSV(comment.content),
        this.escapeCSV(comment.permalink ? 'https://www.reddit.com' + comment.permalink : ''),
        this.escapeCSV(comment.links ? comment.links.join('; ') : '')
      ].join(",");
      
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const safeTitle = (post.title || 'comments').replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50);
    const filename = `${safeTitle}_comments.csv`;
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openModal(post) {
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalSubreddit').textContent = post.subreddit || 'r/reddit';
    document.getElementById('modalDate').textContent = new Date(post.savedAt).toLocaleString();
    
    let bodyContent = '';
    
    // Gallery
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
    // Video
    else if (post.videoBase64 || post.videoUrl) {
      const videoSrc = post.videoBase64 || post.videoUrl;
      const isM3U8 = post.videoUrl && post.videoUrl.includes('.m3u8') && !post.videoBase64;
      
      bodyContent += `
        <div class="modal-post-image video-wrapper" style="background: black; display: flex; justify-content: center; align-items: center; min-height: 300px;">
          <video id="modalVideo" controls="true" playsinline ${!isM3U8 ? `src="${videoSrc}"` : ''} ${post.videoPoster ? `poster="${post.videoPoster}"` : ''}></video>
        </div>
      `;
    }
    // Video Poster Only
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
    // Single Image
    else if (post.imageBase64) {
      bodyContent += `<div class="modal-post-image"><img src="${post.imageBase64}" alt="Post Image"></div>`;
    }
    
    bodyContent += this.markdownToHtml(post.content || '');
    document.getElementById('modalBody').innerHTML = bodyContent;

    // Initialize HLS
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
    
    // Initialize Gallery
    if (post.galleryImagesBase64 && post.galleryImagesBase64.length > 1) {
      this.initGallery();
    }
    
    const linkBtn = document.getElementById('modalLink');
    linkBtn.href = post.url;

    // Download CSV
    const downloadCsvBtn = document.getElementById('modalDownloadCsvBtn');
    const newDownloadCsvBtn = downloadCsvBtn.cloneNode(true);
    downloadCsvBtn.parentNode.replaceChild(newDownloadCsvBtn, downloadCsvBtn);
    newDownloadCsvBtn.addEventListener('click', () => {
      this.downloadCommentsAsCsv(post);
    });

    // Delete Button
    const deleteBtn = document.getElementById('modalDeleteBtn');
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    newDeleteBtn.addEventListener('click', () => {
      this.deletePost(post.id);
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    this.renderComments(post.commentsData);
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  initGallery() {
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

  renderComments(commentsData) {
    const commentsContainer = document.getElementById('modalComments');
    const countSpan = document.getElementById('commentCount');
    
    commentsContainer.innerHTML = '';
    
    if (!commentsData || !commentsData.comments || commentsData.comments.length === 0) {
      countSpan.textContent = '0';
      commentsContainer.innerHTML = '<div class="empty-state" style="height: 100px;"><h3>No comments saved</h3></div>';
      return;
    }

    countSpan.textContent = commentsData.totalComments || commentsData.comments.length;

    const rootContainer = document.createElement('div');
    const stack = [{ element: rootContainer, depth: -1 }];
    
    commentsData.comments.forEach(comment => {
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
            <span class="comment-author ${comment.isOP ? 'is-op' : ''}">${this.escapeHtml(comment.author)}</span>
            <span class="comment-meta">${comment.score} points • ${timeAgo}</span>
          </div>
          <div class="comment-body">${this.markdownToHtml(comment.content)}</div>
        </div>
        <div class="comment-children"></div>
      `;
      
      if (stack.length === 1) {
        parent.appendChild(commentEl);
      } else {
        parent.querySelector('.comment-children').appendChild(commentEl);
      }
      
      stack.push({ element: commentEl, depth: comment.depth });
    });
    
    commentsContainer.appendChild(rootContainer);
  }

  escapeCSV(str) {
    if (str === null || str === undefined) return '';
    const stringValue = String(str);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  markdownToHtml(text) {
    if (!text) return '';
    let html = this.escapeHtml(text);
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }
}
