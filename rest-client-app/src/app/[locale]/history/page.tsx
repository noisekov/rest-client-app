'use client';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useClikedLinkStore } from '@/store/clikedLinkInHistoryPageStore';
import { useTranslations } from 'next-intl';

const History = () => {
  const t = useTranslations('History');
  const requests: [
    {
      method: string;
      endpoint: string;
      headers: string[];
      body: string;
      code: string;
    },
  ] = JSON.parse(localStorage.getItem('requests-next-app') || '[]');
  const { handleClick } = useClikedLinkStore();

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4 text-center">
        {!requests.length ? (
          <>
            <p className="m-0">{t('title')}</p>
            <p className="m-0">{t('subtitle')}</p>
            <Button asChild size="sm">
              <Link href="/restful"> REST Client</Link>
            </Button>
          </>
        ) : (
          <>
            <div>{t('requests')}</div>
            <ul className="border-2 border-gray-300 rounded-md p-4 bg-gray-50 text-left">
              {requests.map((request, index) => (
                <li key={crypto.randomUUID()}>
                  <span className="mr-2">{index + 1}.</span>
                  <Link
                    href={`/restful/${request.method}`}
                    className="hover:underline hover:text-blue-400"
                    onClick={() => handleClick(index)}
                  >
                    {`${request.method} ${request.endpoint}`}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
