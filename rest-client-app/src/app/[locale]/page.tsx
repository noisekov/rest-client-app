'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/store/authStore';

export default function MainPage() {
  const t = useTranslations('MainPage');
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4 items-center">
        <div>
          {t('welcomeBack')}, {user.displayName}!
        </div>
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
    </div>
  ) : (
    <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
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
    </div>
  );
}
