'use client';

import { HeadersList } from '@/components/HeadersList/HeadersList';
import { SelectMethod } from '@/components/SelectMethod/SelectMethod';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormValues, Header, Methods } from '@/types/restAPI';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RestAPI() {

  console.log('документация по апи', "https://jsonplaceholder.typicode.com/guide/")

  const t = useTranslations('Restful');

  const form = useForm<FormValues>({
    defaultValues: {
      method: Methods.GET,
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      headers: [{ id: crypto.randomUUID(), key: '', value: '' }],
      code: '',
      body: JSON.stringify({'testKey': 'TestValue'}, null, 2),
    },
  });

  const [response, setResponse] = useState<{status: number | null, body: string}>({ status: null, body: '' })

  const { control, handleSubmit, setValue, getValues } = form;

  const addHeader = () => {
    setValue('headers', [
      ...getValues('headers'),
      { id: crypto.randomUUID(), key: '', value: '' },
    ]);
  };

  const updateHeader = (id: string, field: keyof Header, value: string) => {
    setValue(
      'headers',
      getValues('headers').map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const removeHeader = (id: string) => {
    setValue(
      'headers',
      getValues('headers').filter((header) => header.id !== id)
    );
  };

  async function submitForm(data: FormValues) {
    try {

      const headers: Record<string, string> = {};

      data.headers.forEach((header) => {
        if (header.key && header.value) {
          headers[header.key] = header.value;
        }
      });

      if (!headers['Content-Type'] && data.body) {
        try {
          JSON.parse(data.body);
          headers['Content-Type'] = 'application/json; charset=UTF-8'; 
        } catch {
          headers['Content-Type'] = 'text/plain; charset=UTF-8'; 
        }
      }      

      const fetchOptions: RequestInit = {
        method: data.method,
        headers: headers,
      };
  
      if (!['GET', 'HEAD', 'OPTIONS'].includes(data.method) && data.body) {
        fetchOptions.body = data.body;
      }

      const response = await fetch(data.endpoint, fetchOptions);

      let responseBody;

      try {
        responseBody = await response.json();
        responseBody = JSON.stringify(responseBody, null, 2);
      } catch {
         responseBody = await response.text();
      }

      console.log(responseBody);

      setResponse({
        status: response.status,
        body: responseBody,
      });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      <Form {...form}>
        <form className="mb-8" onSubmit={handleSubmit(submitForm)}>
          <fieldset className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
            <legend className="px-2 font-semibold text-lg">
              {t('rest_client')}
            </legend>

            <FormField
              control={control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectMethod
                      method={field.value}
                      onMethodChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('endpoint_url')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('endpoint_url')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="headers"
              render={() => (
                <FormItem>
                  <HeadersList
                    headers={getValues('headers')}
                    onAddHeader={addHeader}
                    onUpdateHeader={updateHeader}
                    onRemoveHeader={removeHeader}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4">
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('code')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('code_placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('request_body')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.raw('body_placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="cursor-pointer">
              {t('send_request')}
            </Button>
          </fieldset>
        </form>
      </Form>

      <h3 className="px-2 font-semibold text-lg mb-4">{t('response')}</h3>
      <div className="space-y-4">
        <div>
          <Label>{t('status_code')}</Label>
          <Input id="response-status" readOnly className="bg-gray-100 mt-1" value={response.status ?? ''}/>
        </div>
        <div>
          <Label>{t('response_body')}</Label>
          <Textarea
            id="response-body"
            readOnly
            className="bg-gray-100 font-mono text-sm h-64 mt-1"
            value={response.body}
          />
        </div>
      </div>
    </section>
  );
}
