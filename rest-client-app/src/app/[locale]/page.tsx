import { useTranslations } from 'next-intl';

export default function MainPage() {
  const t = useTranslations('MainPage');

  return <div>{t('title')}</div>;
}
