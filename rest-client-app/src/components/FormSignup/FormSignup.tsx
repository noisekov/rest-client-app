'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from 'firebase/auth';
import { auth, db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/store/authStore';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const passwordRegex =
  /^(?=.*[\p{L}])(?=.*\d)(?=.*[^\w\s])[\p{L}\d\p{P}\p{S}]{8,}$/u;

export function UserForm() {
  const t = useTranslations('SignUp');
  const router = useRouter();
  const { setUser } = useAuthStore.getState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: t('username_error'),
    }),
    email: z.string().email({
      message: t('email_error'),
    }),
    password: z
      .string()
      .min(8, { message: t('password_description') })
      .regex(passwordRegex, {
        message: t('password_error'),
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const token = await getIdToken(user);

      await fetch('/api/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      await updateProfile(user, { displayName: name });

      setUser({ ...user, displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      await registerWithEmailAndPassword(
        data.username,
        data.email,
        data.password
      );
      form.reset();
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px] space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('username')}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Sam" {...field} />
                </FormControl>
                <FormDescription>{t('info')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="abc@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? t('loading') : t('submit')}
          </Button>
        </form>
      </Form>

      <div className="mt-[20px]">
        {`${t('subtitle')} `}
        <Link
          href="/signin"
          className="hover:underline cursor-pointer text-[#b92025]"
        >
          {t('subtitle_link')}
        </Link>
      </div>
    </div>
  );
}
