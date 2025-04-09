'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '@/firebase';
import { Link, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useTranslations } from 'next-intl';

const passwordRegex =
  /^(?=.*[\p{L}])(?=.*\d)(?=.*[^\w\s])[\p{L}\d\p{P}\p{S}]{8,}$/u;

export function LoginForm() {
  const t = useTranslations('SignIn');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const FormSchema = z.object({
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
      email: '',
      password: '',
    },
  });

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = getIdToken(user);

      await fetch('/api/set-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (user) {
        router.push('/');
        form.reset();
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          setError(
            'Invalid credentials provided. Please check your input and try again.'
          );

          return;
        }
        setError(error.message);
      }
    }
  };

  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    try {
      await loginWithEmailAndPassword(email, password);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
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

      <div className="mt-[20px] text-[#b92025]">{error}</div>

      <div className="mt-[20px]">
        {`${t('subtitle')} `}
        <Link
          href="/signup"
          className="hover:underline cursor-pointer text-[#b92025]"
        >
          {t('subtitle_link')}
        </Link>
      </div>
    </div>
  );
}
