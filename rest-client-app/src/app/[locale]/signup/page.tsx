import { useTranslations } from 'next-intl';
import { UserForm } from '@/components/FormSignup/FormSignup';

export default function SignUp() {
  const t = useTranslations('SignUp');

  return (
    <>
      <div className="text-center text-[3rem] leading-[1.167]">
        {t('title')}
      </div>
      <UserForm />
    </>
  );
}
