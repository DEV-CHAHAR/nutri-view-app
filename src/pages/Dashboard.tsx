
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, History, Settings, Apple, Thermometer, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatbotModal from '@/components/ChatbotModal';

// Dummy data structure for food analysis
const dummyFoodData = {
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

const Dashboard = () => {
  const [currentFood, setCurrentFood] = useState(dummyFoodData);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const getFreshnessColor = (freshness: string) => {
    switch (freshness.toLowerCase()) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">NutriBox Dashboard</h1>
            <p className="text-gray-600">Smart Food Analysis System</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsChatbotOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Link to="/settings">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Food Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Food Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Current Food Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{currentFood.name}</h3>
                  <p className="text-gray-600">{currentFood.weight}g</p>
                </div>
                <Badge className={`${getFreshnessColor(currentFood.freshness)} text-white`}>
                  {currentFood.freshness} ({currentFood.freshnessScore}%)
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{currentFood.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentFood.nutrition.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentFood.nutrition.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{currentFood.nutrition.fats}g</div>
                  <div className="text-sm text-gray-600">Fats</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{currentFood.nutrition.fiber}g</div>
                  <div className="text-sm text-gray-600">Fiber</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{currentFood.nutrition.sugar}g</div>
                  <div className="text-sm text-gray-600">Sugar</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-semibold">{currentFood.environment.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-semibold">{currentFood.environment.humidity}%</span>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  Last updated: {new Date(currentFood.timestamp).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <Link to="/history">
            <Button size="lg" variant="outline" className="min-w-32">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </Link>
          <Button 
            size="lg" 
            onClick={() => setIsChatbotOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-w-32"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
