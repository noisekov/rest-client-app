"use client"

import { HeadersList } from '@/components/HeadersList/HeadersList';
import { SelectMethod } from '@/components/SelectMethod/SelectMethod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header, Methods, RequestState } from '@/types/restAPI';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

export default function RestAPI() {
  const t = useTranslations('Restful');

  const [requestState, setRequestState] =  useState<RequestState>({
    method: Methods.GET,
    endpoint: '',
    headers: [{ id: crypto.randomUUID(), key: '', value: '' }],
    code: '',
    script: '',
    body: ''
  });

  function setMethod(method: Methods) {
    setRequestState(prev => {return{...prev, method: method}})
  }

  // function setHeaders(headers: Array<Header>){
  //   setRequestState(prev => {
  //     return {
  //       ...prev,
  //       headers: headers
  //     }
  //   })
  // }
  const addHeader = () => {
    setRequestState(prev => 
    {
      return{
        ...prev,
        headers: [...prev.headers, { id: crypto.randomUUID(), key: '', value: '' }]
      }
    }
  ) 
  };

  const updateHeader = (id: string, field: keyof Header, value: string) => {
    setRequestState(prev =>
      { return {
        ...prev,
        headers: prev.headers.map(header => (header.id === id ? { ...header, [field]: value } : header))}
      }  
    );
  };

  const removeHeader = (id: string) => {
    setRequestState(prev => {
      return {
        ...prev,
        headers: prev.headers.filter(header => header.id !== id)}});
  };

  function submitForm(e: FormEvent){
    e.preventDefault()
    console.log(requestState)
  }
  
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      <form className="mb-8" onSubmit={(e) => submitForm(e)}>
        <fieldset className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
          <legend className="px-2 font-semibold text-lg">{t('rest_client')}</legend>
          <SelectMethod method={requestState.method} onMethodChange={setMethod}/>
          <Input 
            id="path"
            placeholder={t('endpoint_url')}
          />
          <HeadersList            headers={requestState.headers}
            onAddHeader={addHeader}
            onUpdateHeader={updateHeader}
            onRemoveHeader={removeHeader} />
          <div className="mb-4">
            <Label htmlFor="code" className='mb-1'>{t('code')}</Label>
            <Textarea placeholder={t('code_placeholder')} id="code"/>
          </div>
          <div className="mb-2">
            <Label htmlFor="body" className='mb-1'>{t('request_body')}</Label>
            <Textarea placeholder={t.raw('body_placeholder')} id="body"/>
          </div>
          <Button type="submit" className="cursor-pointer">
            {t('send_request')}
          </Button>
        </fieldset>
      </form>

      <form>
        <fieldset className="border-2 border-gray-300 rounded-md p-4 bg-gray-50">
          <legend className="px-2 font-semibold text-lg">{t('response')}</legend>
          <div className="mb-4">
            <Label htmlFor="response-status" className='mb-1'>{t('status_code')}</Label>
            <Input id="response-status" readOnly className='bg-gray-100'/>
            <div className="mb-2">
              <Label htmlFor="response-body" className='mb-1'>{t('response_body')}</Label>
              <Textarea id="response-body" readOnly className='bg-gray-100'/>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
}