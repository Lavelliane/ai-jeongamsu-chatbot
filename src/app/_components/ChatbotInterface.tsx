'use client';
import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';
import Image from 'next/image';
import LanguageDropdown from '@/components/LanguageDropdown';
import { useTranslations } from 'next-intl';

const ChatbotInterface = () => {
  const t = useTranslations('ChatbotInterface');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요! 사이버보안학과 챗봇 정암수입니다. 무엇을 도와드릴까요?',
      isBot: true,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, isBot: false },
      ]);
      setMessage('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: '메시지를 받았습니다. 어떻게 도와드릴까요?',
            isBot: true,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full ">
      {/* Tech background pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c3c6ce_1px,transparent_1px),linear-gradient(to_bottom,#c3c6ce_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 via-blue-200/10 to-purple-200/10"></div>
      </div>

      {/* Main container */}
      <div className="flex flex-col w-full max-w-lg mx-auto z-10 bg-white/15 backdrop-blur-md rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex-none bg-slate-800/80 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white items-center justify-center flex">
                <Image
                  src={'/mascot-icon.png'}
                  alt="jeonghamsu mascot"
                  width={92}
                  height={92}
                />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-100">
                  {t('name')}
                </h1>
                <p className="text-sm text-slate-300">사이버보안학과 챗봇</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-400 hover:text-slate-200 transition-colors">
                <LanguageDropdown />
              </button>
              <button className="text-slate-400 hover:text-slate-200 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.isBot
                    ? 'bg-slate-700/80 border border-slate-600 text-slate-100'
                    : 'bg-blue-600 text-slate-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="flex-none bg-slate-800/80 border-t border-slate-700 p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-slate-700/50 text-slate-100 placeholder-slate-400 rounded-xl px-4 py-2 outline-none border border-slate-600 focus:border-slate-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-slate-100 transition-colors"
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
