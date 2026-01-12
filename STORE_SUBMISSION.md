# Chrome Web Store Submission Information

## Single Purpose Description

```
Reddit Reader 2 enhances the Reddit reading experience by providing AI-powered translation and comment summarization. Users can translate Reddit posts into their preferred language and get AI-generated summaries of comment discussions using their own API keys from supported AI providers (DashScope, GLM, OpenAI, or DeepSeek).
```

---

## Permission Justifications

### activeTab Permission

```
The activeTab permission is required to access and read the content of Reddit posts and comments that users want to translate or summarize. When users click the extension's floating button on a Reddit page, we need to extract the post title, body text, and comments from the current tab to send them to the AI service for translation and summarization. This permission is only activated when users interact with the extension on Reddit pages.
```

### Host Permissions (AI API Domains)

```
Host permissions for AI API endpoints are required to send translation and summarization requests to the user's chosen AI service provider. The extension needs to communicate with:

- dashscope.aliyuncs.com: Alibaba Cloud DashScope API for AI translation
- open.bigmodel.cn: Zhipu AI (GLM) API for AI translation
- api.openai.com: OpenAI API for AI translation
- api.deepseek.com: DeepSeek API for AI translation

Users provide their own API keys and select which service to use. The extension sends Reddit content to these APIs and receives translated/summarized text in response. No other external servers are contacted.
```

### Storage Permission

```
The storage permission is required to save user preferences locally, including:

1. The user's selected AI service provider (DashScope, GLM, OpenAI, or DeepSeek)
2. The user's preferred target language for translations
3. API keys entered by the user for their chosen AI services

All data is stored locally in Chrome's sync storage and is never transmitted to any external servers owned by the extension developer. This allows users to maintain their settings across browser sessions and synced Chrome profiles.
```

### Remote Code Justification

```
This extension does NOT use remote code. All JavaScript code is bundled within the extension package and no external scripts are loaded or executed. 

The extension only makes API calls to AI service providers (DashScope, GLM, OpenAI, DeepSeek) to receive text responses for translation and summarization. These responses are plain text content only and are displayed directly in the extension's UI - no code is received or executed from these API calls.
```

---

## Store Listing Information

### Short Description (132 characters max)

```
AI-powered Reddit enhancement: translate posts and summarize comments with DashScope, GLM, OpenAI, or DeepSeek.
```

### Detailed Description

```
Reddit Reader 2 - AI-Powered Reddit Enhancement

Transform your Reddit experience with intelligent translation and comment analysis!

🌐 FEATURES:

• AI Translation - Instantly translate Reddit posts to your preferred language
• Comment Summarization - Get AI-generated summaries of comment discussions
• Multiple AI Providers - Choose from DashScope, GLM, OpenAI, or DeepSeek
• Floating Panel - Clean, non-intrusive side panel interface
• Streaming Output - Watch translations appear in real-time
• Multi-language Support - Translate to Chinese, English, Japanese, Spanish, and more

🔧 HOW IT WORKS:

1. Install the extension and click the icon to configure your API key
2. Visit any Reddit post page
3. Click the floating button to open the side panel
4. Click "Analyze" to translate the post and summarize comments

🔐 PRIVACY-FOCUSED:

• Your API keys are stored locally in your browser
• No data is sent to our servers - only to your chosen AI provider
• Open source and transparent

🎯 PERFECT FOR:

• Non-English speakers wanting to read Reddit content
• Researchers analyzing Reddit discussions
• Anyone who wants quick summaries of long comment threads

📝 REQUIREMENTS:

• An API key from one of the supported AI providers:
  - Alibaba Cloud DashScope
  - Zhipu AI (GLM)
  - OpenAI
  - DeepSeek

Get started today and enhance your Reddit reading experience!
```

---

## Data Usage Certification Answers

| Question | Answer |
|----------|--------|
| Does your extension collect user data? | Yes - API keys and user preferences |
| Do you sell user data to third parties? | No |
| Do you use or transfer user data for purposes unrelated to the extension's single purpose? | No |
| Do you use or transfer user data to determine creditworthiness or for lending purposes? | No |

---

## Category

Recommended: **Productivity** or **Social & Communication**

## Language

Primary: English

---

## Required Assets Checklist

- [ ] Icon 128x128 PNG (already have: icons/icon128.png)
- [ ] At least 1 screenshot (1280x800 or 640x400 pixels)
- [ ] Privacy Policy URL (host PRIVACY_POLICY.md online or use a privacy policy hosting service)

## Optional Assets

- [ ] Promotional tile small (440x280 pixels)
- [ ] Promotional tile large (1400x560 pixels)
- [ ] YouTube video URL
