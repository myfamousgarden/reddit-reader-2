class HistoryManager {
  constructor(options) {
    this.container = options.container;
    this.emptyState = options.emptyState;
  }

  async loadHistory() {
    try {
      const result = await chrome.storage.local.get(['redditHistory']);
      this.historyData = result.redditHistory || [];
      this.renderHistory(this.historyData);
    } catch (e) {
      console.error('Failed to load history:', e);
      this.container.innerHTML = '<div class="error-message">Failed to load history.</div>';
    }
  }

  filterHistory(query) {
    if (!this.historyData) return;
    
    const filtered = this.historyData.filter(item => {
      const title = (item.title || '').toLowerCase();
      return title.includes(query);
    });
    
    this.renderHistory(filtered);
  }

  renderHistory(history) {
    this.container.innerHTML = '';
    
    if (history.length === 0) {
      this.container.style.display = 'none';
      if (this.emptyState) {
        this.emptyState.style.display = 'flex';
        this.emptyState.querySelector('h3').textContent = 'No history yet';
        this.emptyState.querySelector('p').textContent = 'Threads you visit will appear here.';
      }
      return;
    }

    if (this.emptyState) {
      this.emptyState.style.display = 'none';
    }
    this.container.style.display = 'block'; // Block for normal flow
    
    // Group by Date
    const groupedHistory = this.groupByDate(history);
    
    Object.keys(groupedHistory).forEach(dateLabel => {
      // Date Header
      const header = document.createElement('div');
      header.className = 'history-date-header';
      header.textContent = dateLabel;
      this.container.appendChild(header);
      
      // Items for this date
      groupedHistory[dateLabel].forEach(item => {
        const row = this.createHistoryRow(item);
        this.container.appendChild(row);
      });
    });
  }

  groupByDate(history) {
    const groups = {};
    history.forEach(item => {
      const date = new Date(item.visitTime);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateLabel = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      if (date.toDateString() === today.toDateString()) {
        dateLabel = `Today - ${dateLabel}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateLabel = `Yesterday - ${dateLabel}`;
      }
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(item);
    });
    return groups;
  }

  createHistoryRow(item) {
    const row = document.createElement('div');
    row.className = 'history-row';
    
    const visitTime = new Date(item.visitTime);
    const timeStr = visitTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    let sourceLabel = 'reddit.com';
    if (item.subreddit) {
      sourceLabel = item.subreddit.startsWith('r/') ? '/' + item.subreddit : '/r/' + item.subreddit;
    } else {
      // Fallback: try to extract from URL
      const match = item.url.match(/\/r\/([^\/]+)/);
      if (match) {
        sourceLabel = '/r/' + match[1];
      } else {
        sourceLabel = new URL(item.url).hostname.replace('www.', '');
      }
    }

    row.innerHTML = `
      <div class="history-time">${timeStr}</div>
      <div class="history-main">
        <a href="${item.url}" target="_blank" class="history-title">${item.title || 'Untitled Thread'}</a>
        <span class="history-domain">${sourceLabel}</span>
      </div>
      <div class="history-actions">
        <button class="btn-icon-small delete-item" title="Remove from history">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    
    // Bind delete event
    row.querySelector('.delete-item').addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent row click if we add one later
      this.deleteItem(item.id);
    });

    return row;
  }
  
  async deleteItem(id) {
    try {
      const result = await chrome.storage.local.get(['redditHistory']);
      let history = result.redditHistory || [];
      history = history.filter(item => item.id !== id);
      await chrome.storage.local.set({ redditHistory: history });
      this.loadHistory(); // Reload to refresh UI
    } catch (e) {
      console.error('Failed to delete history item:', e);
    }
  }

  async clearHistory() {
      await chrome.storage.local.remove('redditHistory');
      this.loadHistory();
  }
}
