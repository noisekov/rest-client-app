'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/store/authStore';
import { authFetch } from '@/utils/authFetch';
import { useRouter } from '@/i18n/navigation';

export default function MainPage() {
  const t = useTranslations('MainPage');
  const { user, loading } = useAuthStore();
  const router = useRouter();

  const handleSecureNavigation = async (path: string) => {
    const res = await authFetch('/api/check-token');
    if (res.status !== 401) {
      router.push(path);
    }
  };

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

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4 items-center">
        {user ? (
          <>
            <div>
              {t('welcomeBack')}, {user.displayName}!
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="cursor-pointer"
                onClick={() => handleSecureNavigation('/restful')}
              >
                REST Client
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                onClick={() => handleSecureNavigation('/history')}
              >
                {t('history')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                onClick={() => handleSecureNavigation('/variables')}
              >
                {t('variables')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p>{t('welcome')}!</p>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/signin">{t('sign_in')}</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/signup">{t('sign_up')}</Link>
              </Button>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px]">
          <article className="text-center border-2 border-gray-300 rounded-md bg-gray-50 p-4 max-w-[500px]">
            <p className="text-[1.2rem] mb-2">{t('about_project')}</p>
            {t('about')}
          </article>
          <article className="text-center border-2 border-gray-300 rounded-md bg-gray-50 p-4 max-w-[500px]">
            <p className="text-[1.2rem] mb-2">{t('about_course')}</p>
            <ul className="text-left">
              <li>🎓 {t('knowledge')}</li>
              <li>📚 {t('materials')}</li>
              <li>💡 {t('education')}</li>
              <li>📜 {t('certificate')}</li>
            </ul>
          </article>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px]">
          <li className="border-2 border-gray-300 rounded-md bg-gray-50 text-center p-4 max-w-[500px]">
            <a href="https://github.com/noisekov" target="_blank">
              <p className="mb-2">
                <b>noisekov</b>
                <br />
                <span className="text-sm">Team Lead</span>
              </p>
              <p>{t('vladimir')}</p>
            </a>
          </li>
          <li className="border-2 border-gray-300 rounded-md bg-gray-50 text-center p-4 max-w-[500px]">
            <a href="https://github.com/skayer81" target="_blank">
              <p className="mb-2">
                <b>skayer81</b>
                <br />
                <span className="text-sm">Frontend</span>
              </p>
              <p>{t('sergey')}</p>
            </a>
          </li>
          <li className="border-2 border-gray-300 rounded-md bg-gray-50 text-center p-4 max-w-[500px]">
            <a href="https://github.com/LaraNU" target="_blank">
              <p className="mb-2">
                <b>LaraNU</b>
                <br />
                <span className="text-sm">Frontend</span>
              </p>
              <p>{t('lara')}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
