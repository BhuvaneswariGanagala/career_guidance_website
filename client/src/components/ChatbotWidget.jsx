import React, { useState } from 'react';
import { Bot, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = [
  'What courses can I take after 12th?',
  'Tell me about JEE Main exam',
  'Best career options in science stream',
  'Top engineering colleges in India',
  'What is the eligibility for NEET?',
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (query = question) => {
    if (!query.trim()) return;

    const userMessage = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('https://aspirex-chatbot.onrender.com/ask/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ question: query }),
      });

      const data = await response.json();
      const botMessage = { role: 'bot', text: data.answer || 'No response received.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Error: Unable to reach the chatbot.' },
      ]);
    } finally {
      setQuestion('');
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4 }}
            className="relative w-[380px] h-[540px] bg-gradient-to-br from-white/70 to-purple-100/50 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white rounded-t-3xl shadow-md">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <Bot className="w-5 h-5" /> AspireX Chatbot
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-red-200 transition">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.length === 0 && !loading && (
                <div className="text-gray-700 text-sm mb-2">
                  👋 Hi there! Try asking one of these:
                  <div className="mt-2 space-y-2">
                    {suggestions.map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sugg)}
                        className="w-full text-left bg-white/80 hover:bg-purple-100 border border-purple-200 text-sm px-3 py-2 rounded-lg shadow"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-xl max-w-[80%] text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-white/80 text-gray-800 self-start mr-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-white/70 p-2 rounded-xl text-sm text-gray-600 w-fit">
                  Typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white/40 flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
