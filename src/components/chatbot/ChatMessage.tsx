import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../hooks/useChat';

interface Props {
  message: ChatMessageType;
}

// Very basic text parser to handle line breaks, bold, and bullet points
// since we are avoiding heavy markdown dependencies for speed.
const parseContent = (text: string) => {
  const blocks = text.split('\n');
  return blocks.map((block, i) => {
    if (!block.trim()) return <br key={i} />;
    
    // Check if it's a bullet point
    if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
      const line = block.trim().substring(2);
      return (
        <li key={i} className="ml-4 list-disc marker:text-cyber-cyan mb-1">
          <FormattedText text={line} />
        </li>
      );
    }
    
    return (
      <p key={i} className="mb-2 last:mb-0">
        <FormattedText text={block} />
      </p>
    );
  });
};

const FormattedText = ({ text }: { text: string }) => {
  // Simple bold matching **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-cyber-pink font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
};

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border
          ${isUser 
            ? 'bg-cyber-dark border-cyber-pink/30' 
            : 'bg-cyber-darker border-cyber-cyan/30'
          }`}
        >
          {isUser ? <User size={16} className="text-cyber-pink" /> : <Bot size={16} className="text-cyber-cyan" />}
        </div>

        {/* Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl text-sm font-rajdhani
          ${isUser 
            ? 'bg-gradient-to-br from-cyber-pink/20 to-cyber-purple/20 border border-cyber-pink/30 text-cyber-light rounded-tr-sm' 
            : 'bg-cyber-dark/80 backdrop-blur-md border border-white/5 text-cyber-light/90 rounded-tl-sm shadow-[0_0_15px_rgba(102,255,255,0.05)]'
          }`}
        >
          {parseContent(message.content)}
        </div>
      </div>
    </motion.div>
  );
};
