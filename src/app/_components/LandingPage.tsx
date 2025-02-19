'use client';
import React from 'react';
import ChatbotInterface from './ChatbotInterface';

interface LandingPageProps {
  handleChat: (input: string) => Promise<string>;
  initialMessages: { id: string; message: string; response: string }[];
}

const LandingPage = ({ handleChat, initialMessages }: LandingPageProps) => {
  return (
    <main className="max-w-6xl w-full h-screen p-16 mx-auto">
      <ChatbotInterface handleChat={handleChat} initialMessages={initialMessages} />
    </main>
  );
};

export default LandingPage;
