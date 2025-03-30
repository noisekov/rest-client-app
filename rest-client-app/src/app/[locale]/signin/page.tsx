import { useTranslations } from 'next-intl';

export default function SignIn() {
  const t = useTranslations('SignIn');

  return <div>{t('title')}</div>;
}
