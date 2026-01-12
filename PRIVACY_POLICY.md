# Privacy Policy for Reddit Reader 2

**Last Updated: January 9, 2026**

## Overview

Reddit Reader 2 ("the Extension") is a browser extension that enhances the Reddit reading experience by providing AI-powered translation and comment summarization features. This privacy policy explains how we handle your data.

## Data Collection and Usage

### 1. API Keys

**What we collect:**
- AI service provider API keys (DashScope, GLM, OpenAI, DeepSeek) that you manually enter in the extension settings.

**How we use it:**
- API keys are stored locally in your browser using Chrome's `chrome.storage.sync` API.
- API keys are only used to authenticate requests to the respective AI service providers.
- API keys are transmitted directly to the AI service providers' servers for authentication purposes only.

**Storage:**
- API keys are stored locally on your device and synced across your Chrome browsers if you are signed into Chrome.
- We do not store your API keys on any external servers.

### 2. Reddit Content

**What we process:**
- Reddit post titles and content from pages you visit.
- Reddit comments from posts you choose to analyze.

**How we use it:**
- Content is sent to your selected AI service provider for translation and summarization.
- Content is processed in real-time and is not stored by the Extension.

**Important:** The AI service providers (DashScope/Alibaba Cloud, Zhipu AI, OpenAI, DeepSeek) may have their own data retention policies. Please review their respective privacy policies:
- [Alibaba Cloud DashScope Privacy Policy](https://www.alibabacloud.com/help/en/legal/latest/chinese-mainland-regions-alibaba-cloud-international-website-privacy-policy)
- [Zhipu AI Privacy Policy](https://www.zhipuai.cn/privacy)
- [OpenAI Privacy Policy](https://openai.com/privacy/)
- [DeepSeek Privacy Policy](https://www.deepseek.com/privacy)

### 3. User Preferences

**What we collect:**
- Your selected AI service provider preference.
- Your target language preference.

**How we use it:**
- Stored locally to remember your settings between sessions.

## Data Sharing

We do **NOT**:
- Sell your personal data to third parties.
- Share your data with third parties for marketing purposes.
- Collect any personal identification information.
- Track your browsing history.
- Use analytics or tracking services.

The only data transmission occurs between:
- Your browser and the AI service provider you have selected for translation/summarization services.

## Data Security

- All API communications use HTTPS encryption.
- API keys are stored using Chrome's secure storage API.
- No data is transmitted to servers owned or operated by the Extension developers.

## Permissions Explained

The Extension requires the following permissions:

| Permission | Purpose |
|------------|---------|
| `activeTab` | To access and read content from the current Reddit page you're viewing |
| `storage` | To save your API keys and preferences locally |
| `host_permissions` | To send requests to AI service provider APIs for translation |

## Third-Party Services

This Extension integrates with the following third-party AI services:

1. **Alibaba Cloud DashScope** - AI translation and summarization
2. **Zhipu AI (GLM)** - AI translation and summarization
3. **OpenAI** - AI translation and summarization
4. **DeepSeek** - AI translation and summarization

Each service has its own terms of service and privacy policy. By using this Extension with any of these services, you agree to their respective terms.

## Children's Privacy

This Extension is not intended for use by children under the age of 13. We do not knowingly collect any personal information from children.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this document.

## Your Rights

You have the right to:
- Delete your stored API keys at any time through the extension settings.
- Uninstall the Extension to remove all locally stored data.
- Review Chrome's synced data through your Chrome settings.

## Contact

If you have any questions or concerns about this privacy policy, please:
- Open an issue on our GitHub repository
- Contact the developer through the Chrome Web Store listing

## Open Source

This Extension is open source. You can review the complete source code to verify our data handling practices.

---

**Summary:** Reddit Reader 2 respects your privacy. We only store your API keys and preferences locally, and only transmit Reddit content to the AI service you choose for translation. We do not collect, store, or share any personal information.
