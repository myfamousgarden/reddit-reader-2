/**
 * AI Translation Services
 * Abstract interface and concrete implementations for different AI providers
 */

// Abstract base class for AI translation services
class AITranslationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Translate content with streaming output
   * @param {string} content - Content to translate
   * @param {string} targetLanguage - Target language code (e.g., 'zh', 'en', 'es')
   * @param {function} onChunk - Callback for each chunk of translated text
   * @param {function} onComplete - Callback when translation is complete
   * @param {function} onError - Callback for errors
   * @returns {Promise<void>}
   */
  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    throw new Error('translateStream method must be implemented by subclass');
  }

  /**
   * Summarize comments with streaming output
   * @param {Object} commentsData - Comments analysis data
   * @param {string} targetLanguage - Target language code
   * @param {function} onChunk - Callback for each chunk of summary text
   * @param {function} onComplete - Callback when summary is complete
   * @param {function} onError - Callback for errors
   * @returns {Promise<void>}
   */
  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    throw new Error('summarizeCommentsStream method must be implemented by subclass');
  }

  /**
   * Get system prompt for translation
   * @param {string} targetLanguage - Target language code
   * @returns {string} System prompt
   */
  getSystemPrompt(targetLanguage = 'zh') {
    const languageMap = {
      'zh': 'Chinese (中文)',
      'en': 'English',
      'es': 'Spanish (Español)',
      'hi': 'Hindi (हिन्दी)',
      'ar': 'Arabic (العربية)',
      'pt': 'Portuguese (Português)',
      'bn': 'Bengali (বাংলা)',
      'ru': 'Russian (Русский)',
      'ja': 'Japanese (日本語)',
      'fr': 'French (Français)'
    };

    const targetLanguageName = languageMap[targetLanguage] || languageMap['zh'];
    
    return `You are a Reddit user. Please translate the content into natural ${targetLanguageName} colloquial language. Requirements:

- Keep the original formatting, including line breaks and bullet points
- Use natural, conversational language that Reddit users would understand
- Maintain the tone and style of the original content
- Preserve any links, usernames, or special formatting
- If there are technical terms, provide brief explanations when necessary

Please translate the following content:`;
  }

  /**
   * Get system prompt for comment summarization
   * @param {string} targetLanguage - Target language code
   * @returns {string} System prompt for comment summarization
   */
  getCommentSummaryPrompt(targetLanguage = 'zh') {
    const languageMap = {
      'zh': 'Chinese (中文)',
      'en': 'English',
      'es': 'Spanish (Español)',
      'hi': 'Hindi (हिन्दी)',
      'ar': 'Arabic (العربية)',
      'pt': 'Portuguese (Português)',
      'bn': 'Bengali (বাংলা)',
      'ru': 'Russian (Русский)',
      'ja': 'Japanese (日本語)',
      'fr': 'French (Français)'
    };

    const targetLanguageName = languageMap[targetLanguage] || languageMap['zh'];
    
    return `You are a Reddit comment analyzer. Please analyze and summarize the provided Reddit comments in ${targetLanguageName}.

Your task:
1. If there are OP (Original Poster) comments, summarize them first
2. Summarize top active users and their key opinions
3. Provide an overall discussion summary

Requirements:
- Output MUST be valid Markdown
- Use clear, natural ${targetLanguageName} language
- Be concise but informative; highlight key points and differing perspectives
- Maintain objectivity and avoid bias
- Use bullet points starting with "- " for readability
- Always format usernames as **username** (bold username)
- Only mention usernames that appear in the provided data (no fabricated users)
- Always include usernames when summarizing their opinions

Output format:
## OP Comments Summary
- ...

## Top Users' Opinions
- **username**: ...

## Overall Discussion
- ...

Please analyze the following comment data:`;
  }

  /**
   * Validate API key
   * @param {string} apiKey - API key to validate
   * @returns {boolean} True if API key is valid
   */
  validateApiKey(apiKey) {
    return apiKey && apiKey.trim().length > 0;
  }

  formatCommentsForAnalysis(commentsData) {
    const { opComments, topUsers, totalComments, opUsername } = commentsData;
    
    let formatted = `Total Comments: ${totalComments}\n`;
    if (opUsername) {
      formatted += `OP Username: ${opUsername}\n\n`;
    }

    if (opComments && opComments.length > 0) {
      formatted += `OP Comments (${opComments.length}):\n`;
      opComments.forEach((comment, index) => {
        formatted += `${index + 1}. [Score: ${comment.score}] ${comment.content}\n\n`;
      });
    } else {
      formatted += `OP Comments: None\n\n`;
    }

    if (topUsers && topUsers.length > 0) {
      formatted += `Top Active Users:\n`;
      topUsers.forEach((user, index) => {
        formatted += `${index + 1}. ${user.author} (${user.commentCount} comments, upvotes: ${user.avgScore.toFixed(1)}):\n`;
        user.comments.slice(0, 2).forEach(comment => {
          formatted += `   - [Score: ${comment.score}] ${comment.content}\n`;
        });
        formatted += '\n';
      });
    }

    return formatted;
  }
}

// DashScope (Aliyun) implementation
class DashScopeService extends AITranslationService {
  constructor(apiKey) {
    super(apiKey);
    this.apiUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    this.model = 'qwen-turbo';
  }

  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('DashScope API key not configured. Please set it in the extension popup.');
      }

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: content
          }
        ],
        stream: true,
        stream_options: {
          include_usage: true
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`DashScope API request failed: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let translatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                const deltaContent = data.choices[0].delta.content;
                translatedText += deltaContent;
                
                // Call the chunk callback
                if (onChunk) {
                  onChunk(deltaContent, translatedText);
                }
              }
            } catch (parseError) {
              console.error('Error parsing DashScope streaming response:', parseError);
            }
          }
        }
      }

      // Call completion callback
      if (onComplete) {
        onComplete(translatedText);
      }

    } catch (error) {
      console.error('DashScope translation error:', error);
      if (onError) {
        onError(error);
      }
    }
  }

  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('DashScope API key not configured. Please set it in the extension popup.');
      }

      // Format comments data for AI analysis
      const formattedData = this.formatCommentsForAnalysis(commentsData);

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getCommentSummaryPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: formattedData
          }
        ],
        stream: true,
        stream_options: {
          include_usage: true
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`DashScope API request failed: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let summaryText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                const content = parsed.choices[0].delta.content;
                summaryText += content;
                onChunk(content);
              }
            } catch (parseError) {
              // Ignore parsing errors for incomplete JSON
            }
          }
        }
      }

      onComplete(summaryText);
    } catch (error) {
      console.error('DashScope comment summary error:', error);
      onError(error);
    }
  }

  formatCommentsForAnalysis(commentsData) {
    const { opComments, topUsers, totalComments, opUsername } = commentsData;
    
    let formatted = `Total Comments: ${totalComments}\n`;
    if (opUsername) {
      formatted += `OP Username: ${opUsername}\n\n`;
    }

    // OP Comments
    if (opComments && opComments.length > 0) {
      formatted += `OP Comments (${opComments.length}):\n`;
      opComments.forEach((comment, index) => {
        formatted += `${index + 1}. [Score: ${comment.score}] ${comment.content}\n\n`;
      });
    } else {
      formatted += `OP Comments: None\n\n`;
    }

    // Top Users
    if (topUsers && topUsers.length > 0) {
      formatted += `Top Active Users:\n`;
      topUsers.forEach((user, index) => {
        formatted += `${index + 1}. ${user.author} (${user.commentCount} comments, upvotes: ${user.avgScore.toFixed(1)}):\n`;
        // Include top 2 comments from each user
        user.comments.slice(0, 2).forEach(comment => {
          formatted += `   - [Score: ${comment.score}] ${comment.content}\n`;
        });
        formatted += '\n';
      });
    }

    return formatted;
  }
}

// GLM (智谱AI) implementation
class GLMService extends AITranslationService {
  constructor(apiKey) {
    super(apiKey);
    this.apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    this.model = 'glm-4-flash'; // Using GLM-4-Flash for faster response
  }

  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('GLM API key not configured. Please set it in the extension popup.');
      }

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: content
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`GLM API request failed: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let translatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              if (onComplete) onComplete(translatedText);
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                const content = parsed.choices[0].delta.content;
                translatedText += content;
                if (onChunk) onChunk(content);
              }
            } catch (parseError) {
              console.error('Error parsing GLM streaming response:', parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error('GLM translation error:', error);
      if (onError) onError(error);
      throw error;
    }
  }

  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('GLM API key not configured. Please set it in the extension popup.');
      }

      // Format comments data for AI analysis
      const formattedData = this.formatCommentsForAnalysis(commentsData);

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getCommentSummaryPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: formattedData
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`GLM API request failed: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let summaryText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              if (onComplete) onComplete(summaryText);
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                const content = parsed.choices[0].delta.content;
                summaryText += content;
                if (onChunk) onChunk(content);
              }
            } catch (parseError) {
              console.error('Error parsing GLM streaming response:', parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error('GLM comment summary error:', error);
      if (onError) onError(error);
      throw error;
    }
  }

  formatCommentsForAnalysis(commentsData) {
    const { opComments, topUsers, totalComments, opUsername } = commentsData;
    
    let formatted = `Total Comments: ${totalComments}\n`;
    if (opUsername) {
      formatted += `OP Username: ${opUsername}\n\n`;
    }

    // OP Comments
    if (opComments && opComments.length > 0) {
      formatted += `OP Comments (${opComments.length}):\n`;
      opComments.forEach((comment, index) => {
        formatted += `${index + 1}. [Score: ${comment.score}] ${comment.content}\n\n`;
      });
    } else {
      formatted += `OP Comments: None\n\n`;
    }

    // Top Users
    if (topUsers && topUsers.length > 0) {
      formatted += `Top Active Users:\n`;
      topUsers.forEach((user, index) => {
        formatted += `${index + 1}. ${user.author} (${user.commentCount} comments, upvotes: ${user.avgScore.toFixed(1)}):\n`;
        // Include top 2 comments from each user
        user.comments.slice(0, 2).forEach(comment => {
          formatted += `   - [Score: ${comment.score}] ${comment.content}\n`;
        });
        formatted += '\n';
      });
    }

    return formatted;
  }
}

// OpenAI implementation (placeholder for future use)
class OpenAIService extends AITranslationService {
  constructor(apiKey) {
    super(apiKey);
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    this.model = 'gpt-4o-mini';
  }

  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('OpenAI API key not configured. Please set it in the extension popup.');
      }

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: content
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
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
        throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText}${errorDetails}`);
      }

      const reader = response.body.getReader();
      let translatedText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (!data) continue;
          if (data === '[DONE]') {
            if (onComplete) onComplete(translatedText);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const deltaContent = parsed?.choices?.[0]?.delta?.content;
            if (deltaContent) {
              translatedText += deltaContent;
              if (onChunk) onChunk(deltaContent, translatedText);
            }
          } catch (parseError) {
          }
        }
      }

      if (onComplete) onComplete(translatedText);
    } catch (error) {
      if (onError) onError(error);
      throw error;
    }
  }

  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('OpenAI API key not configured. Please set it in the extension popup.');
      }

      const formattedData = this.formatCommentsForAnalysis(commentsData);

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getCommentSummaryPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: formattedData
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
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
        throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText}${errorDetails}`);
      }

      const reader = response.body.getReader();
      let summaryText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (!data) continue;
          if (data === '[DONE]') {
            if (onComplete) onComplete(summaryText);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const deltaContent = parsed?.choices?.[0]?.delta?.content;
            if (deltaContent) {
              summaryText += deltaContent;
              if (onChunk) onChunk(deltaContent);
            }
          } catch (parseError) {
          }
        }
      }

      if (onComplete) onComplete(summaryText);
    } catch (error) {
      if (onError) onError(error);
      throw error;
    }
  }
}

class DeepSeekService extends AITranslationService {
  constructor(apiKey) {
    super(apiKey);
    this.apiUrl = 'https://api.deepseek.com/chat/completions';
    this.model = 'deepseek-chat';
  }

  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('DeepSeek API key not configured. Please set it in the extension popup.');
      }

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: content
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
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
        throw new Error(`DeepSeek API request failed: ${response.status} ${response.statusText}${errorDetails}`);
      }

      const reader = response.body.getReader();
      let translatedText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (!data) continue;
          if (data === '[DONE]') {
            if (onComplete) onComplete(translatedText);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const deltaContent = parsed?.choices?.[0]?.delta?.content;
            if (deltaContent) {
              translatedText += deltaContent;
              if (onChunk) onChunk(deltaContent, translatedText);
            }
          } catch (parseError) {
          }
        }
      }

      if (onComplete) onComplete(translatedText);
    } catch (error) {
      if (onError) onError(error);
      throw error;
    }
  }

  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('DeepSeek API key not configured. Please set it in the extension popup.');
      }

      const formattedData = this.formatCommentsForAnalysis(commentsData);

      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getCommentSummaryPrompt(targetLanguage)
          },
          {
            role: 'user',
            content: formattedData
          }
        ],
        stream: true,
        temperature: 0.6
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(requestBody)
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
        throw new Error(`DeepSeek API request failed: ${response.status} ${response.statusText}${errorDetails}`);
      }

      const reader = response.body.getReader();
      let summaryText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (!data) continue;
          if (data === '[DONE]') {
            if (onComplete) onComplete(summaryText);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const deltaContent = parsed?.choices?.[0]?.delta?.content;
            if (deltaContent) {
              summaryText += deltaContent;
              if (onChunk) onChunk(deltaContent);
            }
          } catch (parseError) {
          }
        }
      }

      if (onComplete) onComplete(summaryText);
    } catch (error) {
      if (onError) onError(error);
      throw error;
    }
  }
}

// Service factory
class AIServiceFactory {
  static createService(provider, apiKey) {
    switch (provider.toLowerCase()) {
      case 'dashscope':
      case 'aliyun':
        return new DashScopeService(apiKey);
      case 'glm':
      case 'zhipu':
        return new GLMService(apiKey);
      case 'openai':
        return new OpenAIService(apiKey);
      case 'deepseek':
        return new DeepSeekService(apiKey);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  static getSupportedProviders() {
    return ['dashscope', 'glm', 'openai', 'deepseek'];
  }
}

// Export for use in content script
if (typeof window !== 'undefined') {
  window.AITranslationService = AITranslationService;
  window.DashScopeService = DashScopeService;
  window.GLMService = GLMService;
  window.OpenAIService = OpenAIService;
  window.DeepSeekService = DeepSeekService;
  window.AIServiceFactory = AIServiceFactory;
}
