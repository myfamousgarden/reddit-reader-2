class BackendProxyService {
  constructor(token, baseUrl) {
    this.token = token || '';
    this.baseUrl = baseUrl || '';
  }

  validateToken() {
    return this.token && String(this.token).trim().length > 0;
  }

  async translateStream(post, targetLanguage, onChunk, onComplete, onError) {
    if (!this.validateToken()) {
      const err = new Error('Login required');
      if (onError) onError(err);
      throw err;
    }

    const base = this.baseUrl.replace(/\/$/, '');
    const url = `${base}/api/extension/translate`;
    const requestBody = {
      post: {
        title: post && post.title ? String(post.title) : '',
        content: post && post.content ? String(post.content) : '',
        url: post && post.url ? String(post.url) : ''
      },
      targetLanguage: targetLanguage
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'text/event-stream'
    };

    return await makeStreamingRequest('backend', this.token, url, headers, requestBody, onChunk, onComplete, onError);
  }

  async summarizeCommentsStream(payload, targetLanguage, onChunk, onComplete, onError) {
    if (!this.validateToken()) {
      const err = new Error('Login required');
      if (onError) onError(err);
      throw err;
    }

    const base = this.baseUrl.replace(/\/$/, '');
    const url = `${base}/api/extension/comments/summary`;
    const requestBody = {
      post: payload && payload.post ? payload.post : null,
      commentsData: payload && payload.commentsData ? payload.commentsData : null,
      targetLanguage: targetLanguage
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'text/event-stream'
    };

    return await makeStreamingRequest('backend', this.token, url, headers, requestBody, onChunk, onComplete, onError);
  }
}

if (typeof window !== 'undefined') {
  window.BackendProxyService = BackendProxyService;
}
