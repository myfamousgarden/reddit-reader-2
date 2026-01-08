const e = [{
    name: "GPT-3.5 Turbo",
    provider: "openai",
    model: "gpt-3.5-turbo",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-3.5 Turbo 16K",
    provider: "openai",
    model: "gpt-3.5-turbo-16k",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-3.5 Turbo 0125",
    provider: "openai",
    model: "gpt-3.5-turbo-0125",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-3.5 Turbo 1106",
    provider: "openai",
    model: "gpt-3.5-turbo-1106",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4",
    provider: "openai",
    model: "gpt-4",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4 0613",
    provider: "openai",
    model: "gpt-4-0613",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4 Turbo",
    provider: "openai",
    model: "gpt-4-turbo",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4 Turbo Preview",
    provider: "openai",
    model: "gpt-4-turbo-preview",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4 0125 Preview",
    provider: "openai",
    model: "gpt-4-0125-preview",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "O1 Mini",
    provider: "openai",
    model: "o1-mini",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "O1 Preview",
    provider: "openai",
    model: "o1-preview",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4O",
    provider: "openai",
    model: "gpt-4o",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "GPT-4O Mini",
    provider: "openai",
    model: "gpt-4o-mini",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "通义千问",
    provider: "ali",
    model: "qwen-turbo",
    apiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "通义千问Plus",
    provider: "ali",
    model: "qwen-plus",
    apiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "通义千问Max",
    provider: "ali",
    model: "qwen-max",
    apiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "通义千问7B",
    provider: "ali",
    model: "qwen-7b-chat",
    apiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}, {
    name: "通义千问72B",
    provider: "ali",
    model: "qwen-72b-chat",
    apiUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    temperature: .7,
    maxTokens: 2e3
}]
  , o = {
    openaiApiKey: "",
    aliApiKey: "",
    selectedModel: "gpt-3.5-turbo",
    models: e
};
export {o as D};