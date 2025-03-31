import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const History = () => {
  const t = useTranslations('History');
  const howManyRequests = 0;

  return (
    <div className="flex flex-col gap-4 text-center">
      {howManyRequests === 0 ? (
        <>
          <p className="m-0">{t('title')}</p>
          <p className="m-0">{t('subtitle')}</p>
          <Button asChild size="sm">
            <Link href="/restful"> REST Client</Link>
          </Button>
        </>
      ) : (
        <div>asd</div>
      )}
    </div>
  );
};

export default History;
