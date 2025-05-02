'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/global/Loading';

const Login = dynamic(() => import('@/app/(auth)/login/LoginPage'), {
  loading: () => <Loading />,
});

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleLogin = () => {
    // TODO: Implement login logic
  };

  return <Login handleLogin={handleLogin} />;
}
