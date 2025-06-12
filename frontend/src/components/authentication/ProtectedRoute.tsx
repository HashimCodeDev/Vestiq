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

  const Loader = () => {
    return (
      <div className="flex-col h-screen gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
        </div>
      </div>
    );
  };

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
    return <Loader />;
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
