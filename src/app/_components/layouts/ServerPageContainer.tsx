import { HydrateClient } from '@/trpc/server';
import React, { type ReactNode } from 'react';

interface ServerPageContainerProps {
  children: ReactNode;
}

const ServerPageContainer = ({ children }: ServerPageContainerProps) => {
  return <HydrateClient>{children}</HydrateClient>;
};

export default ServerPageContainer;
