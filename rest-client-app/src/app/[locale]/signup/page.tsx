import { useTranslations } from 'next-intl';

export default function SignUp() {
  const t = useTranslations('SignUp');

  return <div>{t('title')}</div>;
}
