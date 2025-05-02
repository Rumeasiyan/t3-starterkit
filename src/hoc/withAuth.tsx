'use client';

import Loading from '@/app/_components/global/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthWrapper(props: P) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login');
      }
    }, [status, router]);

    if (status === 'loading') return <Loading />;
    if (status === 'unauthenticated') return null;

    return <Component {...props} />;
  };
};

export default withAuth;
