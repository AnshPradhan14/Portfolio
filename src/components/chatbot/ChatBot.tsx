import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Terminal, Zap } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from './ChatMessage';

const SUGGESTED_QUERIES = [
  "What are your core skills?",
  "Tell me about your projects.",
  "Are you available for hire?"
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, error, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-purple shadow-[0_0_20px_rgba(232,102,255,0.4)] hover:shadow-[0_0_30px_rgba(232,102,255,0.6)] transition-shadow duration-300 group"
            >
              <Bot size={28} className="text-white group-hover:animate-pulse" />
              {/* Ping animation indicator */}
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-cyan"></span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[80vh] flex flex-col overflow-hidden rounded-2xl backdrop-blur-xl bg-cyber-darker/90 border border-cyber-pink/20 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(232,102,255,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-cyber-dark border border-cyber-cyan/50 flex items-center justify-center">
                    <Terminal size={16} className="text-cyber-cyan" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-cyber-darker"></span>
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyber-pink to-cyber-cyan">
                    ARIA
                  </h3>
                  <p className="font-rajdhani text-xs text-cyber-light/50 flex items-center gap-1">
                    <Zap size={10} className="text-yellow-400" /> Powered by Groq
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-cyber-light/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-cyber-pink/30 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-80">
                  <Bot size={48} className="text-cyber-pink/40 mb-4" />
                  <p className="font-orbitron text-sm text-cyber-light/80 tracking-widest mb-2">SYSTEM ONLINE</p>
                  <p className="font-rajdhani text-cyber-light/60 text-sm max-w-[80%] mb-8">
                    I am ARIA. How can I assist you with Ansh's portfolio?
                  </p>
                  
                  <div className="flex flex-col gap-2 w-full max-w-[90%]">
                    {SUGGESTED_QUERIES.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(query)}
                        className="text-left px-4 py-2 rounded-lg text-sm font-rajdhani border border-cyber-cyan/20 bg-cyber-cyan/5 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 transition-colors text-cyber-cyan"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-cyber-cyan/60 ml-2 mt-2"
                    >
                      <Bot size={14} />
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}
                  
                  {error && (
                    <div className="text-center p-3 mt-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-rajdhani text-sm">
                      {error}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-white/5">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ARIA anything..."
                  className="w-full bg-cyber-dark/50 border border-cyber-pink/20 rounded-full py-3 pl-4 pr-12 font-rajdhani text-sm text-cyber-light placeholder:text-cyber-light/30 focus:outline-none focus:border-cyber-pink/60 focus:ring-1 focus:ring-cyber-pink/60 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-purple text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(232,102,255,0.4)] transition-all"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
