'use client';

import { useEffect } from 'react';
import { useRouter } from "@/i18n/navigation";

export default function RestfulRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/restful/get');
  }, [router]); 

}