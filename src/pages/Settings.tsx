
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, TestTube, Wifi, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [raspberryPiUrl, setRaspberryPiUrl] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { toast } = useToast();

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
      // Test connection to Raspberry Pi
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

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Configure your NutriBox system</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* OpenAI API Key */}
          <Card>
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
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Get your API key from{' '}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    OpenAI Platform
                  </a>
                </p>
                {openaiApiKey && (
                  <p className="text-sm text-green-600 mt-1">
                    Current key: {maskApiKey(openaiApiKey)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Raspberry Pi Configuration */}
          <Card>
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
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the URL of your Raspberry Pi's API endpoint
                </p>
              </div>
              
              <Button
                onClick={testRaspberryPiConnection}
                disabled={isTestingConnection}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isTestingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
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
                  <strong>API Status:</strong> 
                  <span className={openaiApiKey ? 'text-green-600' : 'text-red-600'}>
                    {openaiApiKey ? ' Configured' : ' Not Configured'}
                  </span>
                </div>
                <div>
                  <strong>Pi Connection:</strong> 
                  <span className="text-yellow-600"> Untested</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
