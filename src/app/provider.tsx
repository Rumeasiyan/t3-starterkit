'use client';

import { SessionProvider } from 'next-auth/react';
import type { JSX, ReactNode } from 'react';
import { TRPCReactProvider } from '@/trpc/react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
}
