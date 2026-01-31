/**
 * Logic for processing Reddit comments, markdown conversion, and anchor links.
 * Reused from original content.js per requirement.
 */
class CommentProcessor {
  // Escape HTML to prevent XSS
  static escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Convert markdown to HTML
  static markdownToHtml(text) {
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
  static extractRedditComments() {
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
      const permalink = commentEl.getAttribute('permalink') || '';
      
      // Extract timestamp
      let time = '';
      const timeElement = commentEl.querySelector('time');
      if (timeElement) {
        time = timeElement.getAttribute('datetime') || timeElement.getAttribute('title') || timeElement.textContent;
      }
      
      // Extract comment content and links
      const contentElement = commentEl.querySelector('[id$="-post-rtjson-content"]');
      let content = '';
      const links = [];
      
      if (contentElement) {
        // Clone the element to avoid modifying the actual DOM and to filter out ads
        const clonedContent = contentElement.cloneNode(true);
        
        // Remove ad elements specified by user requirements
        const adTags = ['shreddit-dynamic-ad-link', 'shreddit-comment-tree-ad', 'ad-format-content'];
        adTags.forEach(tagName => {
          const adElements = clonedContent.querySelectorAll(tagName);
          adElements.forEach(el => el.remove());
        });

        // Get text content, removing any tracking elements
        const textElements = clonedContent.querySelectorAll('p');
        content = Array.from(textElements).map(p => p.textContent.trim()).join('\n').trim();
        
        // Get links from cleaned content
        const linkElements = clonedContent.querySelectorAll('a');
        linkElements.forEach(a => {
            if (a.href) links.push(a.href);
        });
      }
      
      if (content && author && thingId) {
        comments.push({
          id: thingId,
          author: author,
          content: content,
          score: score,
          depth: depth,
          isOP: author === opUsername,
          time: time,
          permalink: permalink,
          links: links
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
  static analyzeComments(commentsData) {
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

  // Add anchor links to comment summaries
  static addAnchorLinksToSummary(text) {
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
  static getAvailableUsernames() {
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
  static escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Find comment element by author name
  static findCommentByAuthor(username) {
    const commentElements = document.querySelectorAll('shreddit-comment[author]');
    for (const element of commentElements) {
      if (element.getAttribute('author') === username) {
        return element;
      }
    }
    return null;
  }
}

if (typeof window !== 'undefined') {
  window.CommentProcessor = CommentProcessor;
}
