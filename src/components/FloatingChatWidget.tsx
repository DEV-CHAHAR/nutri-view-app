
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatService } from '@/services/chatService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your NutriBox AI assistant. Ask me about nutrition, meal planning, or your health goals!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please check your OpenAI API key in settings and try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 2, 
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(147, 51, 234, 0.4)",
              "0 0 0 15px rgba(147, 51, 234, 0)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl border-4 border-white"
            size="lg"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl border-2 border-purple-100 z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          >
            {/* Enhanced Header */}
            <motion.div 
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-t-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="p-1 bg-white/20 rounded-full"
                >
                  <Bot className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold text-lg">Ask NutriBox</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-1"
                          >
                            <Bot className="w-4 h-4 text-purple-600" />
                          </motion.div>
                        )}
                        {message.sender === 'user' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-1"
                          >
                            <User className="w-4 h-4" />
                          </motion.div>
                        )}
                        <div>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-4 h-4 text-purple-600" />
                      </motion.div>
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <motion.div 
              className="p-4 bg-white border-t border-gray-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-3">
                <motion.div 
                  className="flex-1"
                  whileFocus={{ scale: 1.02 }}
                >
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about nutrition, meals, or health..."
                    disabled={isLoading}
                    className="rounded-xl border-2 border-gray-200 focus:border-purple-400 transition-colors"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatWidget;
