'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

type Header = {
  id: string;
  key: string;
  value: string;
};

export function HeadersList() {
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
      <legend className="px-2 font-medium">Headers</legend>
      <Button onClick={addHeader} type="button" className="cursor-pointer">
        Add header
      </Button>
      <div className="grid grid-cols-2 gap-2 mb-2 font-medium">
        <span>Key</span>
        <span>Value</span>
      </div>
      {headers.map((header) => (
        <div
          key={header.id}
          className="grid gap-2 mb-2"
          style={{ gridTemplateColumns: '1fr 1fr 100px' }}
        >
          <input
            type="text"
            value={header.key}
            placeholder="Key"
            onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={header.value}
            onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
            placeholder="Value"
            className="px-3 py-2 border rounded"
          />
          <Button
            variant="destructive"
            onClick={() => removeHeader(header.id)}
            type="button"
            className="cursor-pointer"
          >
            Remove
          </Button>
        </div>
      ))}
    </fieldset>
  );
}
