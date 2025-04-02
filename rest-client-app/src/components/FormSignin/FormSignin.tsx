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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { Link, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

const FormSchema = z.object({
  email: z.string().email().min(5, {
    message: 'Email must be at least 5 characters.',
  }),
  password: z.string().min(8),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        } else {
          setError(error.message);
        }
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    loginWithEmailAndPassword(data.email, data.password);
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div className="mt-[20px] text-[#b92025]">{error}</div>

      <div className="mt-[20px]">
        Not Registered Yet?{' '}
        <Link href="/signup" className="hover:underline cursor-pointer">
          Create an account
        </Link>
      </div>
    </div>
  );
}
