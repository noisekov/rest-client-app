import { logoutUser } from '@/utils/logoutUser';

export async function authFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, init);

  if (res.status === 401) {
    await logoutUser();
  }

  return res;
}
