import { useTranslations } from 'next-intl';
import { UserForm } from '@/components/FormSignup/FormSignup';

export default function SignUp() {
  const t = useTranslations('SignUp');

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] max-w-7xl mx-auto w-full px-4">
      <h2 className="text-center text-[3rem] leading-[1.167]">{t('title')}</h2>
      <UserForm />
    </div>
  );
}
