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
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { useVariableStore } from '@/store/variableStore';
import { useEffect } from 'react';

const formSchema = z
  .object({
    key: z.string().min(1),
    value: z.string().min(1),
  })
  .required();

export default function Variables() {
  const t = useTranslations('Variables');
  const { user } = useAuthStore();
  const { variables, addVariable, loadVariables, deleteVariable, loading } =
    useVariableStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: '',
      value: '',
    },
  });

  useEffect(() => {
    if (user?.uid) {
      loadVariables(user.uid);
    }
  }, [user?.uid, loadVariables]);

  const onSubmit = ({ key, value }: z.infer<typeof formSchema>) => {
    if (Object.hasOwn(variables, key)) {
      toast.error(t('variableExists', { key }), { richColors: true });
      return;
    }

    if (user) {
      addVariable(user.uid, key, value);
      form.reset();
    }
  };

  return (
    <div className="flex items-start justify-center max-w-7xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4 max-w-2xl w-full">
        <h2 className="text-center text-[3rem] leading-[1.167]">
          {t('title')}
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-center gap-[20px]"
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

        <div className="mt-20">
          <h3 className="text-xl font-semibold mb-3">{t('subtitle')}</h3>

          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[50px] rounded" />
              <Skeleton className="h-[50px] rounded" />
              <Skeleton className="h-[50px] rounded" />
            </div>
          ) : Object.entries(variables).length === 0 ? (
            <p>{t('notFound')}</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(variables).map(([key, value]) => (
                <li
                  key={key}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <div className="flex gap-[20px]">
                    <span className="font-semibold">{key} :</span>
                    <span>{value}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer transition-colors border border-input text-foreground hover:bg-destructive hover:text-white hover:border-destructive"
                    onClick={() => user && deleteVariable(user.uid, key)}
                  >
                    {t('delete')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
