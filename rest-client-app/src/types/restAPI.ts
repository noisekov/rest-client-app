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

export type FormValues = {
  method: Methods;
  endpoint: string;
  headers: Header[];
  code?: string;
  body?: string;
};
