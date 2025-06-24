
interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class ChatService {
  private baseUrl = 'https://api.openai.com/v1/chat/completions';
  
  private getApiKey(): string {
    const apiKey = localStorage.getItem('nutribox_openai_key');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please set it in Settings.');
    }
    return apiKey;
  }

  private getSystemPrompt(): string {
    return `You are NutriBox AI, a helpful nutrition assistant for a smart food analysis system. 
    
    You help users with:
    - Nutrition advice and meal planning
    - Food analysis and health recommendations  
    - Dietary goals and tracking
    - General nutrition questions
    
    The user has access to a Raspberry Pi system that analyzes food items and provides nutrition data.
    Be friendly, helpful, and provide practical nutrition advice. Keep responses concise but informative.
    
    If asked about current food data, you can reference typical nutrition information, but mention that specific data comes from their NutriBox device.`;
  }

  async sendMessage(userMessage: string): Promise<string> {
    const apiKey = this.getApiKey();
    
    const messages: ChatGPTMessage[] = [
      {
        role: 'system',
        content: this.getSystemPrompt()
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key in Settings.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else {
          throw new Error(`API request failed: ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('No response from ChatGPT');
      }
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred while contacting ChatGPT');
      }
    }
  }

  // Method to get nutrition-specific responses with context
  async getNutritionAdvice(query: string, nutritionContext?: any): Promise<string> {
    let contextualQuery = query;
    
    if (nutritionContext) {
      contextualQuery = `${query}
      
      Current nutrition context:
      - Recent food: ${nutritionContext.foodName || 'N/A'}
      - Calories: ${nutritionContext.calories || 'N/A'}
      - Protein: ${nutritionContext.protein || 'N/A'}g
      - Carbs: ${nutritionContext.carbs || 'N/A'}g
      - Fats: ${nutritionContext.fats || 'N/A'}g`;
    }
    
    return this.sendMessage(contextualQuery);
  }
}

export const chatService = new ChatService();
