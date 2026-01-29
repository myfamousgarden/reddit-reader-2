/**
 * Abstract base class for AI translation services
 */
class AITranslationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Translate content with streaming output
   */
  async translateStream(content, targetLanguage, onChunk, onComplete, onError) {
    throw new Error('translateStream method must be implemented by subclass');
  }

  /**
   * Summarize comments with streaming output
   */
  async summarizeCommentsStream(commentsData, targetLanguage, onChunk, onComplete, onError) {
    throw new Error('summarizeCommentsStream method must be implemented by subclass');
  }

  /**
   * Get system prompt for translation
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
   */
  getCommentSummaryPrompt(targetLanguage = 'zh') {
    const languageMap = {
      'zh': { name: 'Chinese (中文)', op: 'OP 评论总结', top: '活跃用户观点', overall: '整体讨论' },
      'en': { name: 'English', op: 'OP Comments Summary', top: "Top Users' Opinions", overall: 'Overall Discussion' },
      'es': { name: 'Spanish (Español)', op: 'Resumen de comentarios del OP', top: 'Opiniones de los mejores usuarios', overall: 'Discusión general' },
      'hi': { name: 'Hindi (हिन्दी)', op: 'OP टिप्पणियों का सारांश', top: 'शीर्ष उपयोगकर्ताओं की राय', overall: 'कुल चर्चा' },
      'ar': { name: 'Arabic (العربية)', op: 'ملخص تعليقات OP', top: 'آراء كبار المستخدمين', overall: 'المناقشة العامة' },
      'pt': { name: 'Portuguese (Português)', op: 'Resumo dos comentários do OP', top: 'Opiniões dos principais usuários', overall: 'Discussão geral' },
      'bn': { name: 'Bengali (বাংলা)', op: 'OP মন্তব্যের সারাংশ', top: 'শীর্ষ ব্যবহারকারীদের মতামত', overall: 'সামগ্রিক আলোচনা' },
      'ru': { name: 'Russian (Русский)', op: 'Резюме комментариев OP', top: 'Мнения топовых пользователей', overall: 'Общее обсуждение' },
      'ja': { name: 'Japanese (日本語)', op: 'OPコメントの要約', top: 'トップユーザーの意見', overall: '全体の議論' },
      'fr': { name: 'French (Français)', op: 'Résumé des commentaires de l\'OP', top: 'Opinions des meilleurs utilisateurs', overall: 'Discussion générale' }
    };

    const target = languageMap[targetLanguage] || languageMap['zh'];
    const targetLanguageName = target.name;
    
    return `You are a Reddit comment analyzer. Please analyze and summarize the provided Reddit comments in ${targetLanguageName}.

Your task:
1. If there are OP (Original Poster) comments, summarize them first
2. Summarize top active users and their key opinions
3. Provide an overall discussion summary

Requirements:
- Output MUST be valid Markdown
- Use clear, natural ${targetLanguageName} language for ALL content, including headers
- Be concise but informative; highlight key points and differing perspectives
- Maintain objectivity and avoid bias
- Use bullet points starting with "- " for readability
- Always format usernames as **username** (bold username)
- Only mention usernames that appear in the provided data (no fabricated users)
- Always include usernames when summarizing their opinions

Output format:
## ${target.op}
- ...

## ${target.top}
- **username**: ...

## ${target.overall}
- ...

Please analyze the following comment data:`;
  }

  /**
   * Validate API key
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

if (typeof window !== 'undefined') {
  window.AITranslationService = AITranslationService;
}
