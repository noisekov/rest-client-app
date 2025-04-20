import { replaceVariables } from './replaceVariables';
import { FormValues } from '@/types/restAPI';

export function resolveFormDataWithVariables(
  data: FormValues,
  variables: Record<string, string>,
  notifyMissing: (key: string) => void
) {
  let hasMissing = false;
  const wrappedNotify = (key: string) => {
    hasMissing = true;
    notifyMissing(key);
  };

  const resolvedEndpoint = replaceVariables(
    data.endpoint,
    variables,
    wrappedNotify
  );

  const resolvedBody = data.body
    ? replaceVariables(data.body, variables, wrappedNotify)
    : undefined;

  const resolvedHeaders = data.headers.map((header) => ({
    ...header,
    key: replaceVariables(header.key, variables, wrappedNotify) || '',
    value: replaceVariables(header.value, variables, wrappedNotify) || '',
  }));

  return {
    resolvedEndpoint,
    resolvedBody,
    resolvedHeaders,
    hasMissing,
  };
}
