'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
