// Background Service Worker for Reddit Reader
// Handles API requests to avoid CORS issues

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'aiStreamRequest') {
    handleAIStreamRequest(request, sender.tab.id)
      .catch(error => {
        // Send error back to content script
        chrome.tabs.sendMessage(sender.tab.id, {
          action: 'streamError',
          streamId: request.streamId,
          error: error.message
        }).catch(() => {});
      });
    
    // Return true to indicate we will send a response asynchronously
    return true;
  }

  if (request.action === 'backendAuthStatus') {
    handleBackendAuthStatus(request)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ ok: false, error: error && error.message ? error.message : String(error) }));
    return true;
  }
});

async function handleBackendAuthStatus(request) {
  const backendBaseUrl = request.backendBaseUrl || 'http://localhost:3000';
  const token = request.token || '';

  if (!token) {
    return { ok: true, loggedIn: false, reason: 'missing_token' };
  }

  const url = `${backendBaseUrl.replace(/\/$/, '')}/api/auth/status`;
  let response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (e) {
    return { ok: false, loggedIn: false, reason: 'unreachable' };
  }

  if (response.status === 401) {
    return { ok: true, loggedIn: false };
  }

  if (!response.ok) {
    return { ok: false, loggedIn: false, reason: `http_${response.status}` };
  }

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  return { ok: true, loggedIn: true, data: data };
}

async function handleAIStreamRequest(request, tabId) {
  const { provider, apiKey, url, headers, body, streamId } = request;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers || {},
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      let errorDetails = '';
      try {
        const err = await response.json();
        errorDetails = err && err.error && err.error.message ? `: ${err.error.message}` : '';
      } catch (e) {
        try {
          errorDetails = `: ${await response.text()}`;
        } catch (e2) {
          errorDetails = '';
        }
      }
      throw new Error(`${provider} API request failed: ${response.status} ${response.statusText}${errorDetails}`);
    }

    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // Send completion message
        chrome.tabs.sendMessage(tabId, {
          action: 'streamComplete',
          streamId: streamId
        }).catch(() => {}); // Ignore errors if tab is closed
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // Split by newlines and process each line
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer
      
      for (const line of lines) {
        if (line.trim()) {
          // Send chunk to content script
          chrome.tabs.sendMessage(tabId, {
            action: 'streamChunk',
            streamId: streamId,
            data: line
          }).catch(() => {}); // Ignore errors if tab is closed
        }
      }
    }
  } catch (error) {
    // Send error to content script
    chrome.tabs.sendMessage(tabId, {
      action: 'streamError',
      streamId: streamId,
      error: error.message
    }).catch(() => {});
  }
}
