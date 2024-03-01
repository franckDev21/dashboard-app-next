'use client';

import { AFTER_LOGIN_REDIRECT_URI } from '@/app/lib/constants';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { googleAuthUrl, loginWithGoogle } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const [pending,setPending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  async function login(verificationCode: string){
    try {
      setPending(true);
      await loginWithGoogle(verificationCode as string);
      setPending(false);
      
    } catch (error) {
      setPending(false);
    } finally { setPending(false); }
  }

  async function handleClick() {
    setPending(true);
    const url = await googleAuthUrl();
    setPending(false);
    router.push(url);
  }

  useEffect(() => {
    if(code){
      login(code);
      router.push(AFTER_LOGIN_REDIRECT_URI);
    }
  },[code,router]);

  return (
    <Button
      size='lg'
      variant='secondary'
      onClick={handleClick}
      className=' border inline-flex items-center space-x-2 w-full'
    >
      {pending && <Spinner />} <span>Sign in with Google</span> <FcGoogle className='text-lg' />
    </Button>
  );
}
