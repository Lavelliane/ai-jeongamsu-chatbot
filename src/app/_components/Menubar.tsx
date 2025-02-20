'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import {
  LucideMessageCircle,
  LucidePhone,
  LucideShieldQuestion,
} from 'lucide-react';
import { Button } from '@heroui/react';

interface MenubarProps {
  tab: string;
  setTab: (tab: string) => void;
}

const Menubar = ({ tab, setTab }: MenubarProps) => {
  const t = useTranslations('Navigation');

  const navItems = [
    {
      label: t('about'),
      value: 'about',
      icon: <LucideShieldQuestion size={32} />,
    },
    {
      label: t('chat'),
      value: 'chat',
      icon: <LucideMessageCircle size={32} />,
    },
    { label: t('contact'), value: 'contact', icon: <LucidePhone size={32} /> },
  ];

  const selected =
    'transition-all duration-[450ms] ease-in-out bg-tanhide-500 scale-[110%] shadow-lg shadow-black/15';
  const idle =
    'transition-all duration-[450ms] ease-in-out bg-transparent scale-100 text-tanhide-100 hover:text-tanhide-500 hover:scale-[110%]';

  return (
    <div className="w-full h-fit rounded-2xl bg-shark-900/80 z-20">
      <div className="flex w-full h-full gap-2 justify-evenly p-0">
        {navItems.map(item => (
          <Button
            onPress={() => setTab(item.value)}
            variant="solid"
            color="primary"
            isIconOnly
            key={item.value}
            className={`flex flex-col items-center justify-center w-20 h-14 ${
              item.value === tab ? selected : idle
            }`}
          >
            {item.icon}
            {/* <p className="text-shark-100">{item.label}</p> */}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Menubar;
