'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Header = {
  id: string;
  key: string;
  value: string;
};

export function HeadersList() {
  const t = useTranslations('Restful');

  const [headers, setHeaders] = useState<Header[]>([
    { id: crypto.randomUUID(), key: '', value: '' },
  ]);

  const addHeader = () => {
    setHeaders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key: '', value: '' },
    ]);
  };

  const updateHeader = (id: string, field: keyof Header, value: string) => {
    setHeaders((prev) =>
      prev.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const removeHeader = (id: string) => {
    setHeaders((prev) => prev.filter((header) => header.id !== id));
  };

  return (
    <fieldset className="border p-4 rounded">
      <legend className="px-2 font-medium">{t('headers')}</legend>
      <Button onClick={addHeader} type="button" className="cursor-pointer mb-2">
        {t('add_header')}
      </Button>
      <div className="grid grid-cols-2 gap-2 mb-2 font-medium">
        <Label>{t('key')}</Label>
        <Label>{t('value')}</Label>
      </div>
      {headers.map((header) => (
        <div
          key={header.id}
          className="grid gap-2 mb-2"
          style={{ gridTemplateColumns: '1fr 1fr 100px' }}
        >
          < Input
            type="text"
            value={header.key}
            placeholder={t('key')}
            onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
          />
          <Input
            type="text"
            value={header.value}
            onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
            placeholder={t('value')}
          />
          <Button
            variant="destructive"
            onClick={() => removeHeader(header.id)}
            type="button"
            className="cursor-pointer"
          >
            {t('remove')}
          </Button>
        </div>
      ))}
    </fieldset>
  );
}
