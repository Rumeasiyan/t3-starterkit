'use client';

import Loading from '@/app/_components/global/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const PageContainer = dynamic(
  () => import('@/app/_components/layouts/PageContainer'),
  {
    loading: () => <Loading />,
  }
);

const HomePage = dynamic(() => import('./HomePage'), {
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <PageContainer>
      <HomePage />
    </PageContainer>
  );
};

export default Page;
