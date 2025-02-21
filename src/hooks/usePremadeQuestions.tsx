import { useTranslations } from 'next-intl';

const usePremadeQuestions = () => {
  const t = useTranslations('ChatbotInterface');

  const questions = [
    t('premadeQuestions.question-1'),
    t('premadeQuestions.question-2'),
    t('premadeQuestions.question-3'),
    t('premadeQuestions.question-4'),
    t('premadeQuestions.question-5'),
  ];

  return questions;
};

export default usePremadeQuestions;
