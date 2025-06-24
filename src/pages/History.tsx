
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Dummy historical data
const dailyData = [
  { date: '2024-06-18', calories: 1850, protein: 85, carbs: 230, fats: 65 },
  { date: '2024-06-19', calories: 1920, protein: 92, carbs: 245, fats: 58 },
  { date: '2024-06-20', calories: 1780, protein: 78, carbs: 220, fats: 62 },
  { date: '2024-06-21', calories: 2100, protein: 105, carbs: 275, fats: 70 },
  { date: '2024-06-22', calories: 1950, protein: 88, carbs: 240, fats: 68 },
  { date: '2024-06-23', calories: 1820, protein: 82, carbs: 225, fats: 59 },
  { date: '2024-06-24', calories: 1980, protein: 95, carbs: 250, fats: 65 },
];

const weeklyData = [
  { week: 'Week 1', calories: 13200, protein: 588, carbs: 1610, fats: 420 },
  { week: 'Week 2', calories: 13800, protein: 620, carbs: 1720, fats: 450 },
  { week: 'Week 3', calories: 14100, protein: 640, carbs: 1800, fats: 465 },
  { week: 'Week 4', calories: 13600, protein: 595, carbs: 1680, fats: 435 },
];

const macroDistribution = [
  { name: 'Carbs', value: 45, color: '#10B981' },
  { name: 'Protein', value: 25, color: '#3B82F6' },
  { name: 'Fats', value: 30, color: '#F59E0B' },
];

const History = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Nutrition History</h1>
              <p className="text-gray-600">Track your daily and weekly nutrition trends</p>
            </div>
          </div>
        </div>

        {/* Nutrition Charts */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Daily View
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Weekly View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Daily Calorie Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Calorie Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#F59E0B" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Macronutrients */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Macronutrients</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="protein" fill="#3B82F6" />
                    <Bar dataKey="carbs" fill="#10B981" />
                    <Bar dataKey="fats" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Calorie Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="calories" stroke="#F59E0B" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Macro Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={macroDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {macroDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">13,800</div>
                <div className="text-sm text-gray-600">Avg Weekly Calories</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">611g</div>
                <div className="text-sm text-gray-600">Avg Weekly Protein</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">1,703g</div>
                <div className="text-sm text-gray-600">Avg Weekly Carbs</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">443g</div>
                <div className="text-sm text-gray-600">Avg Weekly Fats</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
