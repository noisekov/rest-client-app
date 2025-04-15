'use client';

import { useTranslations } from 'next-intl';
import ErrorBoundary from './ErrorBoundary';

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('ErrorBoundary');

  return (
    <ErrorBoundary
      fallbackTitle={t('title')}
      fallbackDescription={t('description')}
    >
      {children}
    </ErrorBoundary>
  );
}
