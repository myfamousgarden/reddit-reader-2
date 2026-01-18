function getTokenFromUrl() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token') || url.hash.replace(/^#/, '');
  return token ? token.trim() : '';
}

function setUi(state) {
  const statusEl = document.getElementById('status');
  const messageEl = document.getElementById('message');
  const detailsEl = document.getElementById('details');

  if (statusEl) {
    statusEl.textContent = state.statusText || '';
    statusEl.className = `status ${state.statusClass || ''}`.trim();
  }
  if (messageEl) messageEl.textContent = state.message || '';
  if (detailsEl) detailsEl.textContent = state.details || '';
}

async function saveToken(token) {
  await chrome.storage.sync.set({
    backendAuthToken: token,
    backendAuthTokenSavedAt: Date.now()
  });
}

async function main() {
  try {
    const token = getTokenFromUrl();
    if (!token) {
      setUi({
        statusText: 'Missing token',
        statusClass: 'err',
        message: 'No token found in the URL.',
        details: 'Expected: auth-callback.html?token=...'
      });
      return;
    }

    await saveToken(token);

    try {
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (e) {}

    setUi({
      statusText: 'Connected',
      statusClass: 'ok',
      message: 'Backend token saved. You can close this tab and use the extension.',
      details: ''
    });
  } catch (e) {
    setUi({
      statusText: 'Failed',
      statusClass: 'err',
      message: 'Failed to save token.',
      details: e && e.message ? e.message : String(e)
    });
  }
}

main();

