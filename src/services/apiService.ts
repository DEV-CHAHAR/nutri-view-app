
interface FoodAnalysis {
  id: number;
  name: string;
  weight: number;
  freshness: string;
  freshnessScore: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
  };
  environment: {
    temperature: number;
    humidity: number;
  };
  timestamp: string;
}

interface HistoryEntry {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

class ApiService {
  private getBaseUrl(): string {
    return localStorage.getItem('nutribox_pi_url') || 'https://my-pi.local/api';
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Get current food analysis
  async getCurrentFoodAnalysis(): Promise<FoodAnalysis> {
    try {
      const response = await this.fetchWithTimeout(`${this.getBaseUrl()}/current-food`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching current food analysis:', error);
      // Return dummy data if API is not available
      return this.getDummyFoodData();
    }
  }

  // Get nutrition history
  async getNutritionHistory(days: number = 7): Promise<HistoryEntry[]> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.getBaseUrl()}/nutrition-history?days=${days}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching nutrition history:', error);
      // Return dummy data if API is not available
      return this.getDummyHistoryData();
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${this.getBaseUrl()}/health`, {}, 5000);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Get system status
  async getSystemStatus(): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.getBaseUrl()}/status`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching system status:', error);
      return {
        status: 'offline',
        lastUpdate: new Date().toISOString(),
        error: 'Cannot connect to Raspberry Pi'
      };
    }
  }

  // Dummy data methods for offline mode
  private getDummyFoodData(): FoodAnalysis {
    return {
      id: 1,
      name: "Red Apple",
      weight: 185,
      freshness: "Good",
      freshnessScore: 85,
      nutrition: {
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fats: 0.3,
        fiber: 4.4,
        sugar: 19
      },
      environment: {
        temperature: 22.5,
        humidity: 65
      },
      timestamp: new Date().toISOString()
    };
  }

  private getDummyHistoryData(): HistoryEntry[] {
    return [
      { date: '2024-06-18', calories: 1850, protein: 85, carbs: 230, fats: 65 },
      { date: '2024-06-19', calories: 1920, protein: 92, carbs: 245, fats: 58 },
      { date: '2024-06-20', calories: 1780, protein: 78, carbs: 220, fats: 62 },
      { date: '2024-06-21', calories: 2100, protein: 105, carbs: 275, fats: 70 },
      { date: '2024-06-22', calories: 1950, protein: 88, carbs: 240, fats: 68 },
      { date: '2024-06-23', calories: 1820, protein: 82, carbs: 225, fats: 59 },
      { date: '2024-06-24', calories: 1980, protein: 95, carbs: 250, fats: 65 },
    ];
  }
}

export const apiService = new ApiService();
export type { FoodAnalysis, HistoryEntry };
