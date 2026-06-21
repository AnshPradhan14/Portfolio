import { useState, useCallback, useRef } from 'react';
import { CHATBOT_CONTEXT } from '../lib/chatbot-context';

export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We keep track of full message history for UI, but limit what we send to the API
  const messagesRef = useRef<ChatMessage[]>([]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    const userMsgId = Date.now().toString();
    const newUserMessage: ChatMessage = { id: userMsgId, role: 'user', content };
    
    // Update local state
    setMessages((prev) => {
      const updated = [...prev, newUserMessage];
      messagesRef.current = updated;
      return updated;
    });

    setIsLoading(true);

    try {
      // Limit history to the last 6 messages (3 user + 3 assistant)
      const historyToSend = messagesRef.current.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Prepend system context
      const apiMessages = [
        { role: 'system', content: CHATBOT_CONTEXT },
        ...historyToSend
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        }
        throw new Error('Failed to connect to ARIA. System error.');
      }

      if (!response.body) throw new Error('No response stream available');

      // Initialize the assistant message
      const assistantMsgId = (Date.now() + 1).toString();
      setMessages((prev) => {
        const updated = [...prev, { id: assistantMsgId, role: 'assistant', content: '' }];
        messagesRef.current = updated;
        return updated;
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let assistantContent = '';

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // The SSE from Groq/OpenAI comes in the format: data: {...}
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(dataStr);
              const delta = parsed.choices[0]?.delta?.content || '';
              assistantContent += delta;
              
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.id === assistantMsgId) {
                  lastMsg.content = assistantContent;
                }
                messagesRef.current = newMessages;
                return newMessages;
              });
            } catch (e) {
              // Ignore parse errors on partial chunks
            }
          }
        }
      }

    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    messagesRef.current = [];
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
}
