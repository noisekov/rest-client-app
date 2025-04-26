export enum Methods {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
  'HEAD' = 'HEAD',
  'OPTIONS' = 'OPTIONS',
}

export type Header = {
  id: string;
  key: string;
  value: string;
};

export type typeLanguages = {
  curl: string;
  'JavaScript (Fetch api)': string;
  'JavaScript (XHR)': string;
  NodeJS: string;
  Python: string;
  Java: string;
  'C#': string;
  Go: string;
};

export type FormValues = {
  method: Methods;
  endpoint: string;
  headers: Header[];
  language?: string;
  body?: string;
  code?: string;
};
