'use client';

import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';

const formSchema = z
  .object({
    key: z.string().min(1),
    value: z.string().min(1),
  })
  .required();

export default function Variables() {
  const t = useTranslations('Variables');
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
      value: '',
    },
  });

  const onSubmit = (variables: z.infer<typeof formSchema>) => {
    if (user) {
      const key = `variables_${user.uid}`;
      localStorage.setItem(key, JSON.stringify(variables));
    }
  };

  return (
    <>
      <div className="text-center text-[3rem] leading-[1.167]">
        {t('title')}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap items-center gap-5 pt-[20px]"
          >
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input placeholder={t('key')} {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-[50px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input placeholder={t('value')} {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-[50px]" />
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              {t('add')}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
