import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MainPage() {
  const t = useTranslations('MainPage');
  const auth = 'auth';

  return auth === 'auth' ? (
    <div className="flex flex-col gap-4 items-center">
      <p>{t('welcome')}!</p>
      <div className="flex gap-4">
        <Button variant="outline" size="lg" asChild>
          <Link href="/signin">{t('sign_in')}</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/signup">{t('sign_up')}</Link>
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 items-center">
      <div>{t('welcomeBack')}, User!</div>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/restful">REST Client</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/history">{t('history')}</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/variables">{t('variables')}</Link>
        </Button>
      </div>
    </div>
  );
}
