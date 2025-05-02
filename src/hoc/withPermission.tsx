'use client';

import UnauthorizedPopup from '@/app/_components/global/UnauthorizedPopup';
import Loading from '@/app/_components/global/Loading';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Permission {
  action: string;
  resource: string;
}

const withPermission = <P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions: Permission[]
) => {
  return function PermissionWrapper(props: P) {
    const { data: session, status } = useSession();
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated') {
        // Check if user has admin role
        const isAdmin = session?.user?.roles.some(
          (role) => role.slug === 'admin'
        );

        if (isAdmin) return; // Admin has all permissions

        // For other roles, check specific permissions
        const hasPermission = requiredPermissions.every((permission) => {
          const permissionSlug = `${permission.action}_${permission.resource}`;
          return session?.user?.roles.some(
            (role) => role.slug === permissionSlug
          );
        });

        if (!hasPermission) {
          setIsUnauthorized(true);
        }
      }
    }, [session, status]);

    if (status === 'loading') return <Loading />;

    if (isUnauthorized) {
      return (
        <UnauthorizedPopup
          onClose={() => {
            setIsUnauthorized(false);
            router.back();
          }}
        />
      );
    }

    return <Component {...props} />;
  };
};

export default withPermission;
