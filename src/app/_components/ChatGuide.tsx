import { LucideMessageCircleQuestion } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

const ChatGuide = () => {
  const t = useTranslations('Chat');

  return (
    <div className="flex flex-col pt-40 w-full items-center justify-center gap-2 text-shark-400">
      <h4>{t('guide.greeting')}</h4>
      <div className="flex gap-2 items-end">
        <p>{t('guide.askPrompt')}</p>
        <LucideMessageCircleQuestion className="text-tanhide-400" />
        <p>{t('guide.getStarted')}</p>
      </div>
    </div>
  );
};

export default ChatGuide;
