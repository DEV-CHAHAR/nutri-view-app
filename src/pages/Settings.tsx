
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, TestTube, Wifi, Key, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import UserProfile from '@/components/UserProfile';

const Settings = () => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [raspberryPiUrl, setRaspberryPiUrl] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved settings from localStorage
    const savedApiKey = localStorage.getItem('nutribox_openai_key');
    const savedPiUrl = localStorage.getItem('nutribox_pi_url');
    
    if (savedApiKey) setOpenaiApiKey(savedApiKey);
    if (savedPiUrl) setRaspberryPiUrl(savedPiUrl);
    else setRaspberryPiUrl('https://my-pi.local/api'); // Default value
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('nutribox_openai_key', openaiApiKey);
    localStorage.setItem('nutribox_pi_url', raspberryPiUrl);
    
    toast({
      title: "Settings Saved",
      description: "Your API key and Raspberry Pi URL have been saved successfully.",
    });
  };

  const testRaspberryPiConnection = async () => {
    if (!raspberryPiUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Raspberry Pi URL first.",
        variant: "destructive",
      });
      return;
    }

    setIsTestingConnection(true);
    
    try {
      const response = await fetch(`${raspberryPiUrl}/health`);
      
      if (response.ok) {
        toast({
          title: "Connection Successful",
          description: "Successfully connected to your Raspberry Pi!",
        });
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to Raspberry Pi. Please check the URL and network connection.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'api', label: 'API Settings', icon: Key },
    { id: 'device', label: 'Device', icon: Wifi },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Configure your NutriBox system</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
            >
              {theme === 'light' ? '🌙' : '☀️'}
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <UserProfile />
            )}

            {activeTab === 'api' && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    OpenAI API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <Input
                      id="openai-key"
                      type="password"
                      value={openaiApiKey}
                      onChange={(e) => setOpenaiApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="mt-1 bg-white/50 dark:bg-gray-700/50"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Get your API key from{' '}
                      <a 
                        href="https://platform.openai.com/api-keys" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        OpenAI Platform
                      </a>
                    </p>
                    {openaiApiKey && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Current key: {maskApiKey(openaiApiKey)}
                      </p>
                    )}
                  </div>
                  <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save API Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'device' && (
              <>
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className="w-5 h-5" />
                      Raspberry Pi Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pi-url">Raspberry Pi API URL</Label>
                      <Input
                        id="pi-url"
                        type="url"
                        value={raspberryPiUrl}
                        onChange={(e) => setRaspberryPiUrl(e.target.value)}
                        placeholder="https://my-pi.local/api"
                        className="mt-1 bg-white/50 dark:bg-gray-700/50"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Enter the URL of your Raspberry Pi's API endpoint
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={testRaspberryPiConnection}
                        disabled={isTestingConnection}
                        variant="outline"
                      >
                        <TestTube className="w-4 h-4 mr-2" />
                        {isTestingConnection ? 'Testing...' : 'Test Connection'}
                      </Button>
                      <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Device Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>App Version:</strong> 1.0.0
                      </div>
                      <div>
                        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                      </div>
                      <div>
                        <strong>User:</strong> {user?.name}
                      </div>
                      <div>
                        <strong>API Status:</strong> 
                        <span className={openaiApiKey ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {openaiApiKey ? ' Configured' : ' Not Configured'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
