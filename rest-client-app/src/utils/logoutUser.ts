import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuthStore } from '@/store/authStore';

type LogoutOptions = {
  redirect?: () => void;
  showToast?: boolean;
  t?: (key: string) => string;
};

export async function logoutUser(options: LogoutOptions = {}) {
  const { setUser } = useAuthStore.getState();

  try {
    await signOut(auth);
    await fetch('/api/logout', { method: 'POST' });
  } catch (err) {
    console.error('Error during logout:', err);
  }

  setUser(null);

  if (options.redirect) {
    options.redirect();
  }

  if (options.showToast && options.t) {
    const { toast } = await import('sonner');
    toast.error(options.t('sessionExpired'), { richColors: true });
  }
}
