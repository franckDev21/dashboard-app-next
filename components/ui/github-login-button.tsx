'use client';

import { authenticatByGithub } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';

export default function GithubLoginButton() {
  return (
    <Button
      type='button'
      size='lg'
      className='w-full'
      onClick={async () => {
        await authenticatByGithub();
      }} 
    >
      <span>Login with github</span>
    </Button>
  );
}
