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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('dashscope', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);

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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('dashscope', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      console.error('DashScope comment summary error:', error);
      if (onError) {
        onError(error);
      }
    }
  }
}

// GLM (智谱AI) implementation
class GLMService extends AITranslationService {
  constructor(apiKey) {
    super(apiKey);
    this.apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    this.model = 'glm-4-flash'; 
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('glm', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);

    } catch (error) {
      console.error('GLM translation error:', error);
      if (onError) {
        onError(error);
      }
    }
  }

  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    try {
      if (!this.validateApiKey(this.apiKey)) {
        throw new Error('GLM API key not configured. Please set it in the extension popup.');
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('glm', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      console.error('GLM comment summary error:', error);
      if (onError) {
        onError(error);
      }
    }
  }
}

// OpenAI implementation
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('openai', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      if (onError) {
        onError(error);
      }
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('openai', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  }
}

// DeepSeek implementation
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('deepseek', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      if (onError) {
        onError(error);
      }
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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'text/event-stream'
      };

      await makeStreamingRequest('deepseek', this.apiKey, this.apiUrl, headers, requestBody, onChunk, onComplete, onError);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.DashScopeService = DashScopeService;
  window.GLMService = GLMService;
  window.OpenAIService = OpenAIService;
  window.DeepSeekService = DeepSeekService;
}
