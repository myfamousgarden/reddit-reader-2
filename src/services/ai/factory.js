/**
 * Service factory for AI providers
 */
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

if (typeof window !== 'undefined') {
  window.AIServiceFactory = AIServiceFactory;
}
