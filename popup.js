// Reddit Reader - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  // Check if the extension is working
  checkExtensionStatus();
  
  // Load saved settings
  loadSettings();
  
  // Add event listeners
  setupEventListeners();
});

function checkExtensionStatus() {
  const statusElement = document.getElementById('status');

  function setStatus(text, isActive) {
    if (!statusElement) return;
    statusElement.textContent = text;
    statusElement.className = isActive ? 'status active' : 'status';
  }

  function isRedditUrl(url) {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname;
      return host === 'reddit.com' || host.endsWith('.reddit.com');
    } catch (e) {
      return false;
    }
  }

  function pingTab(tabId, onDone) {
    chrome.tabs.sendMessage(tabId, { action: 'ping' }, function(response) {
      const err = chrome.runtime.lastError;
      onDone(err, response);
    });
  }

  setStatus('Checking...', false);

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs && tabs[0];
    if (!tab || typeof tab.id !== 'number') {
      setStatus('No active tab', false);
      return;
    }

    const tabUrl = tab.url || '';
    if (tabUrl && !isRedditUrl(tabUrl)) {
      setStatus('Open a Reddit page', false);
      return;
    }

    pingTab(tab.id, function(err) {
      if (err) {
        setTimeout(() => {
          pingTab(tab.id, function(retryErr) {
            if (retryErr) {
              setStatus('⚠️ Please refresh the page', false);
            } else {
              setStatus('✅ Extension Active', true);
            }
          });
        }, 700);
        return;
      }

      setStatus('✅ Extension Active', true);
    });
  });
}

// Handle messages from content script if needed
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateStatus') {
    // Handle status updates from content script
    console.log('Status update:', request.status);
  }
});

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get(['aiProvider', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'targetLanguage'], function(result) {
    // Set AI provider
    const aiProvider = result.aiProvider || 'dashscope';
    document.getElementById('aiProvider').value = aiProvider;
    
    // Set target language
    const targetLanguage = result.targetLanguage || 'zh';
    document.getElementById('targetLanguage').value = targetLanguage;
    
    // Set API key based on provider
    updateApiKeyField(aiProvider);
    
    if (aiProvider === 'dashscope' && result.dashscopeApiKey) {
      document.getElementById('apiKey').value = result.dashscopeApiKey;
    } else if (aiProvider === 'glm' && result.glmApiKey) {
      document.getElementById('apiKey').value = result.glmApiKey;
    } else if (aiProvider === 'openai' && result.openaiApiKey) {
      document.getElementById('apiKey').value = result.openaiApiKey;
    } else if (aiProvider === 'deepseek' && result.deepseekApiKey) {
      document.getElementById('apiKey').value = result.deepseekApiKey;
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  const saveButton = document.getElementById('saveSettings');
  const apiKeyInput = document.getElementById('apiKey');
  const aiProviderSelect = document.getElementById('aiProvider');
  
  saveButton.addEventListener('click', saveSettings);
  
  // Save on Enter key
  apiKeyInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      saveSettings();
    }
  });
  
  // Handle AI provider change
  aiProviderSelect.addEventListener('change', function(e) {
    const provider = e.target.value;
    updateApiKeyField(provider);
    
    // Load existing API key for the selected provider
    chrome.storage.sync.get([`${provider}ApiKey`], function(result) {
      const apiKeyField = document.getElementById('apiKey');
      apiKeyField.value = result[`${provider}ApiKey`] || '';
    });
  });
}

// Save settings
function saveSettings() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const aiProvider = document.getElementById('aiProvider').value;
  const targetLanguage = document.getElementById('targetLanguage').value;
  const saveStatus = document.getElementById('saveStatus');
  
  if (!apiKey) {
    showSaveStatus('Please enter an API key', 'error');
    return;
  }
  
  const settings = {
    aiProvider: aiProvider,
    targetLanguage: targetLanguage
  };
  
  // Save API key with provider-specific key
  settings[`${aiProvider}ApiKey`] = apiKey;
  
  chrome.storage.sync.set(settings, function() {
    if (chrome.runtime.lastError) {
      showSaveStatus('Failed to save settings', 'error');
    } else {
      showSaveStatus('Settings saved successfully!', 'success');
    }
  });
}

// Update API key field based on provider
function updateApiKeyField(provider) {
  const apiKeyLabel = document.getElementById('apiKeyLabel');
  const apiKeyInput = document.getElementById('apiKey');
  
  switch (provider) {
    case 'dashscope':
      apiKeyLabel.textContent = 'DashScope API Key:';
      apiKeyInput.placeholder = 'Enter your DashScope API key';
      break;
    case 'glm':
      apiKeyLabel.textContent = 'GLM API Key:';
      apiKeyInput.placeholder = 'Enter your GLM API key';
      break;
    case 'openai':
      apiKeyLabel.textContent = 'OpenAI API Key:';
      apiKeyInput.placeholder = 'Enter your OpenAI API key';
      break;
    case 'deepseek':
      apiKeyLabel.textContent = 'DeepSeek API Key:';
      apiKeyInput.placeholder = 'Enter your DeepSeek API key';
      break;
    default:
      apiKeyLabel.textContent = 'API Key:';
      apiKeyInput.placeholder = 'Enter your API key';
  }
}

// Show save status message
function showSaveStatus(message, type) {
  const saveStatus = document.getElementById('saveStatus');
  saveStatus.textContent = message;
  saveStatus.style.opacity = '1';
  saveStatus.style.color = type === 'error' ? '#ff6b6b' : '#4ecdc4';
  
  setTimeout(() => {
    saveStatus.style.opacity = '0';
  }, 3000);
}
