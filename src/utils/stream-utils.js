/**
 * Utility for making streaming requests through background service worker
 */
async function makeStreamingRequest(provider, apiKey, url, headers, body, onChunk, onComplete, onError) {
  const streamId = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  let fullText = '';

  function extractStreamContent(parsed) {
    if (parsed && parsed.choices && parsed.choices[0]) {
      const choice = parsed.choices[0];
      if (choice.delta && typeof choice.delta.content === 'string') return choice.delta.content;
      if (choice.message && typeof choice.message.content === 'string') return choice.message.content;
      if (typeof choice.text === 'string') return choice.text;
    }
    if (parsed && typeof parsed.delta === 'string') return parsed.delta;
    if (parsed && typeof parsed.content === 'string') return parsed.content;
    if (typeof parsed === 'string') return parsed;
    return null;
  }

  return await new Promise((resolve, reject) => {
    let settled = false;

    function finalizeSuccess() {
      if (settled) return;
      settled = true;
      chrome.runtime.onMessage.removeListener(messageListener);
      try {
        if (onComplete) onComplete(fullText);
      } finally {
        resolve(fullText);
      }
    }

    function finalizeError(err) {
      if (settled) return;
      settled = true;
      chrome.runtime.onMessage.removeListener(messageListener);
      try {
        if (onError) onError(err);
      } finally {
        reject(err);
      }
    }

    const messageListener = (message) => {
      if (message.action === 'streamChunk' && message.streamId === streamId) {
        const raw = message.data ? String(message.data) : '';
        const line = raw.trim();
        let data = null;

        if (line.startsWith('data: ')) {
          data = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
          data = line.slice(5).trim();
        }

        if (!data || data === '[DONE]') {
          return;
        }

        let content = null;
        try {
          const parsed = JSON.parse(data);
          content = extractStreamContent(parsed);
        } catch (e) {
          content = data;
        }

        if (!content) return;
        fullText += content;
        if (onChunk) {
          onChunk(content, fullText);
        }
        return;
      }

      if (message.action === 'streamComplete' && message.streamId === streamId) {
        finalizeSuccess();
        return;
      }

      if (message.action === 'streamError' && message.streamId === streamId) {
        finalizeError(new Error(message.error));
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    chrome.runtime.sendMessage({
      action: 'aiStreamRequest',
      provider: provider,
      apiKey: apiKey,
      url: url,
      headers: headers,
      body: body,
      streamId: streamId
    }).catch(error => {
      finalizeError(error);
    });
  });
}

if (typeof window !== 'undefined') {
  window.makeStreamingRequest = makeStreamingRequest;
}
