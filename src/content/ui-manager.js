/**
 * Main UI Manager for Reddit Reader 2.
 * Coordinates scraping, AI analysis, and data saving.
 */
class RedditReader2 {
  constructor() {
    this.isInitialized = false;
    this.floatingButton = null;
    this.floatingPanel = null;
    this.isPanelVisible = false;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.currentPost = null;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.createUI();
        this.recordHistory();
      });
    } else {
      this.createUI();
      this.recordHistory();
    }
    
    this.isInitialized = true;
  }

  async recordHistory() {
    // Basic URL check first
    if (!window.location.href.includes('/comments/')) return;
    
    // Allow some time for dynamic content to populate
    setTimeout(async () => {
      try {
        // Double check it's a post page and content is loaded
        if (!RedditScraper.isRedditPost()) {
          console.log('Reddit Reader: Not a valid post page for history');
          return;
        }

        const content = RedditScraper.extractRedditContent();
        
        // Ensure we at least have a title to save
        if (!content.title) {
           console.log('Reddit Reader: No title found, skipping history');
           return;
        }

        const historyItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          url: window.location.href,
          title: content.title,
          subreddit: content.subreddit,
          visitTime: new Date().toISOString(),
          postTime: content.postTime || new Date().toISOString()
        };

        const result = await chrome.storage.local.get(['redditHistory']);
        const history = result.redditHistory || [];
        
        history.unshift(historyItem);
        
        await chrome.storage.local.set({ redditHistory: history });
        console.log('Reddit Reader: History saved', historyItem.title);
      } catch (e) {
        console.error('Reddit Reader: Failed to record history', e);
      }
    }, 3000); // Increased delay to 3s to ensure Reddit SPA loads
  }

  createUI() {
    this.createFloatingButton();
    this.createFloatingPanel();
    this.setupEventListeners();
    this.setupMessageListener();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'routeChanged') {
        console.log('Reddit Reader: Route changed detected, recording history...');
        this.recordHistory();
      }
    });
  }

  createFloatingButton() {
    if (this.floatingButton) {
      this.floatingButton.remove();
    }

    this.floatingButton = document.createElement('div');
    this.floatingButton.id = 'reddit-reader-2-button';
    this.floatingButton.className = 'reddit-reader-2-floating-button';
    const iconUrl = chrome.runtime.getURL('icons/icon48.png');
    this.floatingButton.innerHTML = `
      <img src="${iconUrl}" style="width: 28px; height: 28px; pointer-events: none; display: block; margin: 0; padding: 0; border: none;">
    `;
    
    this.floatingButton.style.position = 'fixed';
    this.floatingButton.style.top = '50%';
    this.floatingButton.style.right = '20px';
    this.floatingButton.style.transform = 'translateY(-50%)';
    this.floatingButton.style.zIndex = '10000';
    this.floatingButton.style.cursor = 'move';
    
    document.body.appendChild(this.floatingButton);
  }

  createFloatingPanel() {
    if (this.floatingPanel) {
      this.floatingPanel.remove();
    }

    this.floatingPanel = document.createElement('div');
    this.floatingPanel.id = 'reddit-reader-2-panel';
    this.floatingPanel.className = 'reddit-reader-2-floating-panel';
    this.floatingPanel.innerHTML = `
      <div class="reddit-reader-2-panel-header">
        <h3>Reddit Reader</h3>
        <div class="header-actions">
          <button class="reddit-reader-2-icon-btn" id="reddit-reader-2-home" title="Go to Home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
          <button class="reddit-reader-2-close-btn" id="reddit-reader-2-close">×</button>
        </div>
      </div>
      <div class="reddit-reader-2-panel-content"></div>
    `;
    
    this.floatingPanel.style.position = 'fixed';
    this.floatingPanel.style.top = '0px';
    this.floatingPanel.style.right = '-500px'; 
    this.floatingPanel.style.width = '480px';
    this.floatingPanel.style.height = '100vh';
    this.floatingPanel.style.zIndex = '10001';
    this.floatingPanel.style.transition = 'right 0.3s ease-in-out';
    
    document.body.appendChild(this.floatingPanel);
    this.updatePanelContent();
  }

  setupEventListeners() {
    this.floatingButton.addEventListener('click', () => {
      if (!this.isDragging) this.togglePanel();
    });

    this.floatingButton.addEventListener('mousedown', (e) => {
      this.isDragging = false;
      const startX = e.clientX;
      const startY = e.clientY;
      const buttonRect = this.floatingButton.getBoundingClientRect();
      
      this.dragOffset.x = startX - buttonRect.left;
      this.dragOffset.y = startY - buttonRect.top;

      const handleMouseMove = (e) => {
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);
        
        if (deltaX > 5 || deltaY > 5) this.isDragging = true;

        if (this.isDragging) {
          const newX = e.clientX - this.dragOffset.x;
          const newY = e.clientY - this.dragOffset.y;
          const maxX = window.innerWidth - this.floatingButton.offsetWidth;
          const maxY = window.innerHeight - this.floatingButton.offsetHeight;
          const clampedX = Math.max(0, Math.min(newX, maxX));
          const clampedY = Math.max(0, Math.min(newY, maxY));
          
          this.floatingButton.style.left = clampedX + 'px';
          this.floatingButton.style.top = clampedY + 'px';
          this.floatingButton.style.right = 'auto';
          this.floatingButton.style.transform = 'none';
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => { this.isDragging = false; }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });

    this.floatingPanel.querySelector('#reddit-reader-2-close').addEventListener('click', () => this.hidePanel());
    this.floatingPanel.querySelector('#reddit-reader-2-home').addEventListener('click', () => {
      this.hidePanel();
      chrome.runtime.sendMessage({ action: 'openHome' });
    });

    window.addEventListener('resize', () => this.adjustPositions());
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('comment-anchor')) {
        e.preventDefault();
        const commentId = e.target.getAttribute('data-comment-id');
        this.scrollToComment(commentId);
      }
    });
  }

  togglePanel() {
    if (this.isPanelVisible) this.hidePanel(); else this.showPanel();
  }

  showPanel() {
    this.floatingPanel.style.right = '0px';
    this.isPanelVisible = true;
    this.floatingButton.classList.add('active');
    this.refreshBackendLoginStatus();
  }

  hidePanel() {
    this.floatingPanel.style.right = '-500px';
    this.isPanelVisible = false;
    this.floatingButton.classList.remove('active');
  }

  async refreshBackendLoginStatus() {
    if (!this.floatingPanel) return;
    const analyzeBtn = this.floatingPanel.querySelector('#analyzeBtn');
    if (!analyzeBtn) return;

    let settings;
    try {
      settings = await chrome.storage.sync.get(['mode', 'backendAuthToken']);
    } catch (e) {
      return;
    }

    const mode = settings.mode || 'apiKey';
    if (mode !== 'backend') {
      this.setBackendLoginPrompt('');
      if (!this.isAnalyzeButtonBusy(analyzeBtn)) analyzeBtn.disabled = false;
      return;
    }

    const token = settings.backendAuthToken || '';
    if (!token) {
      analyzeBtn.disabled = true;
      this.setBackendLoginPrompt('Login required. Open the extension popup to sign in.');
      return;
    }

    this.setBackendLoginPrompt('');
    if (!this.isAnalyzeButtonBusy(analyzeBtn)) analyzeBtn.disabled = false;

    chrome.runtime.sendMessage(
      { action: 'backendAuthStatus', backendBaseUrl: this.getBackendBaseUrl(), token: token },
      (response) => {
        if (chrome.runtime.lastError || !response) return;
        if (response.ok && response.loggedIn) {
          this.setBackendLoginPrompt('');
          if (!this.isAnalyzeButtonBusy(analyzeBtn)) analyzeBtn.disabled = false;
        } else if (response.ok && response.loggedIn === false) {
          analyzeBtn.disabled = true;
          this.setBackendLoginPrompt('Login required. Open the extension popup to sign in.');
        }
      }
    );
  }

  getBackendBaseUrl() {
    const manifest = chrome.runtime.getManifest();
    return manifest && manifest.backendBaseUrl ? manifest.backendBaseUrl : '';
  }

  isAnalyzeButtonBusy(analyzeBtn) {
    if (!analyzeBtn) return false;
    const text = analyzeBtn.textContent || '';
    return text.includes('Analyzing') || text.includes('Loading comments');
  }

  setBackendLoginPrompt(message) {
    const analyzeSection = this.floatingPanel.querySelector('.reddit-reader-2-analyze-section');
    if (!analyzeSection) return;
    let prompt = analyzeSection.querySelector('.reddit-reader-2-login-prompt');
    if (!message) {
      if (prompt) prompt.remove();
      return;
    }
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.className = 'reddit-reader-2-login-prompt';
      analyzeSection.insertBefore(prompt, analyzeSection.firstChild);
    }
    prompt.textContent = message;
  }

  adjustPositions() {
    const maxX = window.innerWidth - this.floatingButton.offsetWidth;
    const maxY = window.innerHeight - this.floatingButton.offsetHeight;
    const buttonRect = this.floatingButton.getBoundingClientRect();
    
    if (buttonRect.right > window.innerWidth) {
      this.floatingButton.style.left = maxX + 'px';
      this.floatingButton.style.right = 'auto';
    }
    if (buttonRect.bottom > window.innerHeight) {
      this.floatingButton.style.top = maxY + 'px';
      this.floatingButton.style.transform = 'none';
    }
    if (this.floatingPanel) this.floatingPanel.style.height = '100vh';
  }

  updatePanelContent() {
    if (!RedditScraper.isRedditPost()) {
      this.showNonRedditContent();
      return;
    }

    const redditData = RedditScraper.extractRedditContent();
    this.currentPost = { ...redditData, url: window.location.href };
    const contentDiv = this.floatingPanel.querySelector('.reddit-reader-2-panel-content');
    
    if (redditData.title || redditData.content) {
      contentDiv.innerHTML = `
        <div class="reddit-reader-2-post">
          <div class="reddit-reader-2-analyze-section">
            <div class="reddit-reader-2-actions">
              <button class="reddit-reader-2-analyze-btn" id="analyzeBtn">
                <span class="analyze-icon">🔍</span> Analyze
              </button>
              <button class="reddit-reader-2-analyze-btn secondary" id="saveBtn">
                <span class="analyze-icon">💾</span> Save Thread
              </button>
            </div>
            <div class="reddit-reader-2-analysis-result" id="analysisResult" style="display: none;">
              <div class="reddit-reader-2-translation-result" id="translationResult">
                <h5>Translation:</h5>
                <div class="translation-content"></div>
              </div>
              <div class="reddit-reader-2-comments-result" id="commentsResult" style="display: none;">
                <h5>Comments Summary:</h5>
                <div class="comments-content"></div>
                <div style="margin-top: 10px; text-align: right;">
                    <a href="#" id="downloadCommentsBtn" style="font-size: 12px; color: #666; text-decoration: underline;">Download comments</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      contentDiv.querySelector('#analyzeBtn').addEventListener('click', () => this.analyzePost(redditData));
      contentDiv.querySelector('#saveBtn').addEventListener('click', () => this.savePost());
      contentDiv.querySelector('#downloadCommentsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        this.downloadCommentsAsCSV();
      });

      this.refreshBackendLoginStatus();
    } else {
      contentDiv.innerHTML = `
        <div class="reddit-reader-2-loading">
          <h4>Reddit Post</h4>
          <p>Loading post content...</p>
        </div>
      `;
    }
  }

  async analyzePost(redditData) {
    const analyzeBtn = document.querySelector('#analyzeBtn');
    const analysisResult = document.querySelector('#analysisResult');
    const translationResult = document.querySelector('#translationResult');
    const translationContent = translationResult.querySelector('.translation-content');
    
    try {
      this.currentPost = { ...redditData, url: window.location.href };
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = '<span class="analyze-icon">⏳</span> Analyzing...';
      
      await RedditScraper.loadAllComments((status) => {
        analyzeBtn.innerHTML = `<span class="analyze-icon">⏳</span> ${status}`;
      });
      
      analyzeBtn.innerHTML = '<span class="analyze-icon">⏳</span> Analyzing...';
      analysisResult.style.display = 'block';
      translationResult.style.display = 'block';
      translationContent.innerHTML = '<div class="translation-loading">Connecting...</div>';
      
      const settings = await chrome.storage.sync.get(['mode', 'backendAuthToken', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'aiProvider', 'targetLanguage']);
      const mode = settings.mode || 'apiKey';
      const aiProvider = settings.aiProvider || 'dashscope';
      const targetLanguage = settings.targetLanguage || 'zh';
      
      translationContent.innerHTML = '<div class="translation-text"></div>';
      const translationTextDiv = translationContent.querySelector('.translation-text');
      
      let translatedText = '';
      let translationError = null;
      
      if (mode === 'backend') {
        const token = settings.backendAuthToken || '';
        const backendService = new window.BackendProxyService(token, this.getBackendBaseUrl());
        await backendService.translateStream(
          this.currentPost,
          targetLanguage,
          (chunk) => {
            translatedText += chunk;
            if (translationTextDiv) translationTextDiv.textContent = translatedText;
            translationResult.scrollTop = translationResult.scrollHeight;
          },
          null,
          (err) => { translationError = err; }
        );
      } else {
        let apiKey = settings[`${aiProvider}ApiKey`];
        const aiService = AIServiceFactory.createService(aiProvider, apiKey);
        if (!aiService.validateApiKey(apiKey)) {
          throw new Error(`${aiProvider} API key not configured.`);
        }

        await aiService.translateStream(
          `Title: ${redditData.title}\n\nContent: ${redditData.content}`,
          targetLanguage,
          (chunk) => {
            translatedText += chunk;
            if (translationTextDiv) translationTextDiv.textContent = translatedText;
            translationResult.scrollTop = translationResult.scrollHeight;
          },
          null,
          (err) => { translationError = err; }
        );
      }

      if (translationError) throw translationError;

      const commentsResult = document.getElementById('commentsResult');
      if (commentsResult) commentsResult.style.display = 'block';

      this.summarizeCommentsAfterTranslation().catch(() => {});
      
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<span class="analyze-icon">🔍</span> Analyze';
      
    } catch (error) {
      console.error('Analysis error:', error);
      translationContent.innerHTML = `<div class="translation-error"><p><strong>Analysis failed:</strong></p><p>${error.message}</p></div>`;
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<span class="analyze-icon">🔍</span> Analyze';
    }
  }

  async summarizeCommentsAfterTranslation() {
    try {
      const commentsData = CommentProcessor.extractRedditComments();
      if (commentsData.totalComments === 0) {
        this.showCommentsError('No comments found.');
        return;
      }

      const settings = await chrome.storage.sync.get(['mode', 'backendAuthToken', 'aiProvider', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'targetLanguage']);
      const targetLanguage = settings.targetLanguage || 'zh';
      const mode = settings.mode || 'apiKey';

      this.showCommentsLoading();
      let summaryText = '';

      if (mode === 'backend') {
        const token = settings.backendAuthToken || '';
        const backendService = new window.BackendProxyService(token, this.getBackendBaseUrl());
        await backendService.summarizeCommentsStream(
          { post: this.currentPost, commentsData: commentsData },
          targetLanguage,
          (chunk) => {
            summaryText += chunk;
            this.updateCommentsContent(summaryText);
          },
          () => this.showCommentsComplete(),
          (error) => { throw error; }
        );
      } else {
        const aiProvider = settings.aiProvider || 'dashscope';
        let apiKey = settings[`${aiProvider}ApiKey`];
        if (!apiKey) {
          this.showCommentsError(`${aiProvider.toUpperCase()} API key not configured.`);
          return;
        }

        const service = AIServiceFactory.createService(aiProvider, apiKey);
        const analysisData = CommentProcessor.analyzeComments(commentsData);

        await service.summarizeCommentsStream(
          analysisData,
          targetLanguage,
          (chunk) => {
            summaryText += chunk;
            this.updateCommentsContent(summaryText);
          },
          () => this.showCommentsComplete(),
          (error) => this.showCommentsError(`Summarization failed: ${error.message}`)
        );
      }
    } catch (error) {
      this.showCommentsError(`Error: ${error.message}`);
    }
  }

  async savePost() {
    const saveBtn = document.querySelector('#saveBtn');
    try {
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="analyze-icon">⏳</span> Loading comments...';
      }

      await RedditScraper.loadAllComments((status) => {
        saveBtn.innerHTML = `<span class="analyze-icon">⏳</span> ${status}`;
      });

      if (saveBtn) saveBtn.innerHTML = '<span class="analyze-icon">💾</span> Saving...';

      const redditData = RedditScraper.extractRedditContent();
      this.currentPost = { ...redditData, url: window.location.href };
      
      const post = this.currentPost;
      if (!post) throw new Error('Could not extract post content');

      let imageBase64 = null;
      let galleryImagesBase64 = [];

      if (saveBtn) saveBtn.innerHTML = '<span class="analyze-icon">⏳</span> Downloading media...';

      if (post.galleryImages && post.galleryImages.length > 0) {
        const imagesToDownload = post.galleryImages.slice(0, 10);
        const results = await Promise.all(imagesToDownload.map(url => MediaDownloader.downloadMedia(url)));
        galleryImagesBase64 = results.filter(img => img !== null);
        if (galleryImagesBase64.length > 0) imageBase64 = galleryImagesBase64[0];
      } else if (post.imageUrl) {
        imageBase64 = await MediaDownloader.downloadMedia(post.imageUrl);
      }

      let videoBase64 = null;
      let videoPosterBase64 = null;

      if (post.videoPoster && post.videoPoster.startsWith('http')) {
        videoPosterBase64 = await MediaDownloader.downloadMedia(post.videoPoster);
      }

      const commentsData = CommentProcessor.extractRedditComments();
      const savedPost = {
        ...post,
        id: Date.now().toString(),
        savedAt: Date.now(),
        commentsData: commentsData,
        imageBase64: imageBase64,
        galleryImagesBase64: galleryImagesBase64,
        videoBase64: videoBase64,
        videoPoster: videoPosterBase64 || post.videoPoster
      };
      
      const result = await chrome.storage.local.get(['savedPosts']);
      const savedPosts = result.savedPosts || [];
      const index = savedPosts.findIndex(p => p.url === post.url);
      
      if (index !== -1) {
        savedPosts[index] = { ...savedPost, id: savedPosts[index].id, savedAt: savedPosts[index].savedAt };
      } else {
        savedPosts.unshift(savedPost);
      }
      
      await chrome.storage.local.set({ savedPosts });
      
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span class="analyze-icon">✅</span> Saved';
        setTimeout(() => { saveBtn.innerHTML = '<span class="analyze-icon">💾</span> Save Thread'; }, 2000);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post: ' + error.message);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span class="analyze-icon">💾</span> Save Thread';
      }
    }
  }

  downloadCommentsAsCSV() {
    const commentsData = CommentProcessor.extractRedditComments();
    if (commentsData.totalComments === 0) {
      alert('No comments found to download.');
      return;
    }

    const headers = ['Author', 'Time', 'Score', 'Thread Level', 'Is Reply', 'Comment', 'Permalink', 'Links'];
    const csvRows = [headers.join(',')];

    commentsData.comments.forEach(comment => {
      const row = [
        this.escapeCSV(comment.author),
        this.escapeCSV(comment.time),
        comment.score,
        comment.depth,
        comment.depth > 0 ? 'Yes' : 'No',
        this.escapeCSV(comment.content),
        this.escapeCSV('https://www.reddit.com' + comment.permalink),
        this.escapeCSV(comment.links.join('; '))
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reddit_comments_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  escapeCSV(str) {
    if (str === null || str === undefined) return '';
    const stringValue = String(str);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  showCommentsLoading() {
    const commentsResult = document.getElementById('commentsResult');
    if (commentsResult) {
      commentsResult.style.display = 'block';
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) contentDiv.innerHTML = '<div class="loading-text">Analyzing comments...</div>';
    }
  }

  updateCommentsContent(text) {
    const commentsResult = document.getElementById('commentsResult');
    if (commentsResult) {
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) {
        const processedText = CommentProcessor.addAnchorLinksToSummary(text);
        contentDiv.innerHTML = `<div class="summary-text">${CommentProcessor.markdownToHtml(processedText)}</div>`;
      }
    }
  }

  showCommentsComplete() {
    console.log('Comment summarization completed');
  }

  showCommentsError(message) {
    const commentsResult = document.getElementById('commentsResult');
    if (commentsResult) {
      commentsResult.style.display = 'block';
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) contentDiv.innerHTML = `<div class="error-text" style="color: #ff4444;">${CommentProcessor.escapeHtml(message)}</div>`;
    }
  }

  scrollToComment(commentId) {
    let commentElement = document.querySelector(`shreddit-comment[thingid="${commentId}"]`) ||
                        document.querySelector(`shreddit-comment[data-comment-id="${commentId}"]`) ||
                        document.querySelector(`shreddit-comment[data-testid="${commentId}"]`);
    
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      commentElement.classList.add('reddit-reader-2-highlighted-comment');
      setTimeout(() => { commentElement.classList.remove('reddit-reader-2-highlighted-comment'); }, 3000);
    }
  }

  showNonRedditContent() {
    const contentDiv = this.floatingPanel.querySelector('.reddit-reader-2-panel-content');
    contentDiv.innerHTML = `
      <div class="reddit-reader-2-welcome">
        <h4>Reddit Reader</h4>
        <p>Navigate to a Reddit post to see its content here.</p>
        <ul><li>reddit.com/r/subreddit/comments/...</li></ul>
      </div>
    `;
  }
}

// Initialize the extension
let redditReader2Instance = null;
if (!redditReader2Instance) {
  redditReader2Instance = new RedditReader2();
  window.redditReader2Instance = redditReader2Instance;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.action === 'ping') sendResponse({ ok: true });
});

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (!document.getElementById('reddit-reader-2-button')) {
      redditReader2Instance = new RedditReader2();
    } else {
      setTimeout(() => {
        if (redditReader2Instance && redditReader2Instance.floatingPanel) {
          redditReader2Instance.updatePanelContent();
        }
      }, 1000);
    }
  }
}).observe(document, { subtree: true, childList: true });
