import { Card, CardBody, CardHeader, Divider, Image } from '@heroui/react';
import {
  LucideBookOpen,
  LucideChartSpline,
  LucideLanguages,
  LucideSearch,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import Footer from './Footer';

const AboutTab = () => {
  const t = useTranslations('About');
  const icons = [
    '1.svg',
    '2.svg',
    '3.svg',
    '4.svg',
    '5.svg',
    '6.svg',
    '7.svg',
    '8.svg',
    '9.svg',
    '10.svg',
    '11.svg',
    '12.svg',
    '13.svg',
    '14.svg',
    '15.svg',
    '16.svg',
  ];

  // Get the items array from translations
  const features = ['item-1', 'item-2', 'item-3', 'item-4'];

  const selectRandomIcon = () => {
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <div className="flex flex-col gap-2 flex-1 items-center justify-center p-4">
      <div className="w-24 h-24">
        {
          <Image
            loading="eager"
            src={`/jeonghamsu-icons/${selectRandomIcon()}`}
            alt={'Jeonghamsu Icons'}
            width={'auto'}
            height={'auto'}
          />
        }
      </div>
      <h4>{t('hero.title')}</h4>
      <h6>{t('hero.subtitle')}</h6>
      <p className="text-center my-4">{t('hero.description')}</p>
      <Card className="w-full mt-4 text-shark-100 bg-shark-900 p-4 relative">
        <LucideBookOpen
          className="absolute top-0 right-2 text-shark-800"
          size={200}
        />
        <CardHeader title={t('mission.title')}>
          <h4>{t('mission.title')}</h4>
        </CardHeader>
        <CardBody>
          <p>{t('mission.content')}</p>
        </CardBody>
      </Card>
      <div className="py-8 flex flex-col items-center gap-4 text-shark-900">
        <h4>{t('features.title')}</h4>
        <div className="flex flex-col gap-2">
          {features.map((key, index) => (
            <div key={key} className="flex flex-col gap-2">
              {index !== 0 && <Divider className="bg-shark-300" />}
              <p className="px-2">
                {t(`features.${key}.title`)} ({t(`features.${key}.description`)}
                )
              </p>
            </div>
          ))}
        </div>
      </div>
      <Card className="w-full bg-tanhide-500 text-shark-100 p-4 relative">
        <LucideLanguages
          className="absolute top-0 right-1 text-tanhide-50"
          size={110}
        />
        <CardHeader title={t('language-support.title')}>
          <h4>{t('language-support.title')}</h4>
        </CardHeader>
        <CardBody>
          <p className="max-w-48">{t('language-support.content')}</p>
        </CardBody>
      </Card>
      <div className="py-8 px-8 flex flex-col items-center gap-4 text-shark-900">
        <LucideChartSpline size={64} />
        <h4>{t('development.title')}</h4>
        <div className="flex flex-col gap-2">
          <p className="text-center">{t('development.content')}</p>
        </div>
      </div>
      <Card className="w-full mt-4 text-shark-100 bg-shark-900/60 p-4 relative">
        <LucideSearch
          className="absolute top-0 right-2 text-shark-500"
          size={140}
        />
        <CardHeader title={t('contact.title')}>
          <h4>{t('contact.title')}</h4>
        </CardHeader>
        <CardBody>
          <p>{t('contact.content')}</p>
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
};

export default AboutTab;
