import UnauthorizedPopup from '@/app/components/global/UnauthorizedPopup';
import Loading from '@/app/components/global/Loading';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withRole = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  return function RoleWrapper(props: P) {
    const { data: session, status } = useSession();
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated') {
        const hasAllowedRole = session?.user?.roles.some((role) =>
          allowedRoles.includes(role.slug)
        );

        if (!hasAllowedRole) {
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

export default withRole;
