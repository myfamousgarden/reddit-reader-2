/**
 * Logic for extracting content from Reddit pages.
 */
class RedditScraper {
  // Check if current page is a Reddit post
  static isRedditPost() {
    const url = window.location.href;
    return /^https?:\/\/(www\.)?reddit\.com\/r\/[^\/]+\/comments\//.test(url);
  }

  // Extract Reddit post content
  static extractRedditContent() {
    // Title selectors
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
            break;
          }
        }
      } catch (error) {
        console.error(`Error with selector ${selector}:`, error);
      }
    }

    // Content selectors
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
            break;
          }
        }
      } catch (error) {
        console.error(`Error with selector ${selector}:`, error);
      }
    }

    // Image selector
    let imageUrl = "";
    let galleryImages = [];
    
    try {
      // Check for gallery first
      const galleryCarousel = document.querySelector('gallery-carousel');
      if (galleryCarousel) {
        const galleryItems = galleryCarousel.querySelectorAll('li[slot^="page-"]');
        galleryItems.forEach(item => {
          const img = item.querySelector('img.media-lightbox-img') || item.querySelector('img');
          if (img && img.src) {
            galleryImages.push(img.src);
          }
        });
        
        galleryImages = [...new Set(galleryImages)];
        
        if (galleryImages.length > 0) {
          imageUrl = galleryImages[0];
        }
      }

      if (galleryImages.length === 0) {
        const imgElement = document.getElementById('post-image');
        if (imgElement && imgElement.src) {
          imageUrl = imgElement.src;
        } else {
          const shredditPost = document.querySelector('shreddit-post');
          if (shredditPost && shredditPost.getAttribute('content-href')) {
            const href = shredditPost.getAttribute('content-href');
            if (href.match(/\.(jpeg|jpg|gif|png|webp)$/i) || href.includes('i.redd.it') || href.includes('preview.redd.it')) {
              imageUrl = href;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error extracting image:", error);
    }

    // Video selector
    let videoUrl = "";
    let videoPoster = "";
    try {
      const player = document.querySelector('shreddit-player');
      if (player) {
        videoPoster = player.getAttribute('poster') || "";
        const preview = player.getAttribute('preview');
        const src = player.getAttribute('src');
        
        if (src) {
          videoUrl = src;
        } else if (preview && preview.includes('.mp4')) {
          videoUrl = preview;
        }
      }
    } catch (error) {
      console.error("Error extracting video:", error);
    }

    return {
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl,
      galleryImages: galleryImages,
      videoUrl: videoUrl,
      videoPoster: videoPoster,
      subreddit: this.extractSubreddit()
    };
  }

  static extractSubreddit() {
    const subredditElement = document.querySelector('shreddit-post[subreddit-prefixed-name]');
    if (subredditElement) {
      return subredditElement.getAttribute('subreddit-prefixed-name');
    }
    // Fallback from URL
    const match = window.location.href.match(/\/r\/([^\/]+)/);
    return match ? `r/${match[1]}` : 'r/reddit';
  }

  // Load all comments by scrolling to bottom
  static async loadAllComments(onStatusUpdate) {
    let moreCommentsPartial = document.querySelector('faceplate-partial[id="top-level-more-comments-partial"]');
    let loadMoreTracker = document.querySelector('faceplate-tracker[source="post_detail"][action="click"][noun="load_more_comments"]');
    
    let retryCount = 0;
    const maxRetries = 50;
    
    while ((moreCommentsPartial || loadMoreTracker) && retryCount < maxRetries) {
      if (onStatusUpdate) {
        onStatusUpdate('Loading comments...');
      }
      
      if (moreCommentsPartial) {
        window.scrollTo(0, document.body.scrollHeight);
      } else if (loadMoreTracker) {
        const button = loadMoreTracker.querySelector('button');
        if (button) {
          button.click();
        } else {
          loadMoreTracker.click();
        }
        loadMoreTracker.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      moreCommentsPartial = document.querySelector('faceplate-partial[id="top-level-more-comments-partial"]');
      loadMoreTracker = document.querySelector('faceplate-tracker[source="post_detail"][action="click"][noun="load_more_comments"]');
      retryCount++;
    }
  }
}

if (typeof window !== 'undefined') {
  window.RedditScraper = RedditScraper;
}
