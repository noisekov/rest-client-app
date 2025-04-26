import { Methods } from '@/types/restAPI';

export const selectClasses: Record<Methods, string> = {
  GET: 'text-green-600 bg-green-50',
  POST: 'text-yellow-600 bg-yellow-50',
  PUT: 'text-blue-600 bg-blue-50',
  PATCH: 'text-purple-600 bg-purple-50',
  DELETE: 'text-red-600 bg-red-50',
  HEAD: 'text-gray-600 bg-gray-50',
  OPTIONS: 'text-indigo-600 bg-indigo-50',
};
