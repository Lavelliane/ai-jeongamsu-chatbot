'use client';
import React, { useEffect, useState } from 'react';
import { Send, Menu } from 'lucide-react';
import Image from 'next/image';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useTranslations } from 'next-intl';
import icon from '../../../public/jeonghamsu-icons/2.svg';
import { createClient } from '@/lib/db/client';
import { useSearchParams } from 'next/navigation';
import { marked } from 'marked';

interface ChatbotInterfaceProps {
  handleChat: (input: string, sessionId: string) => Promise<string>;
  initialMessages: { id: string; message: string; response: string }[];
}

const ChatbotInterface = ({ handleChat, initialMessages }: ChatbotInterfaceProps) => {
  const t = useTranslations('ChatbotInterface');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  useEffect(() => {
    const supabase = createClient();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations'
        },
        (payload) => {
          const newMessage = payload.new as { id: string; message: string; response: string };
          // Prevent duplicate messages by checking if it already exists
          setMessages((prev) => {
            if (!prev.some(msg => msg.id === newMessage.id)) {
              return [...prev, newMessage];
            }
            return prev;
          });
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const currentMessage = message;
    setMessage(''); // Clear input immediately
    setIsLoading(true);

    try {
      // Add user message immediately
      const newUserMessage = {
        id: `temp-${Date.now()}`,
        message: currentMessage,
        response: ''
      };
      
      setMessages(prev => [...prev, newUserMessage]);

      // Get bot response
      const response = await handleChat(currentMessage, sessionId ?? '');

      // Update messages with bot response
      // Note: The actual message will be added via the real-time subscription
      // This is just for optimistic UI update
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.id === newUserMessage.id) {
          return [...prev.slice(0, -1), {
            ...lastMessage,
            response
          }];
        }
        return prev;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error state appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Tech background pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c3c6ce_1px,transparent_1px),linear-gradient(to_bottom,#c3c6ce_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 via-blue-200/10 to-purple-200/10"></div>
      </div>

      {/* Main container */}
      <div className="flex flex-col w-full max-w-lg mx-auto z-10 bg-white/15 backdrop-blur-md rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex-none bg-shark-800/80 border-b border-shark-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white items-center justify-center flex">
                <Image
                  src={icon}
                  alt="jeonghamsu mascot"
                  width={92}
                  height={92}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-shark-100">{t('name')}</h1>
                <p className="text-sm text-shark-300">{t('description')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-shark-400 hover:text-shark-200 transition-colors">
                <LanguageDropdown />
              </button>
              <button className="text-shark-400 hover:text-shark-200 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex flex-col space-y-2">
              <div className="flex justify-end">
                <div className="max-w-[80%] p-3 rounded-2xl bg-tanhide-600 text-shark-100">
                  {msg.message}
                </div>
              </div>
              {msg.response && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-shark-700/80 border border-shark-600 text-shark-100" dangerouslySetInnerHTML={{ __html: marked.parse(msg.response) }}>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-shark-700/80 border border-shark-600 text-shark-100">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="flex-none bg-shark-800/80 border-t border-shark-700 p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder={t('placeholder')}
              className="flex-1 bg-shark-700/50 text-shark-100 placeholder-shark-400 rounded-xl px-4 py-2 outline-none border border-shark-600 focus:border-shark-500 transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="p-2 bg-tanhide-600 hover:bg-tanhide-500 rounded-xl text-shark-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;