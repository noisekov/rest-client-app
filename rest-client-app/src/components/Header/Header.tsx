'use client';
import Image from 'next/image';
import icon from '../../../public/logo.png';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Header');
  const locale = useLocale();
  const { user } = useAuthStore();

  const hanlderLanguage = (event: 'en' | 'ru') => {
    if (!event) return;

    startTransition(() => {
      router.replace({ pathname, ...params }, { locale: event });
    });
  };

  const handleLogout = async () => {
    await signOut(auth);

    await fetch('/api/logout', { method: 'POST' });

    router.push('/');
  };

  return (
    <header className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between sticky top-0 h-[56px] border-b border-dashed border-[#cfcfcf] border-b-px bg-[#fff]">
      <Link href="/">
        <Image priority src={icon} alt="Logo" width={40} height={40} />
      </Link>
      <div className="flex gap-[24px]">
        <ToggleGroup
          type="single"
          size="lg"
          defaultValue={locale}
          onValueChange={hanlderLanguage}
          disabled={isPending}
        >
          <ToggleGroupItem
            variant="outline"
            value="en"
            className="cursor-pointer"
          >
            EN
          </ToggleGroupItem>
          <ToggleGroupItem
            variant="outline"
            value="ru"
            className="cursor-pointer"
          >
            RU
          </ToggleGroupItem>
        </ToggleGroup>

        {user ? (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              {t('sign_out')}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="lg" asChild>
              <Link href="/signin">{t('sign_in')}</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/signup">{t('sign_up')}</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
