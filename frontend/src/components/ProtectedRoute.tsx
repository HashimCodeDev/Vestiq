'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PageSkeleton from '@/components/PageSkeleton';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.warn('[⛔] No user. Redirecting to login.');
        router.push('/login');
      } else {
        console.log('[✅] User authenticated. Rendering children.');
      }
      setChecked(true);
    }
  }, [user, loading, router]);

  if (loading || !checked) {
    return <PageSkeleton />;
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
