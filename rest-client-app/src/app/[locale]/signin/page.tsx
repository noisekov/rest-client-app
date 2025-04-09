import { useTranslations } from 'next-intl';
import { LoginForm } from '@/components/FormSignin/FormSignin';

export default function SignIn() {
  const t = useTranslations('SignIn');

  return (
    <>
      <div className="text-center text-[3rem] leading-[1.167]">
        {t('title')}
      </div>
      <LoginForm />
    </>
  );
}
