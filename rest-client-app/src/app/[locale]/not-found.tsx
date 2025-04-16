'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-4">
      <h1 className="text-6xl font-bold text-destructive">404</h1>
      <p className="mt-4 text-2xl font-semibold">{t('title')}</p>
      <p className="mt-2 max-w-xl text-center text-muted-foreground">
        {t('description')}
      </p>
      <Button asChild className="mt-6">
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </div>
  );
}
