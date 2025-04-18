'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/utils/logoutUser';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CHECK_INTERVAL_MS = 1000 * 60 * 30;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, user } = useAuthStore();
  const router = useRouter();
  const t = useTranslations('Auth');
  const [checkingToken, setCheckingToken] = useState(true);

  const checkToken = async () => {
    try {
      const res = await fetch('/api/check-token');
      if (res.status === 401) {
        await logoutUser({
          redirect: () => router.push('/'),
          showToast: true,
          t,
        });
      }
    } catch (err) {
      console.error('Token check failed:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingToken(false);
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(() => {
      checkToken();
    }, 1000);

    const interval = setInterval(() => {
      checkToken();
    }, CHECK_INTERVAL_MS);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [user, router, t]);

  if (checkingToken) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-[100px] w-[300px] rounded-xl" />
      </div>
    );
  }

  return <>{children}</>;
}
