import { typeLanguages } from '@/types/restAPI';

export const MAP_LANGUAGES: typeLanguages = {
  curl: '{ "language": "cURL", "variant": "cURL" }',
  'JavaScript (Fetch api)': '{ "language": "JavaScript", "variant": "Fetch" }',
  'JavaScript (XHR)': '{ "language": "JavaScript", "variant": "XHR" }',
  NodeJS: '{ "language": "NodeJS", "variant": "Axios" }',
  Python: '{ "language": "Python", "variant": "Requests" }',
  Java: '{ "language": "Java", "variant": "OkHttp" }',
  'C#': '{ "language": "C#", "variant": "HttpClient" }',
  Go: '{ "language": "Go", "variant": "Native" }',
};
