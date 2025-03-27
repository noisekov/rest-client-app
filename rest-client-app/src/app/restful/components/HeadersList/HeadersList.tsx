'use client';
import { useState } from "react";

type Header = {
  id: string;
  key: string;
  value: string;
};

export function HeadersList() {
  const [headers, setHeaders] = useState<Header[]>([{ id: crypto.randomUUID(), key: '', value: '' }]);

  const addHeader = () => {
    setHeaders(prev => [...prev, { id: crypto.randomUUID(), key: '', value: '' }]);
  };

  const updateHeader = (id: string, field: keyof Header, value: string) => {
    setHeaders(prev =>
      prev.map(header =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const removeHeader = (id: string) => {
    setHeaders(prev => prev.filter(header => header.id !== id));
  };

  return (
    <fieldset className="border p-4 rounded">
      <legend className="px-2 font-medium">Headers</legend>
      <button 
        type="button"
        onClick={addHeader}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-800 cursor-pointer"
      >
        Add header
      </button>
      <div className="grid grid-cols-2 gap-2 mb-2 font-medium">
        <span>Key</span>
        <span>Value</span>
      </div>
      {headers.map(header => (
        <div key={header.id} className="grid gap-2 mb-2" style={{ gridTemplateColumns: '1fr 1fr 100px' }}>
          <input
            type="text"
            value={header.key}
            placeholder="Key"
            onChange={e => updateHeader(header.id, 'key', e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={header.value}
            onChange={e => updateHeader(header.id, 'value', e.target.value)}
            placeholder="Value"
            className="px-3 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => removeHeader(header.id)}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-800 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
    </fieldset>
  );
}