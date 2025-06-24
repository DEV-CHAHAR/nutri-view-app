
import { chatService } from './chatService';

class TipService {
  private cachedTip: { tip: string; date: string } | null = null;

  async getDailyTip(): Promise<string> {
    const today = new Date().toDateString();
    
    // Return cached tip if it's from today
    if (this.cachedTip && this.cachedTip.date === today) {
      return this.cachedTip.tip;
    }

    try {
      const tip = await chatService.sendMessage(
        "Give me a short, motivational health tip for today (2-3 sentences max). Focus on practical nutrition or wellness advice."
      );
      
      // Cache the tip for today
      this.cachedTip = { tip, date: today };
      
      return tip;
    } catch (error) {
      // Fallback tips if API fails
      const fallbackTips = [
        "Stay hydrated! Drinking water throughout the day helps with digestion and keeps your energy levels stable.",
        "Try to include a variety of colorful fruits and vegetables in your meals - each color provides different nutrients.",
        "Take a short walk after eating. It can help with digestion and blood sugar regulation.",
        "Mindful eating is key - try to eat slowly and pay attention to your hunger and fullness cues.",
        "Protein at every meal helps keep you satisfied and supports muscle health."
      ];
      
      const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
      this.cachedTip = { tip: randomTip, date: today };
      
      return randomTip;
    }
  }
}

export const tipService = new TipService();
