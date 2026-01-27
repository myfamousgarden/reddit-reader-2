// Reddit Reader - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  // Check if the extension is working
  checkExtensionStatus();

  // Load saved settings
  loadSettings();

  updateBackendBaseUrlDisplay();
  
  // Add event listeners
  setupEventListeners();
});

function getBackendBaseUrl() {
  const manifest = chrome.runtime.getManifest();
  return manifest && manifest.backendBaseUrl ? manifest.backendBaseUrl : '';
}

function getSelectedMode() {
  const selected = document.querySelector('input[name="mode"]:checked');
  return selected ? selected.value : 'apiKey';
}

function getExtensionId() {
  return chrome.runtime && chrome.runtime.id ? chrome.runtime.id : '';
}

function getBackendCallbackUrl() {
  const id = getExtensionId();
  return id ? `chrome-extension://${id}/auth-callback.html` : '';
}

function buildBackendLoginUrl() {
  const baseUrl = getBackendBaseUrl();
  const base = `${baseUrl.replace(/\/$/, '')}/signup`;
  const url = new URL(base);
  const callbackUrl = getBackendCallbackUrl();
  if (callbackUrl) {
    url.searchParams.set('callbackUrl', callbackUrl);
  }
  return url.toString();
}

function updateBackendBaseUrlDisplay() {
  const baseUrl = getBackendBaseUrl();
  const el = document.getElementById('backendBaseUrl');
  if (!el) return;
  el.textContent = baseUrl;
  el.title = baseUrl;
}

function setBackendLoginStatus(text) {
  const statusEl = document.getElementById('backendLoginStatus');
  if (!statusEl) return;
  statusEl.textContent = text;
}

function setBackendLoginButtonVisible(visible) {
  const buttonEl = document.getElementById('backendLogin');
  if (!buttonEl) return;
  buttonEl.style.display = visible ? '' : 'none';
}

function refreshBackendAuthStatus() {
  const mode = getSelectedMode();
  if (mode !== 'backend') return;

  setBackendLoginButtonVisible(true);
  setBackendLoginStatus('Checking...');

  chrome.storage.sync.get(['backendAuthToken'], function(result) {
    const token = result.backendAuthToken || '';
    if (!token) {
      setBackendLoginButtonVisible(true);
      setBackendLoginStatus('Login required');
      return;
    }

    chrome.runtime.sendMessage(
      { action: 'backendAuthStatus', backendBaseUrl: getBackendBaseUrl(), token: token },
      function(response) {
        if (chrome.runtime.lastError || !response) {
          setBackendLoginButtonVisible(true);
          setBackendLoginStatus('Backend offline');
          return;
        }

        if (response.ok && response.loggedIn) {
          setBackendLoginButtonVisible(false);
          setBackendLoginStatus('Logged in');
          return;
        }

        if (response.ok && response.loggedIn === false) {
          setBackendLoginButtonVisible(true);
          setBackendLoginStatus('Login required');
          return;
        }

        setBackendLoginButtonVisible(true);
        setBackendLoginStatus('Backend error');
      }
    );
  });
}

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
  chrome.storage.sync.get(['mode', 'aiProvider', 'dashscopeApiKey', 'glmApiKey', 'openaiApiKey', 'deepseekApiKey', 'targetLanguage'], function(result) {
    const mode = result.mode || 'apiKey';
    const modeApiKey = document.getElementById('modeApiKey');
    const modeBackend = document.getElementById('modeBackend');
    if (modeApiKey && modeBackend) {
      modeApiKey.checked = mode === 'apiKey';
      modeBackend.checked = mode === 'backend';
    }
    updateModeUI(mode);

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

    refreshBackendAuthStatus();
  });
}

// Setup event listeners
function setupEventListeners() {
  const openHomeButton = document.getElementById('openHome');
  if (openHomeButton) {
    openHomeButton.addEventListener('click', function() {
      chrome.tabs.create({ url: 'home.html' });
    });
  }

  const saveButton = document.getElementById('saveSettings');
  const apiKeyInput = document.getElementById('apiKey');
  const aiProviderSelect = document.getElementById('aiProvider');
  const modeApiKey = document.getElementById('modeApiKey');
  const modeBackend = document.getElementById('modeBackend');
  const backendLoginButton = document.getElementById('backendLogin');
  
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

  function handleModeChange() {
    updateModeUI(getSelectedMode());
    refreshBackendAuthStatus();
  }

  if (modeApiKey) {
    modeApiKey.addEventListener('change', handleModeChange);
  }

  if (modeBackend) {
    modeBackend.addEventListener('change', handleModeChange);
  }

  if (backendLoginButton) {
    backendLoginButton.addEventListener('click', function() {
      chrome.tabs.create({ url: buildBackendLoginUrl() });
    });
  }
}

// Save settings
function saveSettings() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const aiProvider = document.getElementById('aiProvider').value;
  const targetLanguage = document.getElementById('targetLanguage').value;
  const mode = getSelectedMode();
  const saveStatus = document.getElementById('saveStatus');
  
  if (mode === 'apiKey' && !apiKey) {
    showSaveStatus('Please enter an API key', 'error');
    return;
  }
  
  const settings = {
    mode: mode,
    aiProvider: aiProvider,
    targetLanguage: targetLanguage
  };
  
  // Save API key with provider-specific key
  if (mode === 'apiKey') {
    settings[`${aiProvider}ApiKey`] = apiKey;
  }
  
  chrome.storage.sync.set(settings, function() {
    if (chrome.runtime.lastError) {
      showSaveStatus('Failed to save settings', 'error');
    } else {
      showSaveStatus('Settings saved successfully!', 'success');
    }
  });
}

function updateModeUI(mode) {
  const providerRow = document.getElementById('providerRow');
  const apiKeyRow = document.getElementById('apiKeyRow');
  const backendSection = document.getElementById('backendSection');

  const isBackend = mode === 'backend';

  if (providerRow) {
    providerRow.style.display = isBackend ? 'none' : '';
  }

  if (apiKeyRow) {
    apiKeyRow.style.display = isBackend ? 'none' : '';
  }

  if (backendSection) {
    backendSection.style.display = isBackend ? '' : 'none';
  }

  updateHelpTooltip(mode);
}

function updateHelpTooltip(mode) {
  const tooltipContent = document.getElementById('helpTooltipContent');
  const helpTooltip = document.getElementById('helpTooltip');
  const templateId = mode === 'backend' ? 'tooltipTemplateBackend' : 'tooltipTemplateApiKey';
  const template = document.getElementById(templateId);

  if (helpTooltip) {
    helpTooltip.setAttribute('aria-label', mode === 'backend' ? 'How to use backend proxy' : 'How to use');
  }

  if (!tooltipContent || !template) return;
  tooltipContent.innerHTML = template.innerHTML;
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
