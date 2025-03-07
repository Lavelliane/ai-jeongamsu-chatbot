import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Link,
} from '@heroui/react';
import { useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  Bug,
  MapPin,
  Clock,
  CalendarClock,
  Navigation,
  LucideUser,
} from 'lucide-react';
import Footer from './Footer';

const ContactTab = () => {
  const t = useTranslations('Contact');

  const officeHours = {
    regular: t('office.regular'),
    lunch: t('office.lunch'),
    consultation: t('office.consultation.hours'),
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-start p-4 min-h-screen">
      <div className="w-24 h-24">
        <Image
          src="/kookmin-logo.png"
          alt="Kookmin University Logo"
          width={96}
          height={96}
          className="w-full h-full object-contain"
        />
      </div>

      <h4 className="text-center text-shark-900">{t('page.title')}</h4>
      <p className="text-center text-shark-600 max-w-2xl mb-8">
        {t('page.description')}
      </p>

      <div className="w-full max-w-3xl grid gap-6">
        {/* Location Card with Interactive Map Link */}
        <Card className="w-full bg-shark-900 text-shark-100 p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-shark-800 opacity-20">
            <Navigation size={140} />
          </div>
          <CardHeader className="flex flex-row items-center gap-2">
            <MapPin className="w-6 h-6" />
            <h4>{t('location.title')}</h4>
          </CardHeader>
          <CardBody>
            <div className="grid gap-4">
              <div>
                <h6 className="text-shark-200">
                  {t('location.building')}, {t('location.room')}
                </h6>
                <p className="text-shark-200">{t('location.address')}</p>
              </div>
              <a
                href={t('location.mapLink')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-shark-800 hover:bg-shark-700 text-shark-100 px-4 py-2 rounded-md w-fit"
              >
                <Navigation className="w-4 h-4" />
                {t('location.viewMap')}
              </a>
            </div>
          </CardBody>
        </Card>

        {/* Office Hours */}
        <Card className="w-full bg-shark-900/90 text-shark-100 p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-shark-700">
            <Clock size={130} />
          </div>
          <CardHeader className="flex flex-row items-center gap-2">
            <CalendarClock className="w-6 h-6" />
            <h4>{t('office.title')}</h4>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-shark-200">
                <Clock className="w-4 h-4" />
                <h6>{officeHours.regular}</h6>
              </div>
              <div className="flex items-center gap-2 text-shark-200">
                <Clock className="w-4 h-4" />
                <h6>{officeHours.lunch}</h6>
              </div>
              <Divider className="bg-shark-200" />
              <div className="flex flex-col gap-2">
                <h6 className="text-shark-100">
                  {t('office.consultation.title')}
                </h6>
                <p className="text-shark-200">{officeHours.consultation}</p>
                <p className="text-shark-300 mt-2">
                  {t('office.consultation.note')}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Directory */}
        <Card className="w-full bg-shark-900/80 text-shark-100 relative p-4 overflow-hidden">
          <div className="absolute top-0 right-0 text-shark-500">
            <LucideUser size={160} />
          </div>
          <CardHeader className="flex flex-row items-center gap-2">
            <LucideUser className="w-8 h-8 text-shark-100" />
            <h4>{t('department.title')}</h4>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="relative z-10 flex flex-col">
                <h6 className="font-semibold mb-2">
                  {t('department.administrative.title')}
                </h6>
                <div className="flex flex-col gap-2 text-shark-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <h6>{t('department.administrative.email')}</h6>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <h6>{t('department.administrative.email-2')}</h6>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <h6>{t('department.administrative.phone')}</h6>
                  </div>
                  <p className="text-shark-300 mt-1">
                    {t('department.administrative.note')}
                  </p>
                </div>
                <Divider className="bg-shark-200 mt-4" />
              </div>

              <div className="relative z-10 flex flex-col">
                <h6 className="font-semibold mb-2">
                  {t('department.student.title')}
                </h6>
                <div className="flex flex-col gap-2 text-shark-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <h6>{t('department.student.email')}</h6>
                  </div>
                  <p className="text-shark-300 mt-1">
                    {t('department.student.note')}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Report Issues Section */}
        <Card className="w-full bg-tanhide-500 text-tanhide-100 p-4 relative overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2">
            <Bug className="w-6 h-6" />
            <h4>{t('report.title')}</h4>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <p className="text-tanhide-100">{t('report.description')}</p>
              <div className="flex flex-col gap-4">
                <Link
                  href={`mailto:${t('report.email')}`}
                  className="flex items-center gap-2 px-4 py-2 border-white bg-white hover:bg-white/80 rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  {t('report.email')}
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ContactTab;
