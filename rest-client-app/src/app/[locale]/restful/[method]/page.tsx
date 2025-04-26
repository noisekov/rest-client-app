'use client';

import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
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
import { useClikedLinkStore } from '@/store/clikedLinkInHistoryPageStore';
import { FormValues, Header, Methods } from '@/types/restAPI';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useVariableStore } from '@/store/variableStore';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { MAP_LANGUAGES } from '@/utils/constants';
import SelectLanguage from '@/components/selectLanguage/SelectLanguage';
import { resolveFormDataWithVariables } from '@/utils/resolveFormDataWithVariables';

export default function RestAPI() {
  const t = useTranslations('Restful');
  const { user } = useAuthStore();
  const { variables, loadVariables } = useVariableStore();
  const isSubmittingRef = useRef(false);
  const params = useParams();
  const paramsMethod = params.method;
  const defaultMethod = Object.values(Methods).includes(paramsMethod as Methods)
    ? (paramsMethod as Methods)
    : Methods.GET;
  const defaultLanguage = MAP_LANGUAGES.curl;
  const [response, setResponse] = useState<{
    status: number | null;
    body: string;
  }>({ status: null, body: '' });
  const [generateCode, setGenerateCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      method: defaultMethod,
      endpoint: '',
      headers: [{ id: crypto.randomUUID(), key: '', value: '' }],
      language: defaultLanguage,
      body: '',
      code: '',
    },
  });

  const { control, handleSubmit, setValue, getValues } = form;
  const { watch } = form;

  useEffect(() => {
    if (user?.uid) {
      loadVariables(user.uid);
    }
  }, [user?.uid, loadVariables]);

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

  const { indexLinkInHistoryPage, clearIndex } = useClikedLinkStore();

  useEffect(() => {
    const historyRequests = localStorage.getItem('requests-next-app');

    if (typeof indexLinkInHistoryPage === 'number' && historyRequests) {
      const dataHistoryRequest =
        JSON.parse(historyRequests)[indexLinkInHistoryPage];
      form.setValue('headers', dataHistoryRequest.headers);
      form.setValue('body', dataHistoryRequest.body);
      form.setValue('endpoint', dataHistoryRequest.endpoint);
      form.setValue('language', dataHistoryRequest.language);
      setGenerateCode(dataHistoryRequest.code);

      clearIndex();
      setURL(dataHistoryRequest);

      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const encodedUrl = searchParams.get('url');

    if (encodedUrl) {
      const url = Buffer.from(encodedUrl, 'base64').toString();
      form.setValue('endpoint', url);
    }

    const encodedBody = searchParams.get('body');

    if (encodedBody) {
      const body = Buffer.from(encodedBody, 'base64').toString();
      form.setValue('body', body);
    }

    const headers: Header[] = [];

    searchParams.forEach((value, key) => {
      if (!['url', 'body'].includes(key)) {
        headers.push({
          id: crypto.randomUUID(),
          key,
          value: decodeURIComponent(value),
        });
      }
    });

    if (headers.length > 0) {
      form.setValue('headers', headers);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((data) => {
      if (isSubmittingRef.current) {
        isSubmittingRef.current = false;
        return;
      }

      setURL(data as FormValues);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  function setURL(data: FormValues) {
    const encodedUrl = Buffer.from(data.endpoint).toString('base64');
    const encodedBody = data.body
      ? Buffer.from(data.body).toString('base64')
      : '';
    const encodeHeaders = new URLSearchParams(
      data.headers
        .filter((header) => header.key && header.value)
        .map(({ key, value }) => [key, encodeURIComponent(value)])
    ).toString();
    const newUrl =
      `/restful/${data.method}?` +
      `url=${encodedUrl}` +
      (encodedBody ? `&body=${encodedBody}` : '') +
      (encodeHeaders ? `&${encodeHeaders}` : '');

    window.history.replaceState(null, '', newUrl);
  }

  async function submitForm(data: FormValues) {
    setIsLoading(true);

    const notifyMissing = (key: string) => {
      toast.error(t('variableNotFound', { key: `{{${key}}}` }), {
        richColors: true,
      });
    };
    const { resolvedEndpoint, resolvedBody, resolvedHeaders, hasMissing } =
      resolveFormDataWithVariables(data, variables, notifyMissing);

    if (hasMissing || !resolvedEndpoint) {
      setIsLoading(false);
      return;
    }

    isSubmittingRef.current = true;

    setURL({
      ...data,
      endpoint: resolvedEndpoint,
      body: resolvedBody,
      headers: resolvedHeaders,
    });

    const historyRequests = localStorage.getItem('requests-next-app') || '[]';

    try {
      const headers: Record<string, string> = {};

      resolvedHeaders.forEach((header) => {
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

      if (!['GET', 'HEAD', 'OPTIONS'].includes(data.method) && resolvedBody) {
        fetchOptions.body = resolvedBody;
      }

      const response = await fetch(resolvedEndpoint, fetchOptions);
      let responseBody;

      try {
        responseBody = await response.json();
        responseBody = JSON.stringify(responseBody, null, 2);
      } catch {
        responseBody = await response.text();
      }

      setResponse({
        status: response.status,
        body: responseBody,
      });

      const historyRequestsArr = JSON.parse(historyRequests);
      historyRequestsArr.unshift({
        method: data.method,
        endpoint: resolvedEndpoint,
        headers: resolvedHeaders,
        body: resolvedBody,
        language: getValues('language'),
        code: generateCode,
      });

      localStorage.setItem(
        'requests-next-app',
        JSON.stringify(historyRequestsArr)
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          richColors: true,
        });

        return;
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenerateCode = () => {
    const { language, variant } = JSON.parse(
      getValues('language') || '{ "language": "cURL", "variant": "cURL" }'
    );

    let hasMissing = false;
    const notifyMissing = (key: string) => {
      hasMissing = true;

      toast.error(t('variableNotFound', { key: `{{${key}}}` }), {
        richColors: true,
      });
    };

    const method = getValues('method');

    const formData = {
      endpoint: getValues('endpoint'),
      body: getValues('body'),
      headers: getValues('headers'),
      method,
    };

    const { resolvedEndpoint, resolvedBody, resolvedHeaders } =
      resolveFormDataWithVariables(formData, variables, notifyMissing);

    const request = new sdk.Request(resolvedEndpoint);
    request.method = method;

    resolvedHeaders.forEach((header) => {
      request.addHeader({ key: header.key, value: header.value });
    });

    request.body = new sdk.RequestBody({
      mode: 'raw',
      raw: resolvedBody,
    });

    if (hasMissing || !resolvedEndpoint) {
      return;
    }

    const options = {
      indentCount: 3,
      indentType: 'Space',
      trimRequestBody: true,
      followRedirect: true,
    };

    codegen.convert(
      language,
      variant,
      request,
      options,
      function (error: string, code: string) {
        let isError = false;

        if (error) {
          toast.error(error, {
            richColors: false,
          });
          isError = true;
        }

        setGenerateCode(isError ? '' : code);
      }
    );
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto w-full px-4">
      <section className="max-w-4xl w-full px-4">
        <h2 className="text-center text-[3rem] leading-[1.167] mb-4">
          {t('title')}
        </h2>
        <Form {...form}>
          <form className="mb-8" onSubmit={handleSubmit(submitForm)}>
            <fieldset className="flex flex-col gap-5 border-2 border-gray-300 rounded-md p-4 bg-gray-50">
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
              <div className="flex flex-row items-end gap-4">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('code_language')}</FormLabel>
                      <SelectLanguage
                        language={field.value}
                        onLanguageChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="cursor-pointer max-w-[150px]"
                  onClick={handleGenerateCode}
                >
                  {t('generate_code')}
                </Button>
              </div>
              <div className="mb-2">
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
                          value={generateCode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer max-w-[150px]"
              >
                {isLoading ? t('loading') : t('send_request')}
              </Button>
            </fieldset>
          </form>
        </Form>
        <h3 className="px-2 font-semibold text-lg mb-4">{t('response')}</h3>
        <div className="space-y-4">
          <div>
            <Label>{t('status_code')}</Label>
            <Input
              id="response-status"
              readOnly
              className="bg-gray-100 mt-1"
              value={response.status ?? ''}
            />
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
    </div>
  );
}
