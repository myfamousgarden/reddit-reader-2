// Reddit Reader 2 - Content Script
class RedditReader2 {
  constructor() {
    this.isInitialized = false;
    this.floatingButton = null;
    this.floatingPanel = null;
    this.isPanelVisible = false;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createUI());
    } else {
      this.createUI();
    }
    
    this.isInitialized = true;
  }

  createUI() {
    this.createFloatingButton();
    this.createFloatingPanel();
    this.setupEventListeners();
  }

  createFloatingButton() {
    // Remove existing button if any
    if (this.floatingButton) {
      this.floatingButton.remove();
    }

    this.floatingButton = document.createElement('div');
    this.floatingButton.id = 'reddit-reader-2-button';
    this.floatingButton.className = 'reddit-reader-2-floating-button';
    this.floatingButton.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Stylized Reddit Reader Icon: Chat bubble -->
        <path d="M64 28C44.1 28 28 41.4 28 58C28 69 36.3 78.6 48.8 83.8L44.5 96L58.5 87.5C60.3 87.8 62.1 88 64 88C83.9 88 100 74.6 100 58C100 41.4 83.9 28 64 28Z" fill="white"/>
        <!-- Lines representing text/reading -->
        <rect x="44" y="50" width="40" height="6" rx="3" fill="#667eea"/>
        <rect x="44" y="64" width="28" height="6" rx="3" fill="#667eea"/>
        <!-- AI Sparkle elements -->
        <path d="M100 20L103 32L115 35L103 38L100 50L97 38L85 35L97 32L100 20Z" fill="#FFD700" stroke="white" stroke-width="4"/>
        <path d="M30 30L32 24L34 30L40 32L34 34L32 40L30 34L24 32L30 30Z" fill="white"/>
      </svg>
    `;
    
    // Position the button
    this.floatingButton.style.position = 'fixed';
    this.floatingButton.style.top = '50%';
    this.floatingButton.style.right = '20px';
    this.floatingButton.style.transform = 'translateY(-50%)';
    this.floatingButton.style.zIndex = '10000';
    this.floatingButton.style.cursor = 'move';
    
    document.body.appendChild(this.floatingButton);
  }

  createFloatingPanel() {
    // Remove existing panel if any
    if (this.floatingPanel) {
      this.floatingPanel.remove();
    }

    this.floatingPanel = document.createElement('div');
    this.floatingPanel.id = 'reddit-reader-2-panel';
    this.floatingPanel.className = 'reddit-reader-2-floating-panel';
    this.floatingPanel.innerHTML = `
      <div class="reddit-reader-2-panel-header">
        <h3>Reddit Reader 2</h3>
        <button class="reddit-reader-2-close-btn" id="reddit-reader-2-close">×</button>
      </div>
      <div class="reddit-reader-2-panel-content">
        <!-- Content will be populated by updatePanelContent() -->
      </div>
    `;
    
    // Position the panel (initially hidden)
    this.floatingPanel.style.position = 'fixed';
    this.floatingPanel.style.top = '0px';
    this.floatingPanel.style.right = '-500px'; // Hidden initially
    this.floatingPanel.style.width = '480px';
    this.floatingPanel.style.height = '100vh';
    this.floatingPanel.style.zIndex = '10001';
    this.floatingPanel.style.transition = 'right 0.3s ease-in-out';
    
    document.body.appendChild(this.floatingPanel);
    
    // Update panel content based on current page
    this.updatePanelContent();
  }

  setupEventListeners() {
    // Button click to toggle panel
    this.floatingButton.addEventListener('click', (e) => {
      if (!this.isDragging) {
        this.togglePanel();
      }
    });

    // Button drag functionality
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
        
        if (deltaX > 5 || deltaY > 5) {
          this.isDragging = true;
        }

        if (this.isDragging) {
          const newX = e.clientX - this.dragOffset.x;
          const newY = e.clientY - this.dragOffset.y;
          
          // Keep button within viewport
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
        
        // Reset dragging state after a short delay to prevent click event
        setTimeout(() => {
          this.isDragging = false;
        }, 100);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });

    // Close panel button
    const closeBtn = this.floatingPanel.querySelector('#reddit-reader-2-close');
    closeBtn.addEventListener('click', () => {
      this.hidePanel();
    });

    // Note: Panel will only close when user clicks the close button
    // No auto-hide when clicking outside

    // Handle window resize
    window.addEventListener('resize', () => {
      this.adjustPositions();
    });

    // Handle comment anchor clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('comment-anchor')) {
        e.preventDefault();
        const commentId = e.target.getAttribute('data-comment-id');
        this.scrollToComment(commentId);
      }
    });
  }

  togglePanel() {
    if (this.isPanelVisible) {
      this.hidePanel();
    } else {
      this.showPanel();
    }
  }

  showPanel() {
    this.floatingPanel.style.right = '0px';
    this.isPanelVisible = true;
    this.floatingButton.classList.add('active');
  }

  hidePanel() {
    this.floatingPanel.style.right = '-500px';
    this.isPanelVisible = false;
    this.floatingButton.classList.remove('active');
  }

  adjustPositions() {
    // Ensure button stays within viewport after resize
    const buttonRect = this.floatingButton.getBoundingClientRect();
    const maxX = window.innerWidth - this.floatingButton.offsetWidth;
    const maxY = window.innerHeight - this.floatingButton.offsetHeight;
    
    if (buttonRect.right > window.innerWidth) {
      this.floatingButton.style.left = maxX + 'px';
      this.floatingButton.style.right = 'auto';
    }
    
    if (buttonRect.bottom > window.innerHeight) {
      this.floatingButton.style.top = maxY + 'px';
      this.floatingButton.style.transform = 'none';
    }
    
    // Ensure panel height matches window height
    if (this.floatingPanel) {
      this.floatingPanel.style.height = '100vh';
    }
  }

  // Check if current page is a Reddit post
  isRedditPost() {
    const url = window.location.href;
    return /^https?:\/\/(www\.)?reddit\.com\/r\/[^\/]+\/comments\//.test(url);
  }

  // Extract Reddit post content
  extractRedditContent() {
    // Title selectors from example code
    const titleSelectors = [
      "shreddit-post[post-title]", 
      'h1[data-testid="post-title"]', 
      'div[data-testid="post-container"] h1', 
      'div[data-test-id="post-content"] h1', 
      'div[slot="title"]'
    ];
    
    let title = "";
    for (const selector of titleSelectors) {
      try {
        const element = document.querySelector(selector);
        if (element) {
          if (selector === "shreddit-post[post-title]") {
            title = element.getAttribute("post-title") || "";
          } else {
            title = element.textContent || "";
          }
          if (title.trim()) {
            console.log("Found title:", title);
            break;
          }
        }
      } catch (error) {
        console.error(`Error with selector ${selector}:`, error);
      }
    }

    // Content selectors from example code
    const contentSelectors = [
      'shreddit-post div[slot="text-body"] div.md', 
      'div[data-click-id="text"] div.md', 
      'div[data-test-id="post-content"] div[data-click-id="text"]', 
      'div[slot="text-body"]'
    ];
    
    let content = "";
    for (const selector of contentSelectors) {
      try {
        const element = document.querySelector(selector);
        if (element) {
          content = element.textContent || "";
          if (content.trim()) {
            console.log("Found content:", content);
            break;
          }
        }
      } catch (error) {
        console.error(`Error with selector ${selector}:`, error);
      }
    }

    return {
      title: title.trim(),
      content: content.trim()
    };
  }

  // Update panel content with Reddit post
  updatePanelContent() {
    if (!this.isRedditPost()) {
      this.showNonRedditContent();
      return;
    }

    const redditData = this.extractRedditContent();
    const contentDiv = this.floatingPanel.querySelector('.reddit-reader-2-panel-content');
    
    if (redditData.title || redditData.content) {
      contentDiv.innerHTML = `
        <div class="reddit-reader-2-post">
          <div class="reddit-reader-2-analyze-section">
            <button class="reddit-reader-2-analyze-btn" id="analyzeBtn">
              <span class="analyze-icon">🔍</span>
              Analyze
            </button>
            <div class="reddit-reader-2-analysis-result" id="analysisResult" style="display: none;">
              <div class="reddit-reader-2-translation-result" id="translationResult">
                <h5>Translation:</h5>
                <div class="translation-content"></div>
              </div>
              <div class="reddit-reader-2-comments-result" id="commentsResult" style="display: none;">
                <h5>Comments Summary:</h5>
                <div class="comments-content"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add event listener for analyze button
      const analyzeBtn = contentDiv.querySelector('#analyzeBtn');
      if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
          this.analyzePost(redditData);
        });
      }
    } else {
      contentDiv.innerHTML = `
        <div class="reddit-reader-2-loading">
          <h4>Reddit Post</h4>
          <p>Loading post content...</p>
        </div>
      `;
    }
  }

  // Analyze Reddit post (translate + summarize comments)
  async analyzePost(redditData) {
    const analyzeBtn = document.querySelector('#analyzeBtn');
    const analysisResult = document.querySelector('#analysisResult');
    const translationResult = document.querySelector('#translationResult');
    const translationContent = translationResult.querySelector('.translation-content');
    
    try {
      // Update button state
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = '<span class="analyze-icon">⏳</span> Analyzing...';
      
      // Show analysis result section
      analysisResult.style.display = 'block';
      translationResult.style.display = 'block';
      translationContent.innerHTML = '<div class="translation-loading">Connecting to translation service...</div>';
      
      // Prepare content for translation
      const contentToTranslate = `Title: ${redditData.title}\n\nContent: ${redditData.content}`;
      
      // Get settings from Chrome storage
      const settings = await chrome.storage.sync.get(['dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'aiProvider', 'targetLanguage']);
      const aiProvider = settings.aiProvider || 'dashscope'; // Default to DashScope
      const targetLanguage = settings.targetLanguage || 'zh'; // Default to Chinese
      
      // Get API key based on provider
      let apiKey;
      switch (aiProvider) {
        case 'dashscope':
          apiKey = settings.dashscopeApiKey;
          break;
        case 'glm':
          apiKey = settings.glmApiKey;
          break;
        case 'openai':
          apiKey = settings.openaiApiKey;
          break;
        case 'deepseek':
          apiKey = settings.deepseekApiKey;
          break;
        default:
          apiKey = settings.dashscopeApiKey; // Fallback
      }
      
      // Create AI service instance with API key
      const aiService = AIServiceFactory.createService(aiProvider, apiKey);
      
      // Validate API key
      if (!aiService.validateApiKey(apiKey)) {
        throw new Error(`${aiProvider} API key not configured. Please set it in the extension popup.`);
      }
      
      // Clear loading message and prepare for streaming
      translationContent.innerHTML = '<div class="translation-text"></div>';
      const translationTextDiv = translationContent.querySelector('.translation-text');
      
      let translatedText = '';
      
      // Step 1: Translate the post first
      await aiService.translateStream(contentToTranslate, targetLanguage, (chunk) => {
        translatedText += chunk;
        translationTextDiv.textContent = translatedText;
        
        // Auto-scroll to bottom
        translationResult.scrollTop = translationResult.scrollHeight;
      });
      
      // Step 2: After translation is complete, show Comments Summary section and start summarization
      setTimeout(async () => {
        // Show Comments Summary section
        const commentsResult = document.getElementById('commentsResult');
        if (commentsResult) {
          commentsResult.style.display = 'block';
        }
        
        // Start comments summarization
        await this.summarizeCommentsAfterTranslation();
      }, 500); // Small delay to ensure translation UI is updated
      
      // Update button state to complete
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<span class="analyze-icon">🔍</span> Analyze';
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Show error in translation content
      translationContent.innerHTML = `
        <div class="translation-error">
          <p><strong>Analysis failed:</strong></p>
          <p>${error.message}</p>
        </div>
      `;
      
      // Reset button state
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<span class="analyze-icon">🔍</span> Analyze';
    }
  }

  // Translate Reddit post using DashScope API
  async translatePost(redditData) {
    const translateBtn = document.querySelector('#translateBtn');
    const translationResult = document.querySelector('#translationResult');
    const translationContent = translationResult.querySelector('.translation-content');
    
    try {
      // Update button state
      translateBtn.disabled = true;
      translateBtn.innerHTML = '<span class="translate-icon">⏳</span> Translating...';
      
      // Show translation result area
      translationResult.style.display = 'block';
      translationContent.innerHTML = '<div class="translation-loading">Connecting to translation service...</div>';
      
      // Prepare content for translation
      const contentToTranslate = `Title: ${redditData.title}\n\nContent: ${redditData.content}`;
      
      // Get settings from Chrome storage
      const settings = await chrome.storage.sync.get(['dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'aiProvider', 'targetLanguage']);
      const aiProvider = settings.aiProvider || 'dashscope'; // Default to DashScope
      const targetLanguage = settings.targetLanguage || 'zh'; // Default to Chinese
      
      // Get API key based on provider
      let apiKey;
      switch (aiProvider) {
        case 'dashscope':
          apiKey = settings.dashscopeApiKey;
          break;
        case 'glm':
          apiKey = settings.glmApiKey;
          break;
        case 'openai':
          apiKey = settings.openaiApiKey;
          break;
        case 'deepseek':
          apiKey = settings.deepseekApiKey;
          break;
        default:
          apiKey = settings.dashscopeApiKey; // Fallback
      }
      
      // Debug: Log API key status (without exposing the actual key)
      console.log('Translation settings:', {
        hasApiKey: !!apiKey,
        keyLength: apiKey ? apiKey.length : 0,
        provider: aiProvider,
        targetLanguage: targetLanguage
      });
      
      // Create AI service instance with API key
      const aiService = AIServiceFactory.createService(aiProvider, apiKey);
      
      // Validate API key
      if (!aiService.validateApiKey(apiKey)) {
        throw new Error(`${aiProvider} API key not configured. Please set it in the extension popup.`);
      }
      
      // Clear loading message and prepare for streaming
      translationContent.innerHTML = '<div class="translation-text"></div>';
      const translationTextDiv = translationContent.querySelector('.translation-text');
      
      let translatedText = '';
      
      // Use AI service for translation with streaming callback
      await aiService.translateStream(contentToTranslate, targetLanguage, (chunk) => {
        translatedText += chunk;
        translationTextDiv.textContent = translatedText;
        
        // Auto-scroll to bottom
        translationResult.scrollTop = translationResult.scrollHeight;
      });

    } catch (error) {
      console.error('Translation error:', error);
      translationContent.innerHTML = `
        <div class="translation-error">
          <p>Translation failed: ${error.message}</p>
          <p>Please check your API key configuration or try again later.</p>
        </div>
      `;
    } finally {
      // Reset button state
      translateBtn.disabled = false;
      translateBtn.innerHTML = '<span class="translate-icon">🌐</span> Translate';
    }
  }

  // Show content for non-Reddit pages
  showNonRedditContent() {
    const contentDiv = this.floatingPanel.querySelector('.reddit-reader-2-panel-content');
    contentDiv.innerHTML = `
      <div class="reddit-reader-2-welcome">
        <h4>Reddit Reader 2</h4>
        <p>Navigate to a Reddit post to see its content here.</p>
        <p>This extension works on Reddit post pages like:</p>
        <ul>
          <li>reddit.com/r/subreddit/comments/...</li>
        </ul>
      </div>
    `;
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Convert markdown to HTML
  markdownToHtml(text) {
    if (!text) return '';
    
    // First, preserve anchor links by replacing them with placeholders
    const anchorPlaceholders = [];
    let html = text.replace(/<a[^>]*class="comment-anchor"[^>]*>.*?<\/a>/g, (match) => {
      const placeholder = `§§ANCHOR${anchorPlaceholders.length}§§`;
      anchorPlaceholders.push(match);
      return placeholder;
    });
    
    // Escape HTML to prevent XSS (but anchors are already preserved)
    html = this.escapeHtml(html);
    
    // Convert markdown syntax to HTML
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      return '<ul>' + match + '</ul>';
    });
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Line breaks - aggressively reduce empty lines
    html = html.replace(/\n{2,}/g, '\n'); // Replace 2+ consecutive newlines with 1
    html = html.replace(/\n/g, '<br>'); // Single newlines become single breaks
    
    // Remove excessive breaks after HTML tags
    html = html.replace(/(<\/h[1-6]>)<br>/g, '$1');
    html = html.replace(/(<\/li>)<br>/g, '$1');
    html = html.replace(/(<\/ul>)<br>/g, '$1');
    html = html.replace(/(<\/ol>)<br>/g, '$1');
    html = html.replace(/(<\/pre>)<br>/g, '$1');
    
    // Restore anchor links
    anchorPlaceholders.forEach((anchor, index) => {
      const placeholder = `§§ANCHOR${index}§§`;
      html = html.replace(placeholder, anchor);
    });
    
    return html;
  }

  // Extract Reddit comments from the page
  extractRedditComments() {
    const comments = [];
    const commentElements = document.querySelectorAll('shreddit-comment[author]');
    
    // Get OP username from post author
    const postAuthorElement = document.querySelector('shreddit-post[author]');
    const opUsername = postAuthorElement ? postAuthorElement.getAttribute('author') : null;
    
    commentElements.forEach(commentEl => {
      const author = commentEl.getAttribute('author');
      const thingId = commentEl.getAttribute('thingid');
      const score = parseInt(commentEl.getAttribute('score')) || 0;
      const depth = parseInt(commentEl.getAttribute('depth')) || 0;
      
      // Extract comment content
      const contentElement = commentEl.querySelector('[id$="-post-rtjson-content"]');
      let content = '';
      if (contentElement) {
        // Get text content, removing any tracking elements
        const textElements = contentElement.querySelectorAll('p');
        content = Array.from(textElements).map(p => p.textContent.trim()).join('\n').trim();
      }
      
      if (content && author && thingId) {
        comments.push({
          id: thingId,
          author: author,
          content: content,
          score: score,
          depth: depth,
          isOP: author === opUsername
        });
      }
    });
    
    return {
      comments: comments,
      opUsername: opUsername,
      totalComments: comments.length
    };
  }

  // Analyze comments for summarization
  analyzeComments(commentsData) {
    const { comments, opUsername } = commentsData;
    
    // Filter OP comments
    const opComments = comments.filter(comment => comment.isOP);
    
    // Count comments by user and calculate engagement
    const userStats = {};
    comments.forEach(comment => {
      if (!comment.isOP) { // Exclude OP from user stats
        if (!userStats[comment.author]) {
          userStats[comment.author] = {
            author: comment.author,
            commentCount: 0,
            totalScore: 0,
            comments: []
          };
        }
        userStats[comment.author].commentCount++;
        userStats[comment.author].totalScore += comment.score;
        userStats[comment.author].comments.push(comment);
      }
    });
    
    // Sort users by engagement (comment count + average score)
    const topUsers = Object.values(userStats)
      .map(user => ({
        ...user,
        avgScore: user.totalScore / user.commentCount,
        engagement: user.commentCount + (user.totalScore / user.commentCount)
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10); // Top 10 users
    
    return {
      opComments: opComments,
      topUsers: topUsers,
      totalComments: comments.length,
      opUsername: opUsername
    };
  }

  // Summarize Reddit comments after translation is complete
  async summarizeCommentsAfterTranslation() {
    try {
      console.log('Starting comment summarization after translation...');
      
      // Extract comments from the page
      const commentsData = this.extractRedditComments();
      console.log('Extracted comments:', commentsData);
      
      if (commentsData.totalComments === 0) {
        this.showCommentsError('No comments found on this post.');
        return;
      }

      // Analyze comments
      const analysisData = this.analyzeComments(commentsData);
      console.log('Comments analysis:', analysisData);

      // Get settings
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(['aiProvider', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'targetLanguage'], resolve);
      });

      const aiService = settings.aiProvider || 'dashscope';
      const targetLanguage = settings.targetLanguage || 'zh';
      console.log('Using AI service:', aiService, 'Target language:', targetLanguage);

      // Get API key based on service
      let apiKey;
      if (aiService === 'dashscope') {
        apiKey = settings.dashscopeApiKey;
      } else if (aiService === 'glm') {
        apiKey = settings.glmApiKey;
      } else if (aiService === 'openai') {
        apiKey = settings.openaiApiKey;
      } else if (aiService === 'deepseek') {
        apiKey = settings.deepseekApiKey;
      }

      if (!apiKey) {
        this.showCommentsError(`${aiService.toUpperCase()} API key not configured. Please set it in the extension popup.`);
        return;
      }

      // Create AI service instance
      const service = window.AIServiceFactory.createService(aiService, apiKey);
      
      // Show loading state for comments
      this.showCommentsLoading();

      // Start streaming summarization
      let summaryText = '';
      await service.summarizeCommentsStream(
        analysisData,
        targetLanguage,
        (chunk) => {
          summaryText += chunk;
          this.updateCommentsContent(summaryText);
        },
        (finalText) => {
          console.log('Comment summarization completed');
          this.showCommentsComplete();
        },
        (error) => {
          console.error('Comment summarization error:', error);
          this.showCommentsError(`Summarization failed: ${error.message}`);
        }
      );

    } catch (error) {
      console.error('Comment summarization error:', error);
      this.showCommentsError(`Error: ${error.message}`);
    }
  }

  // Summarize Reddit comments using AI service
  async summarizeComments() {
    try {
      console.log('Starting comment summarization...');
      
      // Extract comments from the page
      const commentsData = this.extractRedditComments();
      console.log('Extracted comments:', commentsData);
      
      if (commentsData.totalComments === 0) {
        this.showCommentsError('No comments found on this post.');
        return;
      }

      // Analyze comments
      const analysisData = this.analyzeComments(commentsData);
      console.log('Comments analysis:', analysisData);

      // Get settings
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(['aiProvider', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'targetLanguage'], resolve);
      });

      const aiService = settings.aiProvider || 'dashscope';
      const targetLanguage = settings.targetLanguage || 'zh';
      console.log('Using AI service:', aiService, 'Target language:', targetLanguage);

      // Get API key based on service
      let apiKey;
      if (aiService === 'dashscope') {
        apiKey = settings.dashscopeApiKey;
      } else if (aiService === 'glm') {
        apiKey = settings.glmApiKey;
      } else if (aiService === 'openai') {
        apiKey = settings.openaiApiKey;
      } else if (aiService === 'deepseek') {
        apiKey = settings.deepseekApiKey;
      }

      if (!apiKey) {
        this.showCommentsError(`${aiService.toUpperCase()} API key not configured. Please set it in the extension popup.`);
        return;
      }

      // Create AI service instance
      const service = window.AIServiceFactory.createService(aiService, apiKey);
      
      // Show loading state
      this.showCommentsLoading();

      // Start streaming summarization
      let summaryText = '';
      await service.summarizeCommentsStream(
        analysisData,
        targetLanguage,
        (chunk) => {
          summaryText += chunk;
          this.updateCommentsContent(summaryText);
        },
        (finalText) => {
          console.log('Comment summarization completed');
          this.showCommentsComplete();
        },
        (error) => {
          console.error('Comment summarization error:', error);
          this.showCommentsError(`Summarization failed: ${error.message}`);
        }
      );

    } catch (error) {
      console.error('Comment summarization error:', error);
      this.showCommentsError(`Error: ${error.message}`);
    }
  }

  showCommentsLoading() {
    const commentsResult = document.getElementById('commentsResult');
    const commentsBtn = document.getElementById('summarizeCommentsBtn');
    
    if (commentsResult && commentsBtn) {
      commentsResult.style.display = 'block';
      commentsBtn.disabled = true;
      commentsBtn.innerHTML = '<span class="comments-icon">⏳</span> Summarizing...';
      
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) {
        contentDiv.innerHTML = '<div class="loading-text">Analyzing comments...</div>';
      }
    }
  }

  updateCommentsContent(text) {
    const commentsResult = document.getElementById('commentsResult');
    if (commentsResult) {
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) {
        // Process the text to add anchor links
        const processedText = this.addAnchorLinksToSummary(text);
        contentDiv.innerHTML = `<div class="summary-text">${this.markdownToHtml(processedText)}</div>`;
      }
    }
  }

  // Add anchor links to comment summaries
  addAnchorLinksToSummary(text) {
    if (!text) return text;
    
    // Get all available usernames from comments
    const availableUsers = this.getAvailableUsernames();
    
    if (availableUsers.length === 0) {
      return text;
    }
    
    // Create a more comprehensive pattern to match various username formats
    let processedText = text;
    
    availableUsers.forEach(username => {
      // Create patterns for different mention formats
      const patterns = [
        new RegExp(`\\*\\*${this.escapeRegex(username)}\\*\\*`, 'gi'), // **username** (markdown bold)
        new RegExp(`@${this.escapeRegex(username)}\\b`, 'gi'),
        new RegExp(`u/${this.escapeRegex(username)}\\b`, 'gi'),
        new RegExp(`\\b${this.escapeRegex(username)}\\b(?=\\s*:)`, 'gi'), // username followed by colon
        new RegExp(`\\b${this.escapeRegex(username)}\\b(?=\\s*说)`, 'gi'), // username followed by "说" (Chinese)
        new RegExp(`\\b${this.escapeRegex(username)}\\b(?=\\s*表示)`, 'gi'), // username followed by "表示" (Chinese)
        new RegExp(`\\b${this.escapeRegex(username)}\\b(?=\\s*认为)`, 'gi'), // username followed by "认为" (Chinese)
        new RegExp(`\\b${this.escapeRegex(username)}\\b(?=\\s*提到)`, 'gi'), // username followed by "提到" (Chinese)
      ];
      
      const commentElement = this.findCommentByAuthor(username);
      if (commentElement) {
        const commentId = commentElement.getAttribute('thingid') || 
                         commentElement.getAttribute('data-comment-id') || 
                         commentElement.getAttribute('data-testid') ||
                         `comment-${username}`;
        const anchorLink = ` <a href="#" class="comment-anchor" data-comment-id="${commentId}" title="Jump to ${username}'s comment">🔗</a>`;
        
        patterns.forEach(pattern => {
          processedText = processedText.replace(pattern, (match) => {
            // Avoid adding multiple anchors to the same username
            if (match.includes('🔗')) {
              return match;
            }
            return match + anchorLink;
          });
        });
      }
    });
    
    return processedText;
  }

  // Get all available usernames from comments
  getAvailableUsernames() {
    const usernames = [];
    const commentElements = document.querySelectorAll('shreddit-comment[author]');
    
    commentElements.forEach(element => {
      const author = element.getAttribute('author');
      if (author && !usernames.includes(author)) {
        usernames.push(author);
      }
    });
    
    return usernames;
  }

  // Escape special regex characters
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Find comment element by author name
  findCommentByAuthor(username) {
    const commentElements = document.querySelectorAll('shreddit-comment[author]');
    for (const element of commentElements) {
      if (element.getAttribute('author') === username) {
        return element;
      }
    }
    return null;
  }

  // Scroll to specific comment by ID
  scrollToComment(commentId) {
    let commentElement = document.querySelector(`shreddit-comment[thingid="${commentId}"]`) ||
                        document.querySelector(`shreddit-comment[data-comment-id="${commentId}"]`) ||
                        document.querySelector(`shreddit-comment[data-testid="${commentId}"]`);
    
    if (commentElement) {
      // Scroll to the comment with smooth behavior
      commentElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });

      // Highlight the comment temporarily
      this.highlightComment(commentElement);
    }
  }

  // Highlight comment temporarily
  highlightComment(commentElement) {
    // Add highlight class
    commentElement.classList.add('reddit-reader-2-highlighted-comment');
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      commentElement.classList.remove('reddit-reader-2-highlighted-comment');
    }, 3000);
  }

  showCommentsComplete() {
    const commentsBtn = document.getElementById('summarizeCommentsBtn');
    if (commentsBtn) {
      commentsBtn.disabled = false;
      commentsBtn.innerHTML = '<span class="comments-icon">💬</span> Summarize Comments';
    }
  }

  showCommentsError(message) {
    const commentsResult = document.getElementById('commentsResult');
    const commentsBtn = document.getElementById('summarizeCommentsBtn');
    
    if (commentsResult && commentsBtn) {
      commentsResult.style.display = 'block';
      commentsBtn.disabled = false;
      commentsBtn.innerHTML = '<span class="comments-icon">💬</span> Summarize Comments';
      
      const contentDiv = commentsResult.querySelector('.comments-content');
      if (contentDiv) {
        contentDiv.innerHTML = `<div class="error-text" style="color: #ff4444;">${this.escapeHtml(message)}</div>`;
      }
    }
  }
}

// Initialize the extension
let redditReader2Instance = null;

// Ensure we only create one instance
if (!redditReader2Instance) {
  redditReader2Instance = new RedditReader2();
  // Make instance available globally for testing
  window.redditReader2Instance = redditReader2Instance;
}

// Handle dynamic content loading (for SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // Reinitialize if needed for new pages
    if (!document.getElementById('reddit-reader-2-button')) {
      redditReader2Instance = new RedditReader2();
    } else {
      // Update panel content when URL changes
      setTimeout(() => {
        if (redditReader2Instance && redditReader2Instance.floatingPanel) {
          redditReader2Instance.updatePanelContent();
        }
      }, 1000); // Wait for page content to load
    }
  }
}).observe(document, { subtree: true, childList: true });
