import { LucideMessageCircleQuestion } from 'lucide-react';
import React from 'react';

const ChatGuide = () => {
  return (
    <div className="flex flex-col pt-40 w-full items-center justify-center gap-2 text-shark-400">
      <h4>Say Hi to Jeonghamsu!</h4>
      <div className="flex gap-2 items-end">
        <p>Ask anything or press</p>{' '}
        <LucideMessageCircleQuestion className="text-tanhide-400" />
        <p>to get started.</p>
      </div>
    </div>
  );
};

export default ChatGuide;
