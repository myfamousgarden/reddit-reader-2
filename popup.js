// Reddit Reader 2 - Popup Script

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
  
  // Query the active tab to check if content script is loaded
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      // Try to communicate with content script
      chrome.tabs.sendMessage(tabs[0].id, { action: 'ping' }, function(response) {
        if (chrome.runtime.lastError) {
          // Content script not loaded or not responding
          statusElement.textContent = '⚠️ Please refresh the page';
          statusElement.className = 'status';
        } else {
          // Content script is working
          statusElement.textContent = '✅ Extension Active';
          statusElement.className = 'status active';
        }
      });
    }
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
