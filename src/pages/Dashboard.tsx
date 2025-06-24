import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, History, Settings, Apple, Thermometer, Droplets, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatbotModal from '@/components/ChatbotModal';
import LogoAnimation from '@/components/LogoAnimation';
import FloatingAIAssistant from '@/components/FloatingAIAssistant';
import AnimatedCounter from '@/components/AnimatedCounter';
import MiniBarChart from '@/components/MiniBarChart';
import { tipService } from '@/services/tipService';

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
  const [showAnimation, setShowAnimation] = useState(true);
  const [dailyTip, setDailyTip] = useState<string>('');

  useEffect(() => {
    // Load daily tip
    tipService.getDailyTip().then(setDailyTip);
  }, []);

  const getFreshnessColor = (freshness: string) => {
    switch (freshness.toLowerCase()) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Daily summary data for count-up animation
  const dailySummary = {
    calories: 1450,
    protein: 78,
    carbs: 185,
    fats: 52
  };

  // Mini bar chart data
  const chartData = [
    { label: 'Cal', value: dailySummary.calories, max: 2000, color: 'bg-orange-500' },
    { label: 'Pro', value: dailySummary.protein, max: 100, color: 'bg-blue-500' },
    { label: 'Carb', value: dailySummary.carbs, max: 250, color: 'bg-green-500' },
    { label: 'Fat', value: dailySummary.fats, max: 80, color: 'bg-purple-500' },
  ];

  // Enhanced container variants for staggered animations - fixed ease types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] // Fixed: use cubic bezier array instead of string
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <LogoAnimation onComplete={() => setShowAnimation(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnimation ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={showAnimation ? "hidden" : "visible"}
        >
          {/* Enhanced Header */}
          <motion.div
            className="flex justify-between items-center mb-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                NutriBox Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Smart Food Analysis System</p>
            </motion.div>
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setIsChatbotOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </motion.div>
              <Link to="/settings">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTrap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Enhanced Daily Summary Card */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <Apple className="w-6 h-6" />
                    </motion.div>
                    Daily Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { value: dailySummary.calories, label: 'Calories', color: 'from-orange-400 to-orange-600', icon: '🔥' },
                      { value: dailySummary.protein, label: 'Protein', color: 'from-blue-400 to-blue-600', icon: '💪', suffix: 'g', decimals: 1 },
                      { value: dailySummary.carbs, label: 'Carbs', color: 'from-green-400 to-green-600', icon: '🌾', suffix: 'g' },
                      { value: dailySummary.fats, label: 'Fats', color: 'from-purple-400 to-purple-600', icon: '🥑', suffix: 'g' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className={`text-center p-4 bg-gradient-to-br ${item.color} rounded-xl text-white shadow-lg`}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.05,
                          rotateY: 5,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-3xl font-bold mb-1">
                          <AnimatedCounter 
                            value={item.value} 
                            duration={2} 
                            suffix={item.suffix || ''} 
                            decimals={item.decimals || 0} 
                          />
                        </div>
                        <div className="text-sm opacity-90">{item.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      📊 Today's Nutrient Breakdown
                    </h4>
                    <MiniBarChart data={chartData} />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Current Food Analysis and Environment */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Enhanced Main Food Card */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Apple className="w-6 h-6" />
                      Current Food Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <motion.div 
                      className="flex items-center justify-between mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{currentFood.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">{currentFood.weight}g</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Badge className={`${getFreshnessColor(currentFood.freshness)} text-white text-sm px-3 py-1`}>
                          {currentFood.freshness} ({currentFood.freshnessScore}%)
                        </Badge>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">{currentFood.nutrition.calories}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{currentFood.nutrition.protein}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-300">{currentFood.nutrition.carbs}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{currentFood.nutrition.fats}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Fats</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{currentFood.nutrition.fiber}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Fiber</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-300">{currentFood.nutrition.sugar}g</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sugar</div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Enhanced Environment and Tip Cards */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                className="mb-6"
              >
                <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5" />
                      Environment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Last updated: {new Date(currentFood.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Tip of the Day Card */}
              <motion.div
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              >
                <Card className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-100 border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Lightbulb className="w-5 h-5" />
                      </motion.div>
                      Tip of the Day
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <motion.p 
                      className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {dailyTip || "Loading your daily health tip..."}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Quick Actions */}
          <motion.div
            className="flex gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/history">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="min-w-40 shadow-lg hover:shadow-xl transition-all">
                  <History className="w-5 h-5 mr-2" />
                  View History
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={() => setIsChatbotOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-w-40 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Ask AI
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Chat Widget */}
        <FloatingAIAssistant />

        {/* Chatbot Modal */}
        <ChatbotModal 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      </motion.div>
    </>
  );
};

export default Dashboard;
