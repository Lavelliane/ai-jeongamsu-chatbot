'use client';

import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type LanguageOptionType = {
  key: string;
  value: string;
  name: string;
};

const languageOptions: LanguageOptionType[] = [
  {
    key: 'en',
    value: 'English',
    name: 'EN',
  },
  {
    key: 'kr',
    value: 'Korean',
    name: 'KR',
  },
];

const LanguageDropdown = () => {
  const router = useRouter();
  const localeCookie = getCookie('locale');
  const [locale, setLocale] = useState<LanguageOptionType>();

  useEffect(() => {
    const storedLanguage = languageOptions.find(
      language => language.key === localeCookie?.valueOf()
    );
    setLocale(storedLanguage || languageOptions[0]);
  }, []);

  // set locale cookie
  useEffect(() => {
    if (!locale) return;

    setCookie('locale', locale?.key, { path: '/', maxAge: 60 * 60 * 24 * 30 });
    router.refresh();
  }, [locale]);

  const handleLanguageChange = (language: LanguageOptionType) => {
    setLocale(language);
  };

  return (
    <Dropdown placement="bottom-start" className="bg-black/60">
      <DropdownTrigger>
        <Button
          className="border-2 border-tanhide-400 bg-shark-50 text-tanhide-500"
          isIconOnly
          variant="solid"
          radius="full"
          size="md"
        >
          <span className="flex items-center font-semibold justify-center">
            {locale?.name}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Language" variant="flat" color="default">
        {languageOptions.map(language => (
          <DropdownItem
            key={language.key}
            className="text-white"
            startContent={
              <span className="w-8 h-8 rounded-full flex items-center font-semibold bg-shark-50 text-tanhide-500 justify-center">
                {language.name}
              </span>
            }
            selectedIcon={true}
            onPress={() => handleLanguageChange(language)}
          >
            {language.value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageDropdown;
