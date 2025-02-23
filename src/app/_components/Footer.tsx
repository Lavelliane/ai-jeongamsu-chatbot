import React from 'react';
import { Link, Image } from '@heroui/react';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <div>
      <div className="py-8 flex flex-col items-center text-center gap-4 text-shark-900">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p dangerouslySetInnerHTML={{ __html: t('department') }}></p>
        <Link
          className="flex items-center gap-2"
          href="https://cns.kookmin.ac.kr/cns/index.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://cns.kookmin.ac.kr/cns/index.do
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex justify-center gap-4">
        <Image
          loading="eager"
          src="/kookmin-logo.png"
          alt="kookmin-university-logo"
          width={64}
          height={64}
        />
      </div>
    </div>
  );
};

export default Footer;
