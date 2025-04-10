import { useTranslations } from 'next-intl';
import { LoginForm } from '@/components/FormSignin/FormSignin';

export default function SignIn() {
  const t = useTranslations('SignIn');

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] max-w-7xl mx-auto w-full px-4">
      <div className="text-center text-[3rem] leading-[1.167]">
        {t('title')}
      </div>
      <LoginForm />
    </div>
  );
}
